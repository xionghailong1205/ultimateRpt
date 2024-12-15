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

import DialogTriggerButton from "./DialogTriggerButton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import CustomCalendar from "./CustomCalendar"
import { ReactNode, useEffect, useMemo } from "react"
import { DivProp, TableProp } from "@/View/type"
import { PatientProvider, usePatientService } from "@/service/PatientService"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import { Spinner } from "@/components/ui/spinner"

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
                    overflow: "hidden",
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
                <CustomInput
                    label="体检人员ID:"
                    type="text"
                    containerWidth={210}
                    inputWidth={120}
                />
                <CustomInput
                    label="人员姓名:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="体检编号:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="体检日期:"
                    type="date"
                    containerWidth={240}
                    inputWidth={160}
                />
            </Row>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInput
                    label="版本:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
                <CustomInput
                    label="单位社会信用代码:"
                    type="text"
                    containerWidth={250}
                    inputWidth={120}
                />
                <CustomInput
                    label="单位名称:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="性别:"
                    type="text"
                    containerWidth={130}
                    inputWidth={90}
                />
            </Row>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInput
                    label="生日:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
                <CustomInput
                    label="年龄:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
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

type InputType = "text" | "date"
interface InputProp {
    type: InputType;
    label: string;
    containerWidth: number;
    inputWidth: number;
}

const CustomInput = ({
    label,
    type,
    containerWidth,
    inputWidth
}: InputProp) => {
    let SpecifiedInput = () => {
        return (
            <Input
                type="text" placeholder="请输入..."
                style={{
                    fontSize: "12px",
                }}
                className="px-2 h-[30px] focus-visible:ring-1 ring-[#2da5b4]"
            />
        )
    }

    switch (type) {
        case "text": {
            // do nothing here
            break
        }
        case "date": {
            SpecifiedInput = () => {
                return (
                    <CustomCalendar />
                )
            }
            break
        }
        default: {

        }
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: `${containerWidth}px`,
            }}
        >
            <Label
                style={{
                    flex: 1,
                    color: "#2da5b4"
                }}
            >
                {label}
            </Label>
            <div
                style={{
                    width: `${inputWidth}px`
                }}
            >
                <SpecifiedInput />
            </div>
        </div>
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
    // 我们之后在这里做一个 Map
    // const key2labelMap = [
    //     [],
    // ]

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
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                keyList.map((headerName) => {
                                    return (
                                        <TableHead className="w-[100px]">{headerName}</TableHead>
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
                    height: "240px",
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