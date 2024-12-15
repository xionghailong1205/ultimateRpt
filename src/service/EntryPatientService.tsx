import { DateRange } from "react-day-picker"
import { createContext, ReactNode, useContext, useState } from "react";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";

export type DateRangeOfQuery = DateRange | undefined

interface EntryPatientServiceProp {
    form: ReactFormExtendedApi<{
        dateRange: DateRangeOfQuery;
    }, undefined>
}

const EntryPatientContext = createContext<EntryPatientServiceProp>(null!)

export const EntryPatientProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const form = useForm<{
        dateRange: DateRangeOfQuery
    }, undefined>({
        defaultValues: {
            dateRange: undefined
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            alert("之后执行验证")
        }
    })

    const value = {
        form
    }

    return <EntryPatientContext.Provider value={value}>{children}</EntryPatientContext.Provider>
}

export const useEntryPatientService = () => {
    return useContext(EntryPatientContext)
}