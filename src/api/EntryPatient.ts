import config from "./config";

const baseURL = config.apiBaseUrl;

// 从 美慈 API 获取病人列表的接口
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

// 手动录入病人相关的接口
type Version = "v1" | "v2";

export interface EntryPatientManuallyObject {
  personName: string;
  bhkCode: string;
  institutionCode: string;
  crptName: string;
  sex: string;
  idc: string;
  brth: string;
  age: string;
  isXrMd: string;
  lnkTel: string;
  wrkLnt: string;
  wrkLntMonth: string;
  tchBadRsnTim: string;
  tchBadRsnMonth: string;
  bhkDate: string;
  badRsn: string;
  version: Version | "";
}

export type KeyForPatientEntry = keyof EntryPatientManuallyObject;

interface EntryPatientManuallyRequest {
  entryPatientManuallyObject: EntryPatientManuallyObject;
}

interface EntryPatientManuallyResponse {
  code: number;
  msg: string;
}

// TODO 12 24 完成新增病人的接口
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

    console.log(result);

    return result;
  };

  export const EntryPatientManually = async ({
    entryPatientManuallyObject,
  }: EntryPatientManuallyRequest) => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(entryPatientManuallyObject);

    let response = await fetch(`${baseURL}/exam/person/save`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let reqRst = (await response.json()) as EntryPatientManuallyResponse;
    return reqRst;
  };
}
