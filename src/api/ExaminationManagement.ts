import config from "./config";

const baseURL = config.apiBaseUrl;

export interface ExaminationInfo {
  id: number;
  itemCode: string;
  itemName: string;
  defaultValue: string | undefined;
  bodyParts: Array<string>;
}

interface RetrieveExaminationLisRst {
  code: number;
  msg: string;
  data: Array<ExaminationInfo>;
}

interface EditExaminationItemRst {
  code: number;
  msg: string;
}

export interface EditExaminationItemProp {
  id: number;
  itemCode: string;
  itemName: string;
  defaultValue: string;
  bodyParts: Array<string>;
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

  export const EditExaminationItem = async (
    dataForEdit: EditExaminationItemProp
  ) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(dataForEdit);

    let response = await fetch(`${baseURL}/exam/item/edit`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    let requestRst = (await response.json()) as EditExaminationItemRst;

    return requestRst;
  };
}
