import { PatientService } from "@/api/PatientService";
import { handleAuthenticationFailure } from "@/api/utils/handleAuthenticationFailure";
import { useAlertDialog } from "@/store/useAlertDialog";
import { usePatientInfoPage } from "@/store/usePatientInfoPage";

export namespace RetrieveExamRstByBHKCode {
  export const retrieveExamPatientInfo = async (bhkCode: string) => {
    // 之后调用 API 中的接口
    const changePatientPageStatus =
      usePatientInfoPage.getState().changePatientPageStatus;
    changePatientPageStatus("querying");

    const updatePatientInfoAfterQuery =
      usePatientInfoPage.getState().updatePatientInfoAfterQuery;

    const requestResult = await PatientService.getPatientInfoByBHKCode(bhkCode);

    handleAuthenticationFailure(requestResult.code);

    if (requestResult.code === 500) {
      alert("服务器查询出现错误!");
    }

    if (requestResult.code === 200) {
      const patientInfoFromBE = requestResult.data;
      updatePatientInfoAfterQuery(patientInfoFromBE);
    }

    changePatientPageStatus("afterQuerying");
  };

  export const showAlertDialogTipRetrieveError = (errMsg: string) => {
    const openDialog = useAlertDialog.getState().openDialog;
    openDialog({
      dialogTitle: "查询检查结果失败",
      dialogContent: errMsg,
    });
  };
}
