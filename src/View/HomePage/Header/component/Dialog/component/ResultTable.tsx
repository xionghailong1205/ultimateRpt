import { Spinner } from "@/components/ui/spinner"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Key2LabelService } from "@/map/key2LabelService"
import { ReactNode } from "react"

export type ResultTableState = "waitQuery" | "querying" | "noResultAfterQuerying" | "HaveResultAfterQuerying"

interface RowData {
    [key: string]: any
}

interface ResultTableProp extends React.ComponentPropsWithRef<"table"> {
    state: ResultTableState
    rowDataList: Array<RowData>
    keyField: string
}

export const ResultTable = ({
    rowDataList,
    keyField,
    state,
    ...prop
}: ResultTableProp) => {
    switch (state) {
        case "waitQuery": {
            return (
                <ResultTableContainer>
                    <div
                        style={{
                            fontSize: "16px"
                        }}
                        className="text-[--theme-fore-color]"
                    >
                        请进行查询...
                    </div>
                </ResultTableContainer>
            )
        }
        case "querying": {
            return (
                <ResultTableContainer>
                    <Spinner className="stroke-[var(--theme-fore-color)]" />
                </ResultTableContainer>
            )
        }
        case "noResultAfterQuerying": {
            return (
                <ResultTableContainer>
                    <div
                        style={{
                            fontSize: "16px"
                        }}
                        className="text-[--theme-fore-color]"
                    >
                        无查询结果...
                    </div>
                </ResultTableContainer>
            )
        }
        case "HaveResultAfterQuerying": {
            let keyList = Object.keys(rowDataList[0])

            return (
                <div
                    {...prop}
                    style={{
                        border: "1px solid #c6babaa8",
                        borderRadius: "10px",
                        height: "250px",
                        overflow: "auto",
                        width: "950px",
                        margin: "10px auto",
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
                                            <TableHead
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {Key2LabelService.getLabel(headerName)}
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rowDataList.map((rowData) => (
                                <TableRow
                                    key={rowData[keyField]}
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
                                                        rowData[key]
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
        }
    }
}

const ResultTableContainer = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div
            style={{
                height: "250px",
                // border: "1px solid",
                borderRadius: "10px",
                width: "950px",
                margin: "10px auto",
            }}
            className="center border border-[--theme-fore-color]"
        >
            {children}
        </div>
    )
}