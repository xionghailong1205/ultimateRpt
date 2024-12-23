import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProp extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    containerWidth: number;
    inputWidth: number;
    children: ReactNode
}

export const CustomInputCell = ({
    label,
    containerWidth,
    inputWidth,
    children,
    ...prop
}: InputProp) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: `${containerWidth}px`,
            }}
        >
            <Label
                style={{
                    flex: 1,
                    color: "#2da5b4"
                }}
            >
                {label}
            </Label>
            <div
                style={{
                    width: `${inputWidth}px`
                }}
            >
                {children}
            </div>
        </div>
    )
}

interface CustomInputProp extends React.HTMLAttributes<HTMLDivElement> {

}

export const CustomInput = ({
    ...prop
}: CustomInputProp) => {
    return (
        <Input
            type="text" placeholder="请输入..."
            {...prop}
            style={{
                fontSize: "12px",
                ...prop.style
            }}
            className={cn("px-2 h-[30px] focus-visible:ring-1 ring-[#2da5b4]", prop.className)}
        />
    )
}