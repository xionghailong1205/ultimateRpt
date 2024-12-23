import { OptionalPropForRetrievePatientList, PatientInfo, PatientService } from "@/api/PatientService";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { ResultTableState } from "@/View/HomePage/Header/component/Dialog/component/ResultTable";
import { DialogTableProp } from "@/View/HomePage/Header/component/Dialog/Type";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { createContext, ReactNode, useContext, useState } from "react";

interface RetrievePatientServiceContext extends DialogTableProp<PatientTableRowDataProp> {
    form: ReactFormExtendedApi<OptionalPropForRetrievePatientList, undefined>;
}

const RetrievePatientContext = createContext<RetrievePatientServiceContext>(null!);

interface FetchPatientInfoListProp {
    targetPage: number
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

export const RetrievePatientProvider = ({ children }: {
    children: ReactNode
}) => {
    const [resultTableState, setResultTableState] = useState<ResultTableState>('waitQuery')
    const [currentPageData, setCurrentPageData] = useState<Array<PatientTableRowDataProp>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const FetchPatientInfoList = async ({
        targetPage
    }: FetchPatientInfoListProp) => {
        setResultTableState("querying")

        const requestResult = await PatientService.getPatientListOfPage({
            pageNumber: targetPage,
            pageSize
        })

        const responseCode = requestResult.code

        handleAuthenticationFailure(responseCode)

        if (requestResult.code === 200) {
            if (requestResult.patientList.length > 0) {
                setResultTableState("HaveResultAfterQuerying")

                const patientList = requestResult.patientList

                const patientTableRowList: Array<PatientTableRowDataProp> = patientList.map(patientInfo => {
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

                setCurrentPageData(patientTableRowList)
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

    const form = useForm<OptionalPropForRetrievePatientList, undefined>({
        defaultValues: {
            bhkCode: "",
            personName: "",
            sex: "",
            age: "",
            idc: "",
            bhkDate: "",
            crptName: ""
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

