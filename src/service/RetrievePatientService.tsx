import { QueryObject, PatientService } from "@/api/PatientService";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { ResultTableState } from "@/View/HomePage/Header/component/Dialog/component/ResultTable";
import { DialogTableProp } from "@/View/HomePage/Header/component/Dialog/Type";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";

interface RetrievePatientServiceContext extends DialogTableProp<PatientTableRowDataProp> {
    form: ReactFormExtendedApi<QueryObject, undefined>;
}

const RetrievePatientContext = createContext<RetrievePatientServiceContext>(null!);

interface FetchPatientInfoListProp {
    targetPage: number,
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
    // 用来配置可能需要的查询参数对象
    const emptyQueryObject: QueryObject = {
        personName: "",
        bhkCode: "",
        sex: "",
        age: "",
        idc: "",
        bhkDate: "",
        crptName: ""
    }

    const [resultTableState, setResultTableState] = useState<ResultTableState>('waitQuery')
    const [currentPageData, setCurrentPageData] = useState<Array<PatientTableRowDataProp>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const queryObjectRef = useRef(emptyQueryObject)

    const FetchPatientInfoList = async ({
        targetPage,
    }: FetchPatientInfoListProp) => {
        setResultTableState("querying")

        const queryObject = queryObjectRef.current

        const requestResult = await PatientService.getPatientListOfPage({
            pageNumber: targetPage,
            pageSize,
            queryObject
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
            targetPage,
        })
    }

    const navToPageSize = () => {
        alert("尚未实现")
    }

    const form = useForm<QueryObject, undefined>({
        defaultValues: emptyQueryObject,
        onSubmit: async ({ value }) => {
            console.log('newQueryObject:', value)

            queryObjectRef.current = value
            setCurrentPage(1)
            await FetchPatientInfoList({
                targetPage: 1,
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

