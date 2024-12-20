import { ExaminationInfo, ExaminationManagement } from "@/api/ExaminationManagement";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { createContext, ReactNode, useContext, useState } from "react";

type ExaminationItemListStatus = "querying" | "AfterQuerying"

interface ExaminationServiceContextProp {
    examinationItemList: Array<ExaminationInfo>;
    initExaminationItemList: Function;
    examinationItemListStatus: ExaminationItemListStatus
}

const ExaminationServiceContext = createContext<ExaminationServiceContextProp>(null!)

export const ExaminationServiceProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [examinationItemList, setExaminationItemList] = useState<Array<ExaminationInfo>>([])
    const [examinationItemListStatus, setExaminationItemListStatus] = useState<ExaminationItemListStatus>("querying")

    const initExaminationItemList = async () => {
        const requestResult = await ExaminationManagement.RetrieveExaminationList()

        const responseCode = requestResult.code

        handleAuthenticationFailure(responseCode)

        if (requestResult.code === 200) {
            setExaminationItemList(requestResult.data)
        }

        setExaminationItemListStatus("AfterQuerying")
    }

    const value: ExaminationServiceContextProp = {
        examinationItemList,
        initExaminationItemList,
        examinationItemListStatus
    }

    return (
        <ExaminationServiceContext.Provider
            value={value}
        >
            {children}
        </ExaminationServiceContext.Provider>
    )
}

export const useExaminationService = () => {
    return useContext(ExaminationServiceContext);
};