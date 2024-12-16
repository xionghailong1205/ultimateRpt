import config from "./config";

const baseURL = config.apiBaseUrl;

export interface PatientInfo {
  id: undefined;
  personName: string;
  bhkCode: string;
  institutionCode: string;
  crptName: string;
  sex: string;
  idc: string;
  brth: string;
  age: string;
  isXrMd: undefined;
  lnkTel: string;
  wrkLnt: string;
  wrkLntMonth: string;
  tchBadRsnTim: string;
  tchBadRsnMonth: string;
  bhkDate: string;
  badRsn: string;
  createTime: undefined;
  updateTime: undefined;
}

interface FetchPatientInfoListFromMeichiAPIResult {
  code: number;
  data: Array<PatientInfo>;
}

export namespace EntryPatient {
  export const FetchPatientInfoListFromMeichiAPI = async ({
    startTime,
    endTime,
  }: {
    startTime: string;
    endTime: string;
  }) => {
    let headersList = {
      Accept: "*/*",
    };

    startTime = encodeURIComponent(startTime);
    endTime = encodeURIComponent(endTime);

    const queryParameter = `startTime=${startTime}&endTime=${endTime}`;

    console.log(queryParameter);

    let response = await fetch(
      `${baseURL}/exam/person/query?${queryParameter}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let result =
      (await response.json()) as FetchPatientInfoListFromMeichiAPIResult;
    return result;
  };
}
