import * as React from "react"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { zhCN } from "date-fns/locale"

const CustomCalendar = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "pl-3 text-left font-normal w-full",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? (
                        format(date, "PPP", {
                            locale: zhCN
                        })
                    ) : (
                        <span>选择日期</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default CustomCalendar