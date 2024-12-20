import { ReactNode } from "react"
import { DivProp } from "@/View/type"
import { RetrievePatientProvider, useRetrievePatientService } from "@/service/RetrievePatientService"
import { CustomInput, CustomInputCell } from "./component/CustomInput"
import CalendarUsedInDialog from "./component/CalendarUsedInDialog"
import Pagination from "./component/Pagination"
import { ResultTable } from "./component/ResultTable"
import { Button } from "@/components/ui/button"
import { DialogWrapper } from "./BaseDialogWrapper"

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            className="queryForm"
        >
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInputCell
                    label="体检人员ID:"
                    containerWidth={210}
                    inputWidth={120}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="人员姓名:"
                    containerWidth={210}
                    inputWidth={120}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="体检编号:"
                    containerWidth={210}
                    inputWidth={120}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="体检日期:"
                    containerWidth={210}
                    inputWidth={140}
                >
                    <CalendarUsedInDialog />
                </CustomInputCell>
            </Row>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInputCell
                    label="版本:"
                    containerWidth={130}
                    inputWidth={80}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="单位社会信用代码:"
                    containerWidth={250}
                    inputWidth={120}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="单位名称:"
                    containerWidth={200}
                    inputWidth={120}
                >
                    <CustomInput />
                </CustomInputCell>
                <CustomInputCell
                    label="性别:"
                    containerWidth={130}
                    inputWidth={90}
                >
                    <CustomInput />
                </CustomInputCell>
            </Row>
            <Row
                style={{
                    gap: "20px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <CustomInputCell
                        label="生日:"
                        containerWidth={190}
                        inputWidth={150}
                    >
                        <CalendarUsedInDialog />
                    </CustomInputCell>
                    <CustomInputCell
                        label="年龄:"
                        containerWidth={130}
                        inputWidth={80}
                    >
                        <CustomInput />
                    </CustomInputCell>
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="h-[--queryForm-row-height] bg-[--theme-fore-color] hover:bg-[--theme-fore-color-hover]"
                            style={{
                                fontSize: "var(--global-font-size)"
                            }}
                        >
                            {isSubmitting ? '查询中' : '查询'}
                        </Button>
                    )}
                />
            </Row>
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