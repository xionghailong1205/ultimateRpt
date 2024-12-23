import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDialogContext } from "@/View/HomePage/Header/component/Dialog/BaseDialogWrapper"
import { DivProp } from "@/View/type"
import { useState } from "react"

interface Option {
    label: string,
    value: string,
}

export interface SelectInputProp {
    placeHolder: string;
    optionList: Array<Option>;
}

export function SelectInput({
    placeHolder,
    optionList,
}: SelectInputProp) {
    const [open, setOpen] = useState(false)
    const {
        setHasPopOverOpen
    } = useDialogContext()

    return (
        <Select
            open={open}
            onOpenChange={(open) => {
                setHasPopOverOpen(open)
            }}
            onValueChange={() => {
                setOpen(false)
            }}
        >
            <SelectTrigger
                className="w-full h-[--table-input-height]"
                onClick={() => {
                    setOpen(true)
                }}
            >
                <div
                    className="text-[12px]"
                >
                    <SelectValue
                        placeholder={placeHolder}
                    />
                </div>
            </SelectTrigger>
            <SelectContent
                onEscapeKeyDown={() => {
                    // e.preventDefault()
                    setHasPopOverOpen(false)
                    setOpen(false)
                }}
                onPointerDownOutside={() => {
                    setOpen(false)
                }}
            >
                <SelectGroup>
                    {
                        optionList.map(optionInfo => {
                            return (
                                <SelectItem value={optionInfo.value}>{optionInfo.label}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}