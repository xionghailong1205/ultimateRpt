import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { useFieldValidService } from "@/service/FieldValidService";
import { useDialogContext } from "@/View/HomePage/Header/component/Dialog/BaseDialogWrapper"
import { DivProp, SelectProp } from "@/View/type"
import clsx from "clsx";
import { useState } from "react"

interface Option {
    label: string,
    value: string,
}

export interface SelectInputProp extends SelectProp {
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

    const {
        handleChange,
        handleBlur,
        fieldValue,
        inValid
    } = useFieldValidService()

    console.log(fieldValue)

    const className = clsx({
        'ring-1 ring-[#b91c1c]': inValid,
    })

    return (
        <Select
            value={fieldValue}
            open={open}
            onOpenChange={(open) => {
                setHasPopOverOpen(open)
            }}
            onValueChange={(value) => {
                handleChange(value)
                setOpen(false)
            }}
        >
            <SelectTrigger
                className={cn("w-full h-[--table-input-height]", className)}
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
                    handleBlur(fieldValue)
                    setOpen(false)
                }}
            // @ts-ignore
            // onBlur={handleBlur}
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