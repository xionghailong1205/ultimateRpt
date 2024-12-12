import AddedValue from "./AddedValue"
import CommonAbnormalities from "./CommonAbnormalities"
import DividerLine from "./DividerLine"
import SpecialRecord from "./SpecialRecord"
import { DivProp } from "./type"

const RightContent = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <CommonAbnormalities
                style={{
                    marginBottom: "18px"
                }}
            />
            <DividerLine
                style={{
                    marginBottom: "18px"
                }}
            />
            <AddedValue
                style={{
                    marginBottom: "18px"
                }}
            />
            <DividerLine
                style={{
                    marginBottom: "18px"
                }}
            />
            <SpecialRecord />
        </div>
    )
}

export default RightContent