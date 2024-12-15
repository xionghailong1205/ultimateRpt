import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DialogTriggerButton from "./component/DialogTriggerButton"
import { DatePickerWithRange } from "./component/DateRangePicker"
import { DateRangeOfQuery, EntryPatientProvider, useEntryPatientService } from "@/service/EntryPatientService"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { DivProp } from "@/View/type"
import { ReactNode } from "react"
import { CustomInputCell } from "./component/CustomInput"


const EntryPatientDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <DialogTriggerButton
                        buttonName="录入病人"
                    />
                </div>
            </DialogTrigger>
            <DialogContent
                style={{
                    width: "1000px",
                    maxWidth: "1000px",
                    minWidth: "1000px"
                }}

                onPointerDownOutside={
                    (event) => {
                        event.preventDefault()
                    }
                }

                onOpenAutoFocus={
                    (event) => {
                        event.preventDefault()
                    }
                }
            >
                <DialogHeader>
                    <DialogTitle>录入病人</DialogTitle>
                </DialogHeader>
                <EntryPatientProvider>
                    <EntryPatientTable />
                </EntryPatientProvider>
            </DialogContent>
        </Dialog>
    )
}

const validateSelectDateRange = (dateRange: DateRangeOfQuery) => {
    if (!dateRange) {
        return false
    }
    if (!dateRange.from) {
        return false
    }
    if (!dateRange.to) {
        return false
    }
    return true
}

const EntryPatientTable = () => {
    // 添加简单的登陆验证
    const { form } = useEntryPatientService()

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <Row>
                <form.Field
                    name='dateRange'
                    validators={{
                        onChange: ({ value }) =>
                            !validateSelectDateRange(value)
                                ? '请选择日期'
                                : undefined
                    }}
                    children={(field) => {
                        const fieldEmpty = field.state.meta.errors.length > 0

                        const className = clsx({
                            'border-red-700': fieldEmpty,
                        })

                        return (
                            <CustomInputCell
                                label="起始时间 - 结束时间："
                                containerWidth={400}
                                inputWidth={250}
                            >
                                <DatePickerWithRange
                                    value={field.state.value}
                                    updateData={(value: DateRangeOfQuery) => {
                                        field.handleChange(value)
                                    }}
                                    onBlur={field.handleBlur}
                                    className={className}
                                />
                            </CustomInputCell>
                        )
                    }}
                />
            </Row>
            {/* 最后一行 */}
            <Row
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    之后增加 Input
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="h-[--queryForm-row-height] bg-[--theme-fore-color] hover:bg-[--theme-fore-color-hover]"
                        >
                            {isSubmitting ? '查询中' : '查询'}
                        </Button>
                    )}
                />
            </Row>
        </form>
    )
}

interface RowProp extends DivProp {
    children: Array<ReactNode>
}

const Row = ({
    children,
    ...prop
}: RowProp) => {
    return (
        <div
            {...prop}
            style={{
                display: "flex",
                ...prop.style
            }}
        >
            {children}
        </div>
    )
}



export default EntryPatientDialog