import { Spinner } from "@/components/ui/spinner"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface RowData {
    [key: string]: any
}

interface ResultTableProp extends React.ComponentPropsWithRef<"table"> {
    rowDataList: Array<RowData>
    keyField: string
}

export const ResultTable = ({
    rowDataList,
    keyField,
    ...prop
}: ResultTableProp) => {
    let keyList: Array<string> = []

    if (rowDataList.length > 0) {
        // 之后在做如果没有的情况
        keyList = Object.keys(rowDataList[0])

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