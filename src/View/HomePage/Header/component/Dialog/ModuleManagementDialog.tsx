import { useEffect } from "react"
import { DivProp } from "@/View/type"
import { DialogWrapper } from "./BaseDialogWrapper"
import { ExaminationInfoKey, ExaminationManagement } from "@/api/ExaminationManagement"
import { cn } from "@/lib/utils"
import { ModuleManagementServiceProvider, useModuleManagementService } from "@/service/ModuleManagementService"
import { PlusIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import CollapsibleExaminationItem from "./component/CollapsibleExaminationItem"
import { Label } from "@/components/ui/label"
import NormalInput from "@/components/Inputer/NormalInput"
import { SelectInput } from "@/components/Inputer/SelectInput"
import RstInput from "@/components/Inputer/RstInput"
import ButtonInTable from "@/components/StyledComponent/ButtonInTable"
import { DiseaseInfoKey } from "@/api/DiseaseManagement"
import { Key2LabelService } from "@/map/key2LabelService"
import { InputType, TableSchema, TableSchemaService } from "@/service/TableSchemaService"

const ModuleManagementDialog = () => {
    return (
        <DialogWrapper
            title="模块管理"
            tableComponent={
                <ModuleManagementServiceProvider>
                    <ModuleManagementTable />
                </ModuleManagementServiceProvider>
            }
        />
    )
}

const ExaminationItemList = ({ ...prop }: DivProp) => {
    const {
        examinationItemList,
        initExaminationItemList,
        examinationItemListStatus,
    } = useModuleManagementService()

    useEffect(() => {
        console.log("进行 Fetch 操作")
        initExaminationItemList()
    }, [])

    return (
        <div
            {...prop}
            className={cn("h-[400px] w-[200px] border", prop.className)}
        >
            <OperatingBox />
            {
                examinationItemListStatus === "querying" ? (
                    <div
                        className="center h-full border"
                    >
                        <Spinner className="stroke-[var(--theme-fore-color)]" />
                    </div>
                ) : (
                    <div className="w-full border px-3 py-2 flex gap-1 flex-col h-[375px] overflow-auto">
                        {
                            examinationItemList.map(examinationInfo => {
                                return (
                                    <CollapsibleExaminationItem
                                        {...examinationInfo}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

const EditorBox = ({ ...prop }: DivProp) => {
    return (
        <div
            {...prop}
            className={cn("border flex-1 center", prop.className)}
        >
            <EditorBoxContent />
        </div>
    )
}

const EditorBoxContent = () => {
    const { editorBoxStatus } = useModuleManagementService()

    switch (editorBoxStatus) {
        case "nothing": {
            return (
                <div className="text-gray-500">
                    当前尚未对任何对象进行编辑...
                </div>
            )
        }
        case "editingExamination": {
            return (
                <div>
                    编辑体检项目的信息
                </div>
            )
        }
        case "editingDisease":
        case "viewingExamination": {
            return (
                <ViewingExaminationItemTable />
            )
        }
        case "viewingDisease": {
            return (
                <DiseaseTable />
            )
        }
    }
}

const ModuleManagementTable = () => {
    useEffect(() => {
        ExaminationManagement.RetrieveExaminationList()
    }, [])

    return (
        <div
            className="flex gap-3"
        >
            <ExaminationItemList />
            <EditorBox />
        </div>
    )
}

// 操作栏
const OperatingBox = () => {
    return (
        <div
            className="px-2 py-0.5 flex justify-between items-center bg-[--theme-fore-color] h-[25px]"
        >
            <div
                className="text-white"
            >
                体检项目列表
            </div>
            <div
                className="group h-5 w-5 center cursor-pointer rounded-sm"
            >
                <PlusIcon
                    className="group-hover:text-gray-300 h-4 w-4 text-[white]"
                />
            </div>
        </div>
    )
}

interface DiseaseTableSchema extends TableSchema<DiseaseInfoKey> { }

const getLabel = Key2LabelService.getLabel

const ExaminationItemTable = () => {
    // 简单的 schema driver layoute
    const tableSchemaList: Array<TableSchema<ExaminationInfoKey>> = [
        {
            key: "itemCode",
            label: getLabel("itemCode"),
            type: "input"
        },
        {
            key: "itemName",
            label: getLabel("itemName"),
            type: "input"
        },
        {
            key: "defaultValue",
            label: getLabel("defaultValue"),
            type: "input"
        },
        {
            key: "bodyPart",
            label: getLabel("bodyPart"),
            type: "selector"
        }
    ]

    const {
        examinationInfoOfEditorBox
    } = useModuleManagementService()

    return (
        <div
            className="editor-box w-full h-full px-3 border"
        >
            <div
                className="text-[20px] text-[--theme-fore-color] font-bold h-[--box-header-height] flex items-center"
            >
                查看检查项目
            </div>
            <div
                className="h-[--box-content-height]"
            >
                <div
                    className="grid grid-cols-2 gap-x-2 gap-y-1"
                >
                    {
                        tableSchemaList.map(tableSchema => {
                            return (
                                <TableInputCol
                                    tableSchema={tableSchema}
                                    // @ts-ignore
                                    value={examinationInfoOfEditorBox[tableSchema.key]}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="h-[--box-footer-height] flex justify-end items-center"
            >
                <ButtonInTable>
                    进行编辑
                </ButtonInTable>
            </div>
        </div>
    )
}

const DiseaseTable = () => {
    const tableSchemaList: Array<DiseaseTableSchema> = [
        {
            key: "diseaseCode",
            label: getLabel("diseaseCode"),
            type: "input",
        },
        {
            key: "name",
            label: "疾病名称",
            type: "input",
        },
        {
            key: "sort",
            label: "排序",
            type: "input",
        },
        {
            key: "description",
            label: "疾病描述",
            type: "textarea",
        }
    ]

    return (
        <div
            className="editor-box w-full h-full px-3 border"
        >
            <div
                className="text-[20px] text-[--theme-fore-color] font-bold h-[--box-header-height] flex items-center"
            >
                查看疾病
            </div>
            <div
                className="h-[--box-content-height]"
            >
                <div
                    className="grid grid-cols-2 gap-x-2 gap-y-1"
                >
                    {
                        tableSchemaList.map(tableSchema => {
                            return (
                                <TableInputCol
                                    tableSchema={tableSchema}
                                    value="123"
                                // @ts-ignore
                                // value={examinationInfoOfEditorBox[tableSchema.key]}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="h-[--box-footer-height] flex justify-end items-center"
            >
                <ButtonInTable>
                    进行编辑
                </ButtonInTable>
            </div>
        </div>
    )
}

const TableInputCol = ({
    tableSchema,
    value
}: {
    tableSchema: TableSchema<string>
    value: string
}) => {
    return (
        <div
            className="flex flex-col gap-0.5 flex-1"
            style={{
                gridColumn: TableSchemaService.getInputSpanInTable(tableSchema.type)
            }}
        >
            <Label
                className="text-[--theme-fore-color] text-[13px]"
            >
                {tableSchema.label}
            </Label>
            <div
                className={TableSchemaService.getInputHeight(tableSchema.type)}
            >
                <TableInput
                    type={tableSchema.type}
                    key={tableSchema.key}
                    value={value}
                />
            </div>
        </div>
    )
}

const TableInput = ({
    type,
    key,
    value
}: {
    type: InputType
    key: string
    value: string
}) => {
    const {
        isViewing
    } = useModuleManagementService()

    const viewing = isViewing()

    console.log(key, value)

    if (viewing) {
        return (
            <RstInput
                value={value}
            />
        )
    }

    switch (type) {
        case "input": {
            return (
                <NormalInput />
            )
        }
        case "selector": {
            return (
                <SelectInput />
            )
        }
    }
}

const ViewingExaminationItemTable = () => {
    return (
        <ExaminationItemTable />
    )
}


export default ModuleManagementDialog