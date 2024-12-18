import { Spinner } from "@/components/ui/spinner"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
                        height: "252px",
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
                                            <TableHead>{headerName}</TableHead>
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

    // if (rowDataList.length > 0) {
    //     // 之后在做如果没有的情况
    //     keyList = Object.keys(rowDataList[0])
    // } else {
    //     return (
    //         <div
    //             {...prop}
    //             style={{
    //                 height: "252px",
    //                 border: "1px solid #c6babaa8",
    //                 borderRadius: "10px",
    //                 ...prop.style
    //             }}
    //             className="center"
    //         >
    //             <Spinner className="stroke-[var(--theme-fore-color)]" />
    //         </div>
    //     )
    // }
}

const ResultTableContainer = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div
            style={{
                height: "252px",
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