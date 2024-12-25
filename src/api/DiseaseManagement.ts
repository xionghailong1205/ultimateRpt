import config from "./config";

const baseURL = config.apiBaseUrl;

export interface DiseaseInfo {
  id: number;
  itemCode: string;
  diseaseCode: string;
  name: string;
  sort: number;
  description: string;
}

export type DiseaseInfoKey = keyof DiseaseInfo;

export interface DiseaseInfoOfEditorBox {
  diseaseCode: string;
  name: string;
  sort: number;
  description: string;
}

export type DiseaseInfoOfEditorBoxKey = keyof DiseaseInfoOfEditorBox;

interface FetchResult<T> {
  code: number;
  msg: string;
  data: T;
}

interface GetDiseaseListOfExaminationRst
  extends FetchResult<Array<DiseaseInfo>> {}

export namespace DiseaseManagement {
  export const getDiseaseListOfExamination = async (
    itemCode: string
  ): Promise<GetDiseaseListOfExaminationRst> => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${baseURL}/disease/list?itemCode=${itemCode}`, {
      method: "GET",
      headers: headersList,
    });

    const requestResult =
      (await response.json()) as GetDiseaseListOfExaminationRst;

    return requestResult;
  };

  export const getDiseaseInfoByDiseaseCode = async (diseaseCode: string) => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${baseURL}/disease/${diseaseCode}`, {
      method: "POST",
      headers: headersList,
    });

    let reqRst = (await response.json()) as FetchResult<DiseaseInfo>;

    return reqRst;
  };
}
