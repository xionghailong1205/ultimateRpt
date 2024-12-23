import { ReactNode } from "react"
import { DivProp } from "@/View/type"
import { RetrievePatientProvider, useRetrievePatientService } from "@/service/RetrievePatientService"
import { CustomInput, CustomInputCell } from "./component/CustomInput"
import CalendarUsedInDialog from "./component/CalendarUsedInDialog"
import Pagination from "./component/Pagination"
import { ResultTable } from "./component/ResultTable"
import { Button } from "@/components/ui/button"
import { DialogWrapper } from "./BaseDialogWrapper"
import ButtonInTable from "@/components/StyledComponent/ButtonInTable"
import { TableInputCol, TableSchema } from "@/service/TableService/TableService"
import { KeyForPatientRetrieve } from "@/api/PatientService"
import { Key2LabelService } from "@/map/key2LabelService"
import { VerificationHelper } from "@/service/VerificationHelper"
import clsx from "clsx"
import { FieldValidContext, FieldValidContextProp } from "@/service/FieldValidService"

const RetrievePatientDialog = () => {
    return (
        <DialogWrapper
            title="检索病人"
            tableComponent={
                <RetrievePatientProvider>
                    <PatientTable />
                </RetrievePatientProvider>
            }
        />
    )
}

const PatientTable = () => {
    const {
        currentPageData,
        resultTableState,
        currentPage,
        totalCount,
        pageSize,
        navToPage,
        navToPageSize
    } = useRetrievePatientService()

    return (
        <div>
            <QueryForm />
            <ResultTable state={resultTableState} rowDataList={currentPageData} keyField={"id"} />
            {/* TODO: 我们需要继续完善这里的代码 */}
            <Pagination currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} navToPage={navToPage} navToPageSize={navToPageSize} />
        </div>
    )
}

const QueryForm = () => {
    const {
        form
    } = useRetrievePatientService()

    const getLabel = Key2LabelService.getLabel

    const tableSchemaList: Array<TableSchema<KeyForPatientRetrieve>> = [
        {
            key: "personName",
            label: getLabel("personName"),
            type: "input",
        },
        {
            key: "bhkCode",
            label: getLabel("bhkCode"),
            type: "input",
        },
        {
            key: "sex",
            label: getLabel("sex"),
            type: "input",
        },
        {
            key: "age",
            label: getLabel("age"),
            type: "input",
        },
        {
            key: "idc",
            label: getLabel("idc"),
            type: "input",
        },
        {
            key: "bhkDate",
            label: getLabel("bhkDate"),
            type: "input",
        },
        {
            key: "crptName",
            label: getLabel("crptName"),
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
            className="queryForm"
        >
            <div
                className="px-2 py-2"
            >
                <div
                    className="grid grid-cols-6 gap-x-2 gap-y-1"
                >
                    {
                        tableSchemaList.map(tableSchema => {
                            return (
                                <form.Field
                                    name={tableSchema.key}
                                    validators={{
                                        onChange: ({ value }) => {
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
                                            fieldValue: String(field.state.value),
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
                                {isSubmitting ? '查询中' : '查询'}
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

export default RetrievePatientDialog