import * as React from "react"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { format, formatISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { zhCN } from "date-fns/locale"
import { useDialogContext } from "@/View/HomePage/Header/component/Dialog/BaseDialogWrapper"
import { useFieldValidService } from "@/service/FieldValidService"
import { parseISO } from "date-fns";
import clsx from "clsx"

const CalendarInput = () => {
    // const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [open, setOpen] = React.useState<boolean>(false)

    let date: Date | undefined = undefined

    const {
        setHasPopOverOpen
    } = useDialogContext()

    const {
        handleChange,
        handleBlur,
        fieldValue,
        inValid
    } = useFieldValidService()

    const className = clsx({
        'ring-1 ring-[#b91c1c]': inValid,
    })

    if (fieldValue) {
        console.log("进行解析")
        date = parseISO(fieldValue)
    } else {
        console.log("进行设置")
        date = undefined
    }

    return (
        <Popover
            open={open}
            onOpenChange={(open) => {
                setHasPopOverOpen(open)
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "text-[12px] h-[30px] pl-3 text-left font-normal w-full focus:ring-1 ring-[#2da5b4]",
                        !date && "text-muted-foreground",
                        className
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
                    captionLayout="dropdown"
                    selected={date}
                    onSelect={(newDate) => {
                        if (newDate) {
                            const ISOString = formatISO(newDate)
                            handleChange(ISOString)
                        } else {
                            handleChange('')
                        }
                    }}
                    onDayBlur={(newDate) => {
                        if (newDate) {
                            const ISOString = formatISO(newDate)
                            handleBlur(ISOString)
                        } else {
                            handleBlur('')
                        }
                    }}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    onDayClick={() => {
                        setOpen(false)
                        setHasPopOverOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default CalendarInput