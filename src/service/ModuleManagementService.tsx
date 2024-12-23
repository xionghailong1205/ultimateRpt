import { ExaminationInfo, ExaminationManagement } from "@/api/ExaminationManagement";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ExaminationItemListStatus = "querying" | "AfterQuerying"

type EditorBoxStatus = "nothing" | "editingExamination" | "editingDisease" | "viewingExamination" | "viewingDisease"

interface ModuleManagementServiceContextProp {
    selectedItemId: number | undefined;
    selectedDiseaseCode: string | undefined;
    examinationItemList: Array<ExaminationInfo>;
    initExaminationItemList: Function;
    examinationItemListStatus: ExaminationItemListStatus;
    editorBoxStatus: EditorBoxStatus;
    changeEditorBoxStatus: (newStatus: EditorBoxStatus) => void;
    isViewing: () => boolean;
    // 进行查看和编辑检查项目的接口
    viewExaminationItemInfo: (itemId: number) => void
    editExaminationItemInfo: () => void
    // 进行查看和编辑疾病的接口
    viewDiseaseInfo: (itemCode: string) => void
    // TODO
    examinationInfoOfEditorBox: ExaminationInfoOfEditorBox
}

const ExaminationServiceContext = createContext<ModuleManagementServiceContextProp>(null!)

export interface ExaminationInfoOfEditorBox {
    itemCode: string,
    itemName: string,
    bodyPart: string,
    defaultValue: string
}

export type ExaminationInfoOfEditorBoxKey = keyof ExaminationInfoOfEditorBox;

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
    const [selectedItemId, setSelectedItemId] = useState<number | undefined>(undefined)
    const [selectedDiseaseCode, setSelectedDiseaseCode] = useState<string | undefined>(undefined)

    const getExaminationInfoOfEditorBox = () => {
        if (!selectedItemId) {
            return ({
                itemName: "",
                itemCode: "",
                defaultValue: "",
                bodyPart: ""
            })
        }

        let examinationInfo = examinationItemList.find(examinationInfo => {
            return examinationInfo.id === selectedItemId
        })!

        let examinationInfoOfEditorBox: ExaminationInfoOfEditorBox = {
            itemName: examinationInfo.itemName,
            itemCode: examinationInfo.itemCode,
            defaultValue: examinationInfo.defaultValue || "",
            bodyPart: examinationInfo.bodyPart?.[0] || ""
        }

        return examinationInfoOfEditorBox

        // formForExaminationItem.setFieldValue("itemName", examinationInfoOfEditorBox.itemName)
        // formForExaminationItem.setFieldValue("itemCode", examinationInfoOfEditorBox.itemCode)
        // formForExaminationItem.setFieldValue("defaultValue", examinationInfoOfEditorBox.defaultValue)
        // formForExaminationItem.setFieldValue("bodyPart", examinationInfoOfEditorBox.bodyPart)
    }

    const examinationInfoOfEditorBox = getExaminationInfoOfEditorBox()

    // useEffect(() => {
    //     getEaminationInfoOfEditorBox()
    // }, [selectedItemId])

    const getDiseaseInfoOfEditorBox = () => {
        let diseaseInfoOfEditorBox: DiseaseInfoOfEditorBox = {
            diseaseCode: "",
            name: "",
            sort: 0,
            description: ""
        }

        if (!selectedItemId) {
            return diseaseInfoOfEditorBox
        }

        let diseaseInfo = examinationItemList.find(examinationInfo => {
            return examinationInfo.itemCode === selectedItemId
        })!

        diseaseInfoOfEditorBox = {
            diseaseCode: "",
            name: "",
            sort: 0,
            description: ""
        }
    }

    // const examinationInfoOfEditorBox = getEaminationInfoOfEditorBox()

    const initExaminationItemList = async () => {
        const requestResult = await ExaminationManagement.RetrieveExaminationList()

        const responseCode = requestResult.code

        handleAuthenticationFailure(responseCode)

        console.log(requestResult.data)

        if (requestResult.code === 200) {
            setExaminationItemList(requestResult.data)
        }

        setExaminationItemListStatus("AfterQuerying")
    }

    const changeEditorBoxStatus = (newStatus: EditorBoxStatus) => {
        // 我们之后可以在这个位置去做拦截
        setEditorBoxStatus(newStatus)
    }

    const viewExaminationItemInfo = (itemId: number) => {
        setSelectedItemId(itemId)
        setSelectedDiseaseCode(undefined)
        changeEditorBoxStatus("viewingExamination")
    }

    const editExaminationItemInfo = () => {
        setEditorBoxStatus("editingExamination")
    }

    const viewDiseaseInfo = (diseaseCode: string) => {
        setSelectedItemId(undefined)
        setSelectedDiseaseCode(diseaseCode)
        setEditorBoxStatus("viewingDisease")
    }

    const isViewing = () => {
        if (editorBoxStatus === "viewingDisease" || editorBoxStatus === "viewingExamination") {
            return true
        }

        return false
    }

    const value: ModuleManagementServiceContextProp = {
        selectedItemId: selectedItemId,
        examinationItemList,
        initExaminationItemList,
        examinationItemListStatus,
        editorBoxStatus,
        changeEditorBoxStatus,
        // examinationInfoOfEditorBox,
        viewExaminationItemInfo,
        editExaminationItemInfo,
        isViewing,
        viewDiseaseInfo,
        selectedDiseaseCode,
        examinationInfoOfEditorBox
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