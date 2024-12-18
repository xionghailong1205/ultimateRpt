import config from "./config";
import Cookies from "js-cookie";
import { handleAuthenticationFailure } from "./utils/handleAuthenticationFailure";

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

interface PropOfFetchPatientListOfPage {
  pageNumber: number;
  pageSize: number;
}

interface FetchPatientListOfPageResult {
  code: number;
  totalCount: number;
  patientList: Array<PatientInfo>;
}

export namespace RetrievePatient {
  export const getPatientListOfPage = async ({
    pageNumber,
    pageSize,
  }: PropOfFetchPatientListOfPage): Promise<FetchPatientListOfPageResult> => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${baseURL}/exam/person/page?pageSize=${pageSize}&pageNum=${pageNumber}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let requestResult = await response.json();
    console.log(requestResult);

    return {
      code: requestResult.code,
      totalCount: requestResult.total,
      patientList: requestResult.rows,
    };
  };
}
