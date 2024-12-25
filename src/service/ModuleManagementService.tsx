import { DiseaseManagement } from "@/api/DiseaseManagement";
import { ExaminationInfo, ExaminationManagement } from "@/api/ExaminationManagement";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ExaminationItemListStatus = "querying" | "AfterQuerying"

type EditorBoxStatus = "nothing" | "editingExamination" | "editingDisease" | "viewingExamination" | "viewingDisease"

interface ModuleManagementServiceContextProp {
    selectedItemId: number | undefined;
    selectedDiseaseId: number | undefined;
    examinationItemList: Array<ExaminationInfo>;
    fetchExaminationItemList: Function;
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
    handleEditExaminationInfoSuccessfully: () => void;
    diseaseInfoOfEditorBox: DiseaseInfoOfEditorBox
}

const ExaminationServiceContext = createContext<ModuleManagementServiceContextProp>(null!)

export interface ExaminationInfoOfEditorBox {
    itemCode: string,
    itemName: string,
    bodyParts: string,
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
    // 我们在这里创建一个空的疾病详情数据
    const emptyDiseaseInfoOfEditorBox: DiseaseInfoOfEditorBox = {
        diseaseCode: "",
        name: "",
        sort: 0,
        description: ""
    }

    const [examinationItemList, setExaminationItemList] = useState<Array<ExaminationInfo>>([])
    const [examinationItemListStatus, setExaminationItemListStatus] = useState<ExaminationItemListStatus>("querying")
    const [editorBoxStatus, setEditorBoxStatus] = useState<EditorBoxStatus>("nothing")
    const [selectedItemId, setSelectedItemId] = useState<number | undefined>(undefined)
    const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | undefined>(undefined)
    const [diseaseInfoOfEditorBox, setDiseaseInfoOfEditorBox] = useState<DiseaseInfoOfEditorBox>(emptyDiseaseInfoOfEditorBox)

    const getExaminationInfoOfEditorBox = () => {
        if (!selectedItemId) {
            const emptyExaminationInfoOfEditorBox: ExaminationInfoOfEditorBox = {
                itemCode: "",
                itemName: "",
                defaultValue: "",
                bodyParts: "",
            }

            return (emptyExaminationInfoOfEditorBox)
        }

        let examinationInfo = examinationItemList.find(examinationInfo => {
            return examinationInfo.id === selectedItemId
        })!

        let examinationInfoOfEditorBox: ExaminationInfoOfEditorBox = {
            itemName: examinationInfo.itemName,
            itemCode: examinationInfo.itemCode,
            defaultValue: examinationInfo.defaultValue || "",
            bodyParts: examinationInfo.bodyParts?.[0] || ""
        }

        return examinationInfoOfEditorBox
    }

    const examinationInfoOfEditorBox = getExaminationInfoOfEditorBox()

    const fetchExaminationItemList = async () => {
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
        setSelectedDiseaseId(undefined)
        changeEditorBoxStatus("viewingExamination")
    }

    const editExaminationItemInfo = () => {
        setEditorBoxStatus("editingExamination")
    }

    const viewDiseaseInfo = async (diseaseCode: string) => {
        const reqRst = await DiseaseManagement.getDiseaseInfoByDiseaseCode(diseaseCode)

        const resCode = reqRst.code

        handleAuthenticationFailure(resCode)

        if (resCode === 200) {
            const diseaseInfo = reqRst.data

            setSelectedItemId(undefined)
            setSelectedDiseaseId(diseaseInfo.id)
            const diseaseInfoOfEditorBox: DiseaseInfoOfEditorBox = {
                diseaseCode: diseaseInfo.diseaseCode,
                name: diseaseInfo.name,
                sort: diseaseInfo.sort,
                description: diseaseInfo.description
            }
            setDiseaseInfoOfEditorBox(diseaseInfoOfEditorBox)
            setEditorBoxStatus("viewingDisease")
        }
    }

    const isViewing = () => {
        if (editorBoxStatus === "viewingDisease" || editorBoxStatus === "viewingExamination") {
            return true
        }

        return false
    }

    const handleEditExaminationInfoSuccessfully = () => {
        // 首先重新获取数据
        fetchExaminationItemList()
        // 然后进入查看状态
        viewExaminationItemInfo(selectedItemId!)
    }

    const value: ModuleManagementServiceContextProp = {
        selectedItemId: selectedItemId,
        examinationItemList,
        fetchExaminationItemList,
        examinationItemListStatus,
        editorBoxStatus,
        changeEditorBoxStatus,
        // examinationInfoOfEditorBox,
        viewExaminationItemInfo,
        editExaminationItemInfo,
        isViewing,
        viewDiseaseInfo,
        selectedDiseaseId,
        handleEditExaminationInfoSuccessfully,
        // 用来渲染 表单的 数据
        examinationInfoOfEditorBox,
        diseaseInfoOfEditorBox
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