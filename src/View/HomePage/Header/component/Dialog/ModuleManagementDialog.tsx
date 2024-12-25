import { useEffect } from "react"
import { DivProp } from "@/View/type"
import { DialogWrapper } from "./BaseDialogWrapper"
import { ExaminationManagement } from "@/api/ExaminationManagement"
import { cn } from "@/lib/utils"
import { ExaminationInfoOfEditorBox, ExaminationInfoOfEditorBoxKey, ModuleManagementServiceProvider, useModuleManagementService } from "@/service/ModuleManagementService"
import { PlusIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import CollapsibleExaminationItem from "./component/CollapsibleExaminationItem"
import ButtonInTable from "@/components/StyledComponent/ButtonInTable"
import { DiseaseInfoOfEditorBox, DiseaseInfoOfEditorBoxKey } from "@/api/DiseaseManagement"
import { Key2LabelService } from "@/map/key2LabelService"
import { TableInputCol, TableSchema } from "@/service/TableService/TableService"
import { FieldValidContext, FieldValidContextProp } from "@/service/FieldValidService"
import { BodyPartService } from "@/service/BodyPartService"
import { VerificationHelper } from "@/service/VerificationHelper"
import { useForm } from "@tanstack/react-form"
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure"
import { useAlertDialog } from "@/store/useAlertDialog"
// import { InputType, TableSchema, TableSchemaService } from "@/service/TableService/EntryPatientTableService"

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
        fetchExaminationItemList: initExaminationItemList,
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
                <EditingExaminationItemTable />
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

const ExaminationItemTable = () => {
    const {
        examinationInfoOfEditorBox,
        isViewing,
        editExaminationItemInfo,
        editorBoxStatus,
        selectedItemId,
        handleEditExaminationInfoSuccessfully
    } = useModuleManagementService()

    const getLabel = Key2LabelService.getLabel
    const makeSureNotEmpty = VerificationHelper.makeSureNotEmpty

    // 简单的 schema driver layoute
    const tableSchemaList: Array<TableSchema<ExaminationInfoOfEditorBoxKey>> = [
        {
            key: "itemCode",
            label: getLabel("itemCode"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "itemName",
            label: getLabel("itemName"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "defaultValue",
            label: getLabel("defaultValue"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "bodyParts",
            label: getLabel("bodyPart"),
            type: "selector",
            selectInputProp: {
                placeHolder: "请选择关联身体部位",
                optionList: [...BodyPartService.getBodyPartOptionList()]
            },
            validFnc: makeSureNotEmpty
        }
    ]

    const form = useForm<ExaminationInfoOfEditorBox, undefined>({
        defaultValues: examinationInfoOfEditorBox,
        onSubmit: async ({ value }) => {
            const reqRst = await ExaminationManagement.EditExaminationItem({
                id: selectedItemId!,
                itemCode: value.itemCode,
                itemName: value.itemName,
                defaultValue: value.defaultValue,
                bodyParts: [value.bodyParts]
            })

            const responseCode = reqRst.code

            handleAuthenticationFailure(responseCode)

            if (responseCode === 200) {
                const openDialog = useAlertDialog.getState().openDialog;
                openDialog({
                    dialogTitle: "编辑检查项目",
                    dialogContent: "编辑检查项目成功！",
                    dialogClosedCallback: handleEditExaminationInfoSuccessfully
                });
            }
        }
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}

            className="editor-box w-full h-full px-3 border"
        >
            <div
                className="text-[20px] text-[--theme-fore-color] font-bold h-[--box-header-height] flex items-center"
            >
                {isViewing() ? "查看检查项目" : "编辑检查项目"}
            </div>
            <div
                className="h-[--box-content-height]"
            >
                <div
                    className="grid grid-cols-4 gap-x-2 gap-y-1"
                >
                    {
                        tableSchemaList.map(tableSchema => {
                            return (
                                <form.Field
                                    name={tableSchema.key}
                                    validators={{
                                        onChange: ({ value }) => {
                                            console.log(value)

                                            if (!tableSchema.validFnc) {
                                                return undefined
                                            }

                                            return tableSchema.validFnc(value)
                                        }
                                    }}
                                    children={(field) => {
                                        const inValid = field.state.meta.errors.length > 0

                                        console.log(inValid)

                                        let fieldValue = field.state.value
                                        let type = tableSchema.type

                                        if (isViewing()) {
                                            if (tableSchema.type === "selector") {
                                                fieldValue = BodyPartService.getBodyPartInfoOfSelectInputValue(fieldValue)?.labelName || ""
                                            }

                                            type = "readOnly"
                                        }

                                        const value: FieldValidContextProp = {
                                            handleChange: (value: string) => {
                                                field.handleChange(value)
                                            },
                                            handleBlur: field.handleBlur,
                                            fieldValue,
                                            inValid
                                        }

                                        return (
                                            <FieldValidContext.Provider
                                                value={value}
                                            >
                                                <TableInputCol
                                                    tableSchema={{
                                                        ...tableSchema,
                                                        type
                                                    }}
                                                />
                                            </FieldValidContext.Provider>
                                        )
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="h-[--box-footer-height] flex justify-end items-center"
            >
                {
                    editorBoxStatus === "viewingExamination" ? (
                        <ButtonInTable
                            type="button"
                            onClick={() => {
                                editExaminationItemInfo()
                            }}
                        >
                            进行编辑
                        </ButtonInTable>
                    ) : (
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <ButtonInTable
                                    type="submit"
                                    disabled={!canSubmit}
                                >
                                    {isSubmitting ? '保存中' : '保存更改'}
                                </ButtonInTable>
                            )}
                        />
                    )
                }
            </div>
        </form>
    )
}

const DiseaseTable = () => {
    const getLabel = Key2LabelService.getLabel

    const tableSchemaList: Array<TableSchema<DiseaseInfoOfEditorBoxKey>> = [
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

    const {
        diseaseInfoOfEditorBox,
        isViewing
    } = useModuleManagementService()

    const form = useForm<DiseaseInfoOfEditorBox, undefined>({
        defaultValues: diseaseInfoOfEditorBox,
        onSubmit: async ({ value }) => {
            // const reqRst = await ExaminationManagement.EditExaminationItem({
            //     id: selectedItemId!,
            //     itemCode: value.itemCode,
            //     itemName: value.itemName,
            //     defaultValue: value.defaultValue,
            //     bodyParts: [value.bodyParts]
            // })

            // const responseCode = reqRst.code

            // handleAuthenticationFailure(responseCode)

            // if (responseCode === 200) {
            //     const openDialog = useAlertDialog.getState().openDialog;
            //     openDialog({
            //         dialogTitle: "编辑检查项目",
            //         dialogContent: "编辑检查项目成功！",
            //         dialogClosedCallback: handleEditExaminationInfoSuccessfully
            //     });
            // }
            console.log(value)
            alert("我们之后做后续的操作！")
        }
    })

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
                                <form.Field
                                    name={tableSchema.key}
                                    validators={{
                                        onChange: ({ value }) => {
                                            console.log(value)

                                            if (!tableSchema.validFnc) {
                                                return undefined
                                            }

                                            return tableSchema.validFnc(value)
                                        }
                                    }}
                                    children={(field) => {
                                        const inValid = field.state.meta.errors.length > 0

                                        console.log(inValid)

                                        let fieldValue = field.state.value
                                        let type = tableSchema.type

                                        if (isViewing()) {
                                            if (tableSchema.type === "selector") {
                                                fieldValue = BodyPartService.getBodyPartInfoOfSelectInputValue(fieldValue)?.labelName || ""
                                            }

                                            type = "readOnly"
                                        }

                                        const value: FieldValidContextProp = {
                                            handleChange: (value: string) => {
                                                field.handleChange(value)
                                            },
                                            handleBlur: field.handleBlur,
                                            fieldValue,
                                            inValid
                                        }

                                        return (
                                            <FieldValidContext.Provider
                                                value={value}
                                            >
                                                <TableInputCol
                                                    tableSchema={{
                                                        ...tableSchema,
                                                        type
                                                    }}
                                                />
                                            </FieldValidContext.Provider>
                                        )
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div
                className="h-[--box-footer-height] flex justify-end items-center"
            >
                <ButtonInTable
                    onClick={() => {
                        // 之后实现代码
                    }}
                >
                    进行编辑
                </ButtonInTable>
            </div>
        </div>
    )
}

const ViewingExaminationItemTable = () => {
    return (
        <ExaminationItemTable />
    )
}

const EditingExaminationItemTable = () => {
    return (
        <ExaminationItemTable />
    )
}


export default ModuleManagementDialog