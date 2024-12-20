import { useEffect } from "react"
import { DivProp } from "@/View/type"
import { DialogWrapper } from "./BaseDialogWrapper"
import { ExaminationManagement } from "@/api/ExaminationManagement"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExaminationServiceProvider, useExaminationService } from "@/service/ExaminationService"
import { Spinner } from "@/components/ui/spinner"

const ExaminationItemManagementDialog = () => {
    return (
        <DialogWrapper
            title="检查项目管理"
            tableComponent={
                <ExaminationServiceProvider>
                    <ExaminationItemTable />
                </ExaminationServiceProvider>
            }
        />
    )
}

const ExaminationItemList = ({ ...prop }: DivProp) => {
    const {
        examinationItemList,
        initExaminationItemList,
        examinationItemListStatus
    } = useExaminationService()

    useEffect(() => {
        initExaminationItemList()
    }, [])

    return (
        <div
            {...prop}
            className={cn("h-[400px] w-[200px]", prop.className)}
        >
            {
                examinationItemListStatus === "querying" ? (
                    <div
                        className="center h-full border"
                    >
                        <Spinner className="stroke-[var(--theme-fore-color)]" />
                    </div>
                ) : (
                    <div className="h-full w-full border px-3 py-2 flex gap-1 flex-col">
                        {
                            examinationItemList.map(examinationInfo => {
                                return (
                                    <div
                                        className="py-2 border px-1 text-[12px] cursor-pointer"
                                    >
                                        {examinationInfo.itemName}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

const ExaminationItemDetail = ({ ...prop }: DivProp) => {
    return (
        <div
            {...prop}
            className={cn("border flex-1", prop.className)}
        >

        </div>
    )
}

const ExaminationItemTable = () => {
    useEffect(() => {
        ExaminationManagement.RetrieveExaminationList()
    }, [])

    return (
        <div
            className="flex gap-3"
        >
            <ExaminationItemList />
            <ExaminationItemDetail />
        </div>
    )
}

export default ExaminationItemManagementDialog