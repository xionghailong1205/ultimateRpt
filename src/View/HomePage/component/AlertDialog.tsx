import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAlertDialog } from "@/store/useAlertDialog"

export const AlertDialogGlobal = () => {
    const whetherOpen = useAlertDialog(state => state.whetherOpen)

    const {
        dialogTitle,
        dialogContent: dialogDescription,
        dialogClosedCallback
    } = useAlertDialog(state => state.dialogContent)

    const closeDialog = useAlertDialog(state => state.closeDialog)

    return (
        <AlertDialog
            open={whetherOpen}
        >
            <AlertDialogContent
                style={{
                    padding: "14px 20px"
                }}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className="text-[--theme-fore-color] text-[14px]"
                    >
                        {dialogTitle}
                    </AlertDialogTitle>
                    <AlertDialogDescription
                        className="text-[12px]"
                    >
                        {dialogDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="text-white bg-[--theme-fore-color] hover:bg-[--theme-fore-color-hover] hover:text-white h-[30px] text-[12px]"
                        onClick={() => {
                            if (dialogClosedCallback) {
                                dialogClosedCallback()
                            }
                            closeDialog()
                        }}
                    >
                        关闭
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}