import Title from "./Title"
import { DivProp } from './type'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const AddedValue = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <Title
                titleName="附加值"
                style={{
                    marginBottom: "10px",
                }}
            />
            <LevelRadioGroup
                style={{
                    marginBottom: "10px",
                }}
            />
            <InputListBox />
        </div>
    )
}

// 我们之后要对接接口
const LevelRadioGroup = ({
    ...prop
}: DivProp) => {
    return (
        <RadioGroup value="Mild"
            style={{
                display: "flex",
                justifyContent: "space-between",
                ...prop.style
            }}
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Mild" id="r1" />
                <Label htmlFor="r1">轻度</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Moderate" id="r2" />
                <Label htmlFor="r2">中度</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Severe" id="r3" />
                <Label htmlFor="r3">重度</Label>
            </div>
        </RadioGroup>
    )
}

const InputListBox = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px"
            }}
        >
            {/* row */}
            <div
                style={{
                    display: "flex",
                    height: "25px",
                }}
            >
                <div
                    style={{
                        background: "#2DA5B4",
                        color: "white",
                        width: "25px",
                        height: "25px"
                    }}
                    className="center"
                >
                    左
                </div>
                <div
                    style={{
                        background: "#FFFFFF",
                        flex: "1",
                        display: "flex",
                        color: "#666666",
                        alignItems: "center",
                        paddingLeft: "10px",
                        gap: "5px"
                    }}
                >
                    <input type="number"
                        style={{
                            outline: 0,
                            background: "rgb(201 204 212 / 30%)",
                            height: "20px",
                            width: "50px",
                        }}
                    />
                    <div>
                        cm
                    </div>
                    <div>
                        *
                    </div>
                    <input type="number"
                        style={{
                            outline: 0,
                            background: "rgb(201 204 212 / 30%)",
                            height: "20px",
                            width: "50px",
                        }}
                    />
                    <div>
                        cm
                    </div>
                </div>
            </div>
            {/* row */}
            <div
                style={{
                    display: "flex",
                    height: "25px",
                }}
            >
                <div
                    style={{
                        background: "#2DA5B4",
                        color: "white",
                        width: "25px",
                        height: "25px"
                    }}
                    className="center"
                >
                    右
                </div>
                <div
                    style={{
                        background: "#FFFFFF",
                        flex: "1",
                        display: "flex",
                        color: "#666666",
                        alignItems: "center",
                        paddingLeft: "10px",
                        gap: "5px"
                    }}
                >
                    <input type="number"
                        style={{
                            outline: 0,
                            background: "rgb(201 204 212 / 30%)",
                            height: "20px",
                            width: "50px",
                        }}
                    />
                    <div>
                        cm
                    </div>
                    <div>
                        *
                    </div>
                    <input type="number"
                        style={{
                            outline: 0,
                            background: "rgb(201 204 212 / 30%)",
                            height: "20px",
                            width: "50px",
                        }}
                    />
                    <div>
                        cm
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddedValue