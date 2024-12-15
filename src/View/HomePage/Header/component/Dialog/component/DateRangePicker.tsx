import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zhCN } from "date-fns/locale"
import { DateRangeOfQuery, useEntryPatientService } from "@/service/EntryPatientService"

interface DatePickerWithRangeProp extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRangeOfQuery,
  setDateRange: Function,
}

export function DatePickerWithRange({
  dateRange,
  setDateRange,
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
              "text-[12px] h-[30px] w-[250px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "PPP", {
                    locale: zhCN
                  })} -{" "}
                  {format(dateRange.to, "PPP", {
                    locale: zhCN
                  })}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            onDayBlur={prop.onBlur}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
