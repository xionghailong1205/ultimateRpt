import config from "./config";

const baseURL = config.apiBaseUrl;

export interface PatientInfo {
  id: number;
  personName: string;
  bhkCode: string;
  institutionCode: string;
  crptName: string;
  sex: string;
  idc: string;
  brth: string;
  age: string;
  isXrMd: any;
  lnkTel: string;
  wrkLnt: string;
  wrkLntMonth: string;
  tchBadRsnTim: string;
  tchBadRsnMonth: string;
  bhkDate: string;
  badRsn: string;
  createTime: string;
  updateTime: string;
}

export namespace PatientManagement {
  export const getPatientList = async (): Promise<Array<PatientInfo>> => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${baseURL}/exam/person/page?pageSize=10&pageNum=1`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let requestResult = await response.json();
    console.log(requestResult);

    if (requestResult.code !== 200) {
      return [];
    }

    return requestResult.rows;
  };
}
