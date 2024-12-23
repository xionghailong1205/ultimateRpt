import { createContext, useContext } from "react";

export interface FieldValidContextProp {
    handleChange: Function
    handleBlur: Function
    fieldValue: string | undefined
    inValid: boolean
}

export const FieldValidContext = createContext<FieldValidContextProp>(null!)

export const useFieldValidService = () => {
    return useContext(FieldValidContext)
}