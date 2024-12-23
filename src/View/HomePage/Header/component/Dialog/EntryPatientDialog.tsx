import { DatePickerWithRange } from "./component/DateRangePicker"
import { DateRangeOfQuery, EntryPatientProvider, useEntryPatientService } from "@/service/EntryPatientService"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { DivProp } from "@/View/type"
import { ReactNode } from "react"
import { CustomInputCell } from "./component/CustomInput"
import { ResultTable } from "./component/ResultTable"
import Pagination from "./component/Pagination"
import { DialogWrapper } from "./BaseDialogWrapper"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Key2LabelService } from "@/map/key2LabelService"
import { TableInputCol, TableSchema } from "@/service/TableService/EntryPatientTableService"
import { KeyForPatientEntry } from "@/api/EntryPatient"
import ButtonInTable from "@/components/StyledComponent/ButtonInTable"
import { VerificationHelper } from "@/service/VerificationHelper"
import { FieldValidContext, FieldValidContextProp } from "@/service/FieldValidService"

const EntryPatientDialog = () => {
    return (
        <DialogWrapper
            title="检索病人"
            tableComponent={
                <EntryPatientProvider>
                    <EntryPatientTable />
                </EntryPatientProvider>
            }
        />
    )
}

const validateSelectDateRange = (dateRange: DateRangeOfQuery) => {
    if (!dateRange) {
        return false
    }
    if (!dateRange.from) {
        return false
    }
    if (!dateRange.to) {
        return false
    }
    return true
}

const EntryPatientTable = () => {
    // 添加简单的登陆验证
    return (
        <div>
            <Tabs defaultValue="apiEntry" className="w-full">
                <TabsList
                    className="w-full bg-white"
                >
                    <TabsTrigger value="apiEntry"
                        className="w-full"
                    >
                        从美慈APP录入
                    </TabsTrigger>
                    <TabsTrigger value="manualEntry"
                        className="w-full"
                    >
                        手动录入
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="apiEntry"
                    className="border"
                >
                    <ApiEntryTable />
                </TabsContent>
                <TabsContent value="manualEntry"
                    className="border"
                >
                    <ManualEntryTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}

const ApiEntryTable = () => {
    const {
        currentPageData,
        resultTableState,
        pageSize,
        currentPage,
        totalCount,
        navToPage,
        navToPageSize
    } = useEntryPatientService()

    return (
        <div
            className="px-2 py-2"
        >
            <QueryForm />
            <ResultTable
                rowDataList={currentPageData}
                keyField="personName"
                state={resultTableState}
            />
            <Pagination
                pageSize={pageSize}
                currentPage={currentPage}
                totalCount={totalCount}
                navToPage={navToPage}
                navToPageSize={navToPageSize}
            />
        </div>
    )
}

const ManualEntryTable = () => {
    const {
        formForEntryPatient: form
    } = useEntryPatientService()

    const getLabel = Key2LabelService.getLabel

    const makeSureNotEmpty = VerificationHelper.makeSureNotEmpty

    const tableSchemaList: Array<TableSchema<KeyForPatientEntry | "need" | "optional">> = [
        {
            key: "need",
            label: "必填字段",
            type: "subTitle"
        },
        {
            key: "personName",
            label: getLabel("personName"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "bhkCode",
            label: getLabel("bhkCode"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "bhkDate",
            label: getLabel("bhkDate"),
            type: "input",
            validFnc: makeSureNotEmpty
        },
        {
            key: "version",
            label: getLabel("version"),
            type: "selector",
            selectInputProp: {
                placeHolder: "请选择版本号",
                optionList: [
                    {
                        label: "V1",
                        value: "v1"
                    },
                    {
                        label: "V2",
                        value: "v2"
                    }
                ]
            },
            validFnc: makeSureNotEmpty
        },
        {
            key: "optional",
            label: "可选字段",
            type: "subTitle"
        },
        {
            key: "institutionCode",
            label: getLabel("institutionCode"),
            type: "input",
        },
        {
            key: "sex",
            label: getLabel("sex"),
            type: "input",
        },
        {
            key: "idc",
            label: getLabel("idc"),
            type: "input",
        },
        {
            key: "brth",
            label: getLabel("brth"),
            type: "input",
        },
        {
            key: "age",
            label: getLabel("age"),
            type: "input",
            inputType: "number",
        },
        {
            key: "isXrMd",
            label: getLabel("isXrMd"),
            type: "selector",
            selectInputProp: {
                placeHolder: "选择是否已婚",
                optionList: [
                    {
                        label: "是",
                        value: "true"
                    },
                    {
                        label: "否",
                        value: "false"
                    }
                ]
            }
        },
        {
            key: "lnkTel",
            label: getLabel("lnkTel"),
            type: "input",
            inputType: "tel",
        },
        {
            key: "wrkLnt",
            label: getLabel("wrkLnt"),
            type: "input",
            inputType: "number",
        },
        {
            key: "wrkLntMonth",
            label: getLabel("wrkLntMonth"),
            type: "input",
            inputType: "number",
        },
        {
            key: "tchBadRsnTim",
            label: getLabel("tchBadRsnTim"),
            type: "input",
            inputType: "number",
        },
        {
            key: "tchBadRsnMonth",
            label: getLabel("tchBadRsnMonth"),
            type: "input",
            inputType: "number",
        },
        {
            key: "badRsn",
            label: getLabel("badRsn"),
            type: "input",
        }
    ]

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <div
                className="px-2 py-2"
            >
                <div
                    className="grid grid-cols-6 gap-x-2 gap-y-1"
                >
                    {
                        tableSchemaList.map(tableSchema => {
                            if (tableSchema.key === "need" || tableSchema.key === "optional") {
                                return (
                                    <TableInputCol
                                        tableSchema={tableSchema}
                                        className="font-bold"
                                        value={tableSchema.label}
                                    />
                                )
                            } else {
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

                                            const value: FieldValidContextProp = {
                                                handleChange: (value: string) => {
                                                    field.handleChange(value)
                                                },
                                                handleBlur: field.handleBlur,
                                                fieldValue: field.state.value,
                                                inValid
                                            }

                                            return (
                                                <FieldValidContext.Provider
                                                    value={value}
                                                >
                                                    <TableInputCol
                                                        tableSchema={tableSchema}
                                                    />
                                                </FieldValidContext.Provider>
                                            )
                                        }}
                                    />
                                )
                            }
                        })
                    }
                </div>
                <div
                    className="h-[--box-footer-height] flex justify-end items-center pt-3"
                >
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <ButtonInTable
                                type="submit"
                                disabled={!canSubmit}
                            >
                                {isSubmitting ? '导入中' : '导入'}
                            </ButtonInTable>
                        )}
                    />
                </div>
            </div>
        </form>
    )
}

