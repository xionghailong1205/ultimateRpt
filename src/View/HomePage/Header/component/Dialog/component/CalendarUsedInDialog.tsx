import * as React from "react"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { zhCN } from "date-fns/locale"
import { useDialogContext } from "../BaseDialogWrapper"

const CalendarUsedInDialog = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [open, setOpen] = React.useState<boolean>(false)
    const {
        setHasPopOverOpen
    } = useDialogContext()

    return (
        <Popover
            modal={true}
            open={open}
            onOpenChange={(open) => {
                setHasPopOverOpen(open)
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "text-[12px] h-[30px] pl-3 text-left font-normal w-full focus-visible:ring-[#2da5b4]",
                        !date && "text-muted-foreground"
                    )}
                    onClick={() => {
                        setOpen(true)
                    }}
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
            <PopoverContent
                className="w-auto p-0"
                align="start"
                onEscapeKeyDown={() => {
                    // e.preventDefault()
                    setHasPopOverOpen(false)
                    setOpen(false)
                }}
                onPointerDownOutside={() => {
                    setOpen(false)
                }}
            >
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

export default CalendarUsedInDialog