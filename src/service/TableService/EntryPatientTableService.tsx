import NormalInput from "@/components/Inputer/NormalInput";
import { SelectInput, SelectInputProp } from "@/components/Inputer/SelectInput";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DivProp, InputProp } from "@/View/type";

export interface TableSchema<T> {
    key: T;
    label: string;
    type: InputType;
    selectInputProp?: SelectInputProp;
    inputType?: React.HTMLInputTypeAttribute
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
    }
};

type InputType = "input" | "selector" | "textarea";

interface TableInputProp extends InputProp {
    type: InputType
    key: string
    value: string | undefined
    selectInputProp?: SelectInputProp
    inputType?: React.HTMLInputTypeAttribute
}

const TableInput = ({
    type,
    key,
    value,
    selectInputProp,
    inputType,
    ...prop
}: TableInputProp) => {
    switch (type) {
        case "input": {
            return (
                <NormalInput
                    value={value}
                    type={inputType}
                    onChange={prop.onChange}
                    onBlur={prop.onBlur}
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
    }
}

interface TableInputColProp extends InputProp {
    tableSchema: TableSchema<string>
    value: string | undefined
}

export const TableInputCol = ({
    tableSchema,
    value,
    ...prop
}: TableInputColProp) => {
    return (
        <div
            className={cn("flex flex-col gap-0.5 flex-1", prop.className)}
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
                    type={tableSchema.type}
                    key={tableSchema.key}
                    value={value}
                    selectInputProp={tableSchema?.selectInputProp}
                    inputType={tableSchema?.inputType ?? "text"}

                />
            </div>
        </div>
    )
}