interface RowProp extends DivProp {
    children: Array<ReactNode>
}

const Row = ({
    children,
    ...prop
}: RowProp) => {
    return (
        <div
            {...prop}
            style={{
                display: "flex",
                ...prop.style
            }}
        >
            {children}
        </div>
    )
}

const QueryForm = () => {
    const { form } = useEntryPatientService()

    return (
        <form
            className="queryForm"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <Row>
                <form.Field
                    name='dateRange'
                    validators={{
                        onChange: ({ value }) =>
                            !validateSelectDateRange(value)
                                ? '请选择日期'
                                : undefined
                    }}
                    children={(field) => {
                        const fieldEmpty = field.state.meta.errors.length > 0

                        const className = clsx({
                            'border-red-700': fieldEmpty,
                        })

                        return (
                            <CustomInputCell
                                label="起始时间 - 结束时间："
                                containerWidth={400}
                                inputWidth={250}
                            >
                                <DatePickerWithRange
                                    value={field.state.value}
                                    updateData={(value: DateRangeOfQuery) => {
                                        field.handleChange(value)
                                    }}
                                    onBlur={field.handleBlur}
                                    className={className}
                                />
                            </CustomInputCell>
                        )
                    }}
                />
            </Row>
            {/* 最后一行 */}
            <Row
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        visibility: "hidden"
                    }}
                >
                    之后增加 Input
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="h-[--queryForm-row-height] bg-[--theme-fore-color] hover:bg-[--theme-fore-color-hover]"
                        >
                            {isSubmitting ? '查询中' : '查询'}
                        </Button>
                    )}
                />
            </Row>
        </form>
    )
}

export default EntryPatientDialog