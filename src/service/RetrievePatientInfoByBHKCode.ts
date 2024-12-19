import { useAlertDialog } from "@/store/useAlertDialog";

export namespace RetrieveExamRstByBHKCode {
  export const retrieveExamPatientInfo = (bhkCode: string) => {
    // 之后调用 API 中的接口
  };

  export const showAlertDialogTipRetrieveError = (errMsg: string) => {
    const openDialog = useAlertDialog.getState().openDialog;
    openDialog({
      dialogTitle: "查询检查结果失败",
      dialogDescription: errMsg,
    });
  };
}
