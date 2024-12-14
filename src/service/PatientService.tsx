import { PatientInfo } from "@/api/PatientManagement";
import { createContext, useState } from "react";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
    const [patientInfoList, setPatientInfoList] = useState<Array<PatientInfo>>([])


}

