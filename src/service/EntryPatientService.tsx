import { DateRange } from "react-day-picker"
import { createContext, ReactNode, useContext, useState } from "react";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { formatISO } from "date-fns";
import { EntryPatient, PatientInfo } from "@/api/EntryPatient";

export type DateRangeOfQuery = DateRange | undefined

// 12.16 添加查询结果列表
interface EntryPatientServiceProp {
    form: ReactFormExtendedApi<{
        dateRange: DateRangeOfQuery;
    }, undefined>;
    patientList: Array<PatientInfo>
}

const EntryPatientContext = createContext<EntryPatientServiceProp>(null!)

export const EntryPatientProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [patientList, setPatientList] = useState<Array<PatientInfo>>([])

    const form = useForm<{
        dateRange: DateRangeOfQuery
    }, undefined>({
        defaultValues: {
            dateRange: undefined
        },
        onSubmit: async ({ value }) => {
            const dateRange = value.dateRange!
            const startTime = formatISO(dateRange.from!)
            const endTime = formatISO(dateRange.to!)

            console.log(startTime, endTime)

            const requestResult = await EntryPatient.FetchPatientInfoListFromMeichiAPI({
                startTime,
                endTime
            })

            if (requestResult.code === 500) {
                alert("服务器查询出现错误!")
            }

            if (requestResult.code === 200) {
                setPatientList(requestResult.data)
            }
        }
    })

    const value = {
        form,
        patientList
    }

    return <EntryPatientContext.Provider value={value}>{children}</EntryPatientContext.Provider>
}

export const useEntryPatientService = () => {
    return useContext(EntryPatientContext)
}