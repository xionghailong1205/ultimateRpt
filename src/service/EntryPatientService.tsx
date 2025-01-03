import { DateRange } from "react-day-picker"
import { createContext, ReactNode, useContext, useState } from "react";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { formatISO } from "date-fns";
import { EntryPatient, PatientInfo, EntryPatientManuallyObject } from "@/api/EntryPatient";
import { ResultTableState } from "@/View/HomePage/Header/component/Dialog/component/ResultTable";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";

export type DateRangeOfQuery = DateRange | undefined

// 我们做一个基础接口 
interface TableProp<T> {
    pageSize: number;
    currentPage: number;
    totalCount: number;
    navToPage: Function;
    navToPageSize: Function;
    currentPageData: Array<T>;
    resultTableState: ResultTableState;
}

// 12.16 添加查询结果列表
interface EntryPatientServiceProp extends TableProp<PatientTableRowDataProp> {
    form: ReactFormExtendedApi<{
        dateRange: DateRangeOfQuery;
    }, undefined>;
    formForEntryPatient: ReactFormExtendedApi<EntryPatientManuallyObject, undefined>
}

interface PatientTableRowDataProp {
    bhkCode: string;
    personName: string;
    sex: string;
    age: string;
    idc: string;
    bhkDate: string;
    crptName: string;
}

const EntryPatientContext = createContext<EntryPatientServiceProp>(null!)

export const EntryPatientProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [resultTableState, setResultTableState] = useState<ResultTableState>("waitQuery")
    const [patientList, setPatientList] = useState<Array<PatientInfo>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const totalCount = patientList.length

    // 用于 slice 的参数
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize

    const currentPageData: Array<PatientTableRowDataProp> = patientList.slice(start, end).map(patientInfo => {
        return {
            bhkCode: patientInfo.bhkCode,
            personName: patientInfo.personName,
            sex: patientInfo.sex,
            age: patientInfo.age,
            idc: patientInfo.idc,
            bhkDate: patientInfo.bhkDate,
            crptName: patientInfo.crptName
        }
    })

    const navToPage = (targetPage: number) => {
        setCurrentPage(targetPage)
    }

    const navToPageSize = () => {
        alert("尚未实现")
    }

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

            setResultTableState("querying")

            const requestResult = await EntryPatient.FetchPatientInfoListFromMeichiAPI({
                startTime,
                endTime
            })

            handleAuthenticationFailure(requestResult.code)

            if (requestResult.code === 500) {
                alert("服务器查询出现错误!")
            }

            if (requestResult.code === 200) {
                if (requestResult.data.length > 0) {
                    setResultTableState("HaveResultAfterQuerying")
                    setPatientList(requestResult.data)
                } else {
                    setResultTableState("noResultAfterQuerying")
                }
            }
        },
        defaultState: {
            canSubmit: false
        }
    })

    const emptryEntryPatientManuallyObject: EntryPatientManuallyObject = {
        personName: "",
        bhkCode: "",
        institutionCode: "",
        crptName: "",
        sex: "",
        idc: "",
        brth: "",
        age: "",
        isXrMd: "",
        lnkTel: "",
        wrkLnt: "",
        wrkLntMonth: "",
        tchBadRsnTim: "",
        tchBadRsnMonth: "",
        bhkDate: "",
        version: "",
        badRsn: ""
    }

    const formForEntryPatient = useForm<EntryPatientManuallyObject, undefined>({
        defaultValues: emptryEntryPatientManuallyObject,
        onSubmit: async ({ value }) => {
            const reqRst = await EntryPatient.EntryPatientManually({
                entryPatientManuallyObject: value
            })

            const resCode = reqRst.code

            handleAuthenticationFailure(resCode)

            if (resCode === 200) {
                alert("录入成功")
            }
        },
        defaultState: {
            canSubmit: false
        },
    })

    const value = {
        resultTableState,
        form,
        currentPageData,
        totalCount,
        pageSize,
        currentPage,
        navToPage,
        navToPageSize,
        formForEntryPatient
    }

    return <EntryPatientContext.Provider value={value}>{children}</EntryPatientContext.Provider>
}

export const useEntryPatientService = () => {
    return useContext(EntryPatientContext)
}