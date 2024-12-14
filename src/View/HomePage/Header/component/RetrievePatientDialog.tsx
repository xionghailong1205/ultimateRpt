import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DialogTriggerButton from "./DialogTriggerButton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import CustomCalendar from "./CustomCalendar"
import { ReactNode, useEffect } from "react"
import { DivProp } from "@/View/type"
import { PatientManagement } from "@/api/PatientManagement"

const RetrievePatientDialog = () => {
    // 简单的 fetch 数据
    useEffect(() => {
        PatientManagement.getPatientList()
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <DialogTriggerButton
                        buttonName="检索病人"
                    />
                </div>
            </DialogTrigger>
            <DialogContent
                style={{
                    maxWidth: "1000px"
                }}

                onPointerDownOutside={
                    (event) => {
                        event.preventDefault()
                    }
                }
            >
                <DialogHeader>
                    <DialogTitle>检索病人</DialogTitle>
                </DialogHeader>
                <div>
                    <Form />
                </div>
            </DialogContent>
        </Dialog>
    )
}

const Form = () => {
    return (
        <>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInput
                    label="体检人员ID:"
                    type="text"
                    containerWidth={210}
                    inputWidth={120}
                />
                <CustomInput
                    label="人员姓名:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="体检编号:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="体检日期:"
                    type="date"
                    containerWidth={240}
                    inputWidth={160}
                />
            </Row>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInput
                    label="版本:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
                <CustomInput
                    label="单位社会信用代码:"
                    type="text"
                    containerWidth={250}
                    inputWidth={120}
                />
                <CustomInput
                    label="单位名称:"
                    type="text"
                    containerWidth={200}
                    inputWidth={120}
                />
                <CustomInput
                    label="性别:"
                    type="text"
                    containerWidth={130}
                    inputWidth={90}
                />
            </Row>
            <Row
                style={{
                    gap: "20px"
                }}
            >
                <CustomInput
                    label="生日:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
                <CustomInput
                    label="年龄:"
                    type="text"
                    containerWidth={130}
                    inputWidth={80}
                />
            </Row>
        </>
    )
}

type InputType = "text" | "date"
interface InputProp {
    type: InputType;
    label: string;
    containerWidth: number;
    inputWidth: number;
}

const CustomInput = ({
    label,
    type,
    containerWidth,
    inputWidth
}: InputProp) => {
    let SpecifiedInput = () => {
        return (
            <Input
                type="text" placeholder="请输入..."
                style={{
                    fontSize: "12px",
                }}
                className="px-2 h-[30px] focus-visible:ring-1 ring-[#2da5b4]"
            />
        )
    }

    switch (type) {
        case "text": {
            // do nothing here
            break
        }
        case "date": {
            SpecifiedInput = () => {
                return (
                    <CustomCalendar

                    />
                )
            }
            break
        }
        default: {

        }
    }

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
                <SpecifiedInput />
            </div>
        </div>
    )
}

interface RowProp extends DivProp {
    children: Array<ReactNode>
}

const Row = ({
    children,
    ...prop
}: RowProp) => {
    return (
        <div
            {...prop}
            style={{
                display: "flex",
                ...prop.style
            }}
        >
            {children}
        </div>
    )
}

const Table = ({ ...prop }: DivProp) => {
    return (
        <div>
            Table
        </div>
    )
}

export default RetrievePatientDialog