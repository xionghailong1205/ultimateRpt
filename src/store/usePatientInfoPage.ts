// 主 UI 的一个全局的状态管理
import { PatinetInfoWithExaminationResult } from "@/api/RetrievePatient";
import { create } from "zustand";

type PatientPageStatus = "querying" | "waitQuerying" | "afterQuerying";

interface State extends PatinetInfoWithExaminationResult {
  patientPageStatus: PatientPageStatus;
}

interface Action {
  changePatientPageStatus: (newStatus: PatientPageStatus) => void;
  updatePatientInfoAfterQuery: (
    patientInfoFromBE: PatinetInfoWithExaminationResult
  ) => void;
}

interface PatientPageProp extends State, Action {}

export const usePatientInfoPage = create<PatientPageProp>((set) => ({
  patientPageStatus: "waitQuerying",
  examResults: [],
  id: 0,
  personName: "",
  bhkCode: "",
  institutionCode: "",
  crptName: "",
  sex: "",
  idc: "",
  brth: "",
  age: "",
  isXrMd: undefined,
  lnkTel: "",
  wrkLnt: "",
  wrkLntMonth: "",
  tchBadRsnTim: "",
  tchBadRsnMonth: "",
  bhkDate: "",
  badRsn: "",
  createTime: "",
  updateTime: "",
  changePatientPageStatus(newStatus) {
    set({
      patientPageStatus: newStatus,
    });
  },
  updatePatientInfoAfterQuery(patientInfoFromBE) {
    set({
      ...patientInfoFromBE,
    });
  },
}));
