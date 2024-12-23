import config from "./config";

const baseURL = config.apiBaseUrl;

export interface ExaminationInfo {
  itemCode: string;
  itemName: string;
  defaultValue: string | undefined;
  bodyPart: Array<string>;
}

export type ExaminationInfoKey = keyof ExaminationInfo;

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
