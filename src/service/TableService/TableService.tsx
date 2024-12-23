import NormalInput from "@/components/Inputer/NormalInput";
import RstInput from "@/components/Inputer/RstInput";
import { SelectInput, SelectInputProp } from "@/components/Inputer/SelectInput";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InputProp } from "@/View/type";

export interface TableSchema<T> {
    key: T;
    label: string;
    type: InputType;
    selectInputProp?: SelectInputProp;
    inputType?: React.HTMLInputTypeAttribute;
    validFnc?: (value: any) => string | undefined
}

const getInputSpanInTable = (type: InputType): string => {
    switch (type) {
        case "input": {
            return "span 2";
        }
        case "selector": {
            return "span 2";
        }
        case "textarea": {
            return "1 / span 2";
        }
        case "subTitle": {
            return "1 / span 6"
        }
        case "readOnly": {
            return "span 2";
        }
    }
};

const getInputHeight = (type: InputType): string => {
    switch (type) {
        case "input": {
            return "h-[--normal-input-height]";
        }
        case "selector": {
            return "h-[--normal-input-height]";
        }
        case "textarea": {
            return "h-[--textare-input-height]";
        }
        case "subTitle": {
            return "h-[--textare-input-height]";
        }
        case "readOnly": {
            return "h-[--normal-input-height]";
        }
    }
};

type InputType = "input" | "selector" | "textarea" | "subTitle" | "readOnly";

interface TableInputProp extends InputProp {
    type: InputType
    selectInputProp?: SelectInputProp
    inputType?: React.HTMLInputTypeAttribute
}

export const TableInput = ({
    type,
    selectInputProp,
    inputType,
    ...prop
}: TableInputProp) => {
    switch (type) {
        case "input": {
            return (
                <NormalInput
                    type={inputType}
                    {...prop}
                />
            )
        }
        case "selector": {
            if (!selectInputProp) {
                selectInputProp = {
                    placeHolder: "为提供参数",
                    optionList: [{
                        label: "placeHolder",
                        value: "1"
                    }]
                }
            }

            return (
                <SelectInput
                    optionList={selectInputProp.optionList}
                    placeHolder={selectInputProp.placeHolder}
                />
            )
        }
        case "readOnly": {
            return (
                <RstInput />
            )
        }
    }
}

interface TableInputColProp extends InputProp {
    tableSchema: TableSchema<string>
}

export const TableInputCol = ({
    tableSchema,
    ...prop
}: TableInputColProp) => {
    if (tableSchema.type === "subTitle") {
        return (
            <div
                className={cn("flex flex-col gap-0.5 flex-1 my-1")}
                style={{
                    gridColumn: getInputSpanInTable(tableSchema.type)
                }}
            >
                <Label
                    className="text-[--theme-fore-color] text-[15px] font-bold"
                >
                    {tableSchema.label}
                </Label>
            </div>
        )
    }

    return (
        <div
            className={cn("flex flex-col gap-0.5 flex-1")}
            style={{
                gridColumn: getInputSpanInTable(tableSchema.type)
            }}
        >
            <Label
                className="text-[--theme-fore-color] text-[13px]"
            >
                {tableSchema.label}
            </Label>
            <div
                className={getInputHeight(tableSchema.type)}
            >
                <TableInput
                    {...prop}
                    type={tableSchema.type}
                    key={tableSchema.key}
                    selectInputProp={tableSchema?.selectInputProp}
                    inputType={tableSchema?.inputType ?? "text"}
                />
            </div>
        </div>
    )
}