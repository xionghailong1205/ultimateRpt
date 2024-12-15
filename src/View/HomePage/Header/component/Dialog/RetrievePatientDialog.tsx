import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import DialogTriggerButton from "./component/DialogTriggerButton"
import { ReactNode, useEffect } from "react"
import { DivProp, TableProp } from "@/View/type"
import { PatientProvider, usePatientService } from "@/service/PatientService"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import { Spinner } from "@/components/ui/spinner"
import { CustomInput, CustomInputCell } from "./component/CustomInput"
import CustomCalendar from "./component/CustomCalendar"

const RetrievePatientDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <DialogTriggerButton
                        buttonName="检索病人"
                    />
                </div>
            </DialogTrigger>
            <DialogContent
                style={{
                    width: "1000px",
                    maxWidth: "1000px",
                    minWidth: "1000px"
                }}

                onPointerDownOutside={
                    (event) => {
                        event.preventDefault()
                    }
                }

                onOpenAutoFocus={
                    (event) => {
                        event.preventDefault()
                    }
                }
            >
                <DialogHeader>
                    <DialogTitle>检索病人</DialogTitle>
                </DialogHeader>
                <PatientProvider>
                    <PatientTable />
                </PatientProvider>
            </DialogContent>
        </Dialog>
    )
}

const PatientTable = () => {
    const {
        fetchPatientInfoList
    } = usePatientService()

    useEffect(() => {
        fetchPatientInfoList()
    }, [])

    return (
        <div>
            <QueryForm />
            <ResultTable
                style={{
                    width: "950px",
                    margin: "10px auto",
                }}
            />
            <Pagination />
        </div>
    )
}

const QueryForm = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }}>
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
                    <CustomCalendar />
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
                    gap: "20px"
                }}
            >
                <CustomInputCell
                    label="生日:"
                    containerWidth={190}
                    inputWidth={150}
                >
                    <CustomCalendar />
                </CustomInputCell>
                <CustomInputCell
                    label="年龄:"
                    containerWidth={130}
                    inputWidth={80}
                >
                    <CustomInput />
                </CustomInputCell>
            </Row>
        </div>
    )
}

const Pagination = () => {
    const {
        currentPage,
        totalCount,
        pageSize
    } = usePatientService()

    return (
        <PaginationWithLinks
            pageSizeSelectOptions={{
                pageSizeOptions: [5, 10, 20, 25]
            }}
            pageSize={pageSize}
            page={currentPage}
            totalCount={totalCount}
        />
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

const ResultTable = ({ ...prop }: TableProp) => {

    const {
        patientInfoList
    } = usePatientService()

    console.log(patientInfoList)

    let keyList: Array<string> = []

    if (patientInfoList.length > 0) {
        // 之后在做如果没有的情况
        keyList = Object.keys(patientInfoList[0])

        return (
            <div
                {...prop}
                style={{
                    border: "1px solid #c6babaa8",
                    borderRadius: "10px",
                    // height: "200px",
                    // overflow: "auto",
                    ...prop.style
                }}
                className="result-table"
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                keyList.map((headerName) => {
                                    return (
                                        <TableHead>{headerName}</TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientInfoList.map((patientInfo) => (
                            <TableRow
                                key={patientInfo.id}
                            >
                                {
                                    keyList.map(key => {
                                        return (
                                            <TableCell
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {
                                                    // @ts-ignore
                                                    patientInfo[key]
                                                }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    } else {
        return (
            <div
                {...prop}
                style={{
                    height: "250px",
                    border: "1px solid #c6babaa8",
                    borderRadius: "10px",
                    ...prop.style
                }}
                className="center"
            >
                <Spinner className="stroke-[var(--theme-fore-color)]" />
            </div>
        )
    }
}

export default RetrievePatientDialog