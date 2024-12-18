import { PatientInfo, RetrievePatient } from "@/api/RetrievePatient";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { ResultTableState } from "@/View/HomePage/Header/component/Dialog/component/ResultTable";
import { DialogTableProp } from "@/View/HomePage/Header/component/Dialog/Type";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface RetrievePatientServiceAPIProp {
    id: string
}

interface RetrievePatientServiceContext extends DialogTableProp<PatientInfo> {
    form: ReactFormExtendedApi<RetrievePatientServiceAPIProp, undefined>;
}

const RetrievePatientContext = createContext<RetrievePatientServiceContext>(null!);

interface FetchPatientInfoListProp {
    targetPage: number
}

export const RetrievePatientProvider = ({ children }: {
    children: ReactNode
}) => {
    const [resultTableState, setResultTableState] = useState<ResultTableState>('waitQuery')
    const [currentPageData, setCurrentPageData] = useState<Array<PatientInfo>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const FetchPatientInfoList = async ({
        targetPage
    }: FetchPatientInfoListProp) => {
        setResultTableState("querying")

        const requestResult = await RetrievePatient.getPatientListOfPage({
            pageNumber: targetPage,
            pageSize
        })

        const responseCode = requestResult.code

        handleAuthenticationFailure(responseCode)

        if (requestResult.code === 200) {
            if (requestResult.patientList.length > 0) {
                setResultTableState("HaveResultAfterQuerying")
                setCurrentPageData(requestResult.patientList)
                setTotalCount(requestResult.totalCount)
            } else {
                setResultTableState("noResultAfterQuerying")
            }
        }
    }

    const navToPage = (targetPage: number) => {
        setCurrentPage(targetPage)
        FetchPatientInfoList({
            targetPage
        })
    }

    const navToPageSize = () => {
        alert("尚未实现")
    }

    const form = useForm<RetrievePatientServiceAPIProp, undefined>({
        defaultValues: {
            id: ''
        },
        onSubmit: async ({ value }) => {
            setCurrentPage(1)
            await FetchPatientInfoList({
                targetPage: 1
            })
        }
    })

    const value: RetrievePatientServiceContext = {
        form,
        pageSize,
        currentPage,
        totalCount,
        navToPage,
        navToPageSize,
        currentPageData: currentPageData,
        resultTableState
    }

    return <RetrievePatientContext.Provider value={value}>{children}</RetrievePatientContext.Provider>
}

export const useRetrievePatientService = () => {
    return useContext(RetrievePatientContext);
};

