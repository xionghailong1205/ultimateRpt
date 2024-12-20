import config from "./config";

const baseURL = config.apiBaseUrl;

export interface ExaminationInfo {
  id: number;
  itemCode: string;
  itemName: string;
}

interface RetrieveExaminationLisRst {
  code: number;
  msg: string;
  data: Array<ExaminationInfo>;
}

export namespace ExaminationManagement {
  export const RetrieveExaminationList = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${baseURL}/exam/item/list`, {
      method: "GET",
      headers: headersList,
    });

    let requestResult: RetrieveExaminationLisRst = await response.json();
    return requestResult;
  };
}
