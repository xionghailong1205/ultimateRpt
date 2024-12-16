import { PatientInfo, RetrievePatient } from "@/api/RetrievePatient";
import { createContext, ReactNode, useContext, useState } from "react";

interface PatientServiceProp {
    patientInfoList: Array<PatientInfo>,
    pageSize: number,
    currentPage: number,
    totalCount: number,
    fetchPatientInfoList: () => void,
    navToPage: (targetPage: number) => void,
    changePageSize: (newPageSize: number) => void
}

const PatientContext = createContext<PatientServiceProp>(null!);

export const PatientProvider = ({ children }: {
    children: ReactNode
}) => {
    const [patientInfoList, setPatientInfoList] = useState<Array<PatientInfo>>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const fetchPatientInfoList = () => {
        RetrievePatient.getPatientListOfPage({
            pageSize: pageSize,
            pageNumber: currentPage
        }).then(requestResult => {
            const {
                patientList,
                totalCount
            } = requestResult

            setPatientInfoList(patientList)
            setTotalCount(totalCount)
        })
    }

    const navToPage = (targetPage: number) => {
        console.log(targetPage)
        setCurrentPage(targetPage)
    }

    const changePageSize = (newPageSize: number) => {
        setPageSize(newPageSize)
    }

    const value = {
        patientInfoList,
        fetchPatientInfoList,
        currentPage,
        navToPage,
        totalCount,
        pageSize,
        changePageSize
    }

    return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
}

export const usePatientService = () => {
    return useContext(PatientContext);
};

