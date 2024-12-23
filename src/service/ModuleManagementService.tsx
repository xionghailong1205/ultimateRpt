import { ExaminationInfo, ExaminationManagement } from "@/api/ExaminationManagement";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { createContext, ReactNode, useContext, useState } from "react";

type ExaminationItemListStatus = "querying" | "AfterQuerying"

type EditorBoxStatus = "nothing" | "editingExamination" | "editingDisease" | "viewingExamination" | "viewingDisease"

interface ModuleManagementServiceContextProp {
    selectedItemCode: string | undefined;
    examinationItemList: Array<ExaminationInfo>;
    initExaminationItemList: Function;
    examinationItemListStatus: ExaminationItemListStatus;
    editorBoxStatus: EditorBoxStatus;
    examinationInfoOfEditorBox: ExaminationInfoOfEditorBox;
    changeEditorBoxStatus: (newStatus: EditorBoxStatus) => void;
    isViewing: () => boolean;
    // 进行查看和编辑检查项目的接口
    viewExaminationItemInfo: (itemCode: string) => void
    editExaminationItemInfo: (itemCode: string) => void
    // 进行查看和编辑疾病的接口
    viewDiseaseInfo: (itemCode: string) => void
    // editExaminationItemInfo: (itemCode: string) => void
}

const ExaminationServiceContext = createContext<ModuleManagementServiceContextProp>(null!)

interface ExaminationInfoOfEditorBox {
    itemCode: string,
    itemName: string,
    bodyPart: string,
    defaultValue: string
}

interface DiseaseInfoOfEditorBox {
    diseaseCode: string;
    name: string;
    sort: number;
    description: string;
}

export const ModuleManagementServiceProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [examinationItemList, setExaminationItemList] = useState<Array<ExaminationInfo>>([])
    const [examinationItemListStatus, setExaminationItemListStatus] = useState<ExaminationItemListStatus>("querying")
    const [editorBoxStatus, setEditorBoxStatus] = useState<EditorBoxStatus>("nothing")
    const [selectedItemCode, setSelectedItemCode] = useState<string | undefined>(undefined)
    const [selectedDiseaseCode, setSelectedDiseaseCode] = useState<string | undefined>(undefined)

    const getEaminationInfoOfEditorBox = () => {
        if (!selectedItemCode) {
            return ({
                itemName: "",
                itemCode: "",
                defaultValue: "",
                bodyPart: ""
            })
        }

        let examinationInfo = examinationItemList.find(examinationInfo => {
            return examinationInfo.itemCode === selectedItemCode
        })!

        let examinationInfoOfEditorBox: ExaminationInfoOfEditorBox = {
            itemName: examinationInfo.itemName,
            itemCode: examinationInfo.itemCode,
            defaultValue: examinationInfo.defaultValue || "",
            bodyPart: examinationInfo.bodyPart?.[0] || ""
        }

        return examinationInfoOfEditorBox
    }

    const getDiseaseInfoOfEditorBox = () => {
        let diseaseInfoOfEditorBox: DiseaseInfoOfEditorBox = {
            diseaseCode: "",
            name: "",
            sort: 0,
            description: ""
        }

        if (!selectedItemCode) {
            return diseaseInfoOfEditorBox
        }

        let diseaseInfo = examinationItemList.find(examinationInfo => {
            return examinationInfo.itemCode === selectedItemCode
        })!

        diseaseInfoOfEditorBox = {
            diseaseCode: "",
            name: "",
            sort: 0,
            description: ""
        }
    }

    const examinationInfoOfEditorBox = getEaminationInfoOfEditorBox()

    const initExaminationItemList = async () => {
        const requestResult = await ExaminationManagement.RetrieveExaminationList()

        const responseCode = requestResult.code

        handleAuthenticationFailure(responseCode)

        if (requestResult.code === 200) {
            setExaminationItemList(requestResult.data)
        }

        setExaminationItemListStatus("AfterQuerying")
    }

    const changeEditorBoxStatus = (newStatus: EditorBoxStatus) => {
        // 我们之后可以在这个位置去做拦截
        setEditorBoxStatus(newStatus)
    }

    const viewExaminationItemInfo = (itemCode: string) => {
        setSelectedItemCode(itemCode)
        changeEditorBoxStatus("viewingExamination")
    }

    const editExaminationItemInfo = (itemCode: string) => {
        setSelectedItemCode(itemCode)
        setEditorBoxStatus("editingExamination")
    }

    const viewDiseaseInfo = (diseaseCode: string) => {
        console.log(diseaseCode)
        setEditorBoxStatus("viewingDisease")
    }

    const isViewing = () => {
        if (editorBoxStatus === "viewingDisease" || editorBoxStatus === "viewingExamination") {
            return true
        }

        return false
    }

    const value: ModuleManagementServiceContextProp = {
        selectedItemCode,
        examinationItemList,
        initExaminationItemList,
        examinationItemListStatus,
        editorBoxStatus,
        changeEditorBoxStatus,
        examinationInfoOfEditorBox,
        viewExaminationItemInfo,
        editExaminationItemInfo,
        isViewing,
        viewDiseaseInfo
    }

    return (
        <ExaminationServiceContext.Provider
            value={value}
        >
            {children}
        </ExaminationServiceContext.Provider>
    )
}

export const useModuleManagementService = () => {
    return useContext(ExaminationServiceContext);
};