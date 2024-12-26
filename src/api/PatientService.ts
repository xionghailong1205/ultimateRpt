import config from "./config";
import QueryString from "qs";

const baseURL = config.apiBaseUrl;

export type PatientSex = "男" | "女";

export interface PatientInfo {
  id: number;
  personName: string;
  bhkCode: string;
  institutionCode: string;
  crptName: string;
  sex: PatientSex;
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

export type PatientInfoKey = keyof PatientInfo;

interface PropOfFetchPatientListOfPage {
  pageNumber: number;
  pageSize: number;
  queryObject: QueryObject;
}

interface FetchPatientListOfPageResult {
  code: number;
  totalCount: number;
  patientList: Array<PatientInfo>;
}

export interface ExaminationResult {
  id: number;
  bhkCode: string;
  itemName: string;
  itemCode: string;
  itemStdValue: any;
  result: string;
  chkDat: string;
  chkDoct: string;
  jdgptn: string;
  minVa: any;
  maxVal: any;
  createTime: string;
  updateTime: string;
  resultDiseases: any;
}

export interface PatinetInfoWithExaminationResult extends PatientInfo {
  examResults: Array<ExaminationResult>;
}

interface FetchPatientInfoByBHKCodeResult {
  code: number;
  msg: string;
  data: PatinetInfoWithExaminationResult;
}

export interface QueryObject {
  personName: string;
  bhkCode: string;
  sex: string;
  age: string;
  idc: string;
  bhkDate: string;
  crptName: string;
}

export type KeyForPatientRetrieve = keyof QueryObject;

export namespace PatientService {
  export const getPatientListOfPage = async ({
    pageNumber,
    pageSize,
    queryObject,
  }: PropOfFetchPatientListOfPage): Promise<FetchPatientListOfPageResult> => {
    let headersList = {
      Accept: "*/*",
    };

    const queryString = QueryString.stringify(queryObject);

    console.log(queryString);

    let response = await fetch(
      `${baseURL}/exam/person/page?pageSize=${pageSize}&pageNum=${pageNumber}&${queryString}`,
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

  export const getPatientInfoByBHKCode = async (bhkCode: string) => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${baseURL}/exam/person/${bhkCode}`, {
      method: "GET",
      headers: headersList,
    });

    let result = (await response.json()) as FetchPatientInfoByBHKCodeResult;
    return result;
  };
}
