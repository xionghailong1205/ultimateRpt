import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zhCN } from "date-fns/locale"
import { DateRangeOfQuery } from "@/service/EntryPatientService"

interface DatePickerWithRangeProp extends React.HTMLAttributes<HTMLDivElement> {
  value: DateRangeOfQuery,
  updateData: Function,
}

export function DatePickerWithRange({
  value,
  updateData,
  className,
  ...prop
}: DatePickerWithRangeProp) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "text-[12px] w-full h-[30px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "PPP", {
                    locale: zhCN
                  })} -{" "}
                  {format(value.to, "PPP", {
                    locale: zhCN
                  })}
                </>
              ) : (
                format(value.from, "PPP", {
                  locale: zhCN
                })
              )
            ) : (
              <span>选择时间范围:</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={value}
            onSelect={updateData}
            onDayBlur={prop.onBlur}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
