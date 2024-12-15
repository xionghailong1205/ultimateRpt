import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DialogTriggerButton from "../DialogTriggerButton"
import { DatePickerWithRange } from "./component/DateRangePicker"
import { DateRangeOfQuery, EntryPatientProvider, useEntryPatientService } from "@/service/EntryPatientService"
import { useForm } from "@tanstack/react-form"
import clsx from "clsx"


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
                        // "placeholder:text-red-800": fieldEmpty
                    })

                    console.log(className)
                    return (
                        <>
                            <DatePickerWithRange
                                dateRange={field.state.value}
                                setDateRange={(value: DateRangeOfQuery) => {
                                    console.log(value)
                                    field.handleChange(value)
                                }}
                                onBlur={field.handleBlur}
                                className={className}
                            />
                        </>
                    )
                }}
            />
        </form>
    )
}



export default EntryPatientDialog