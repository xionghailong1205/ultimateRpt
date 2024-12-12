import { useEffect, useRef } from "react"
import { DivProp } from "./type"


const CenterContent = ({ ...prop }: DivProp) => {
    return (
        <div
            {...prop}
            style={{
                background: "white",
                borderRadius: "30px",
                display: "flex",
                ...prop.style,
            }}
        >
            <BodyPartList />
            <BodyPartOverview />
            <BodyPartList />
        </div>
    )
}

const BodyPartList = ({ ...prop }: DivProp) => {
    return (
        <div
            {...prop}
            style={{
                padding: "0px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "30px"
            }}
        >
            <BodyPartBox />
            <BodyPartBox />
            <BodyPartBox />
            <BodyPartBox />
            <BodyPartBox />
            <BodyPartBox />
            <BodyPartBox />
        </div>
    )
}

const BodyPartOverview = ({ ...prop }: DivProp) => {
    // 创建 canvas 的 ref
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 这个位置创建一个钩子
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')!
            const humanBg = new Image();
            humanBg.onload = function () {
                ctx.drawImage(humanBg, 0, 0, 150, 450);
            };
            humanBg.src = "/background/man.png";
        } else {
            // 执行其他逻辑
        }
    }, [])

    return (
        <div
            {...prop}
            style={{
                minWidth: "calc(var(--bodypart-box-height) * 0.3125)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    aspectRatio: 0.3125,
                    height: "var(--bodypart-box-height)",
                }}
                width="150px"
                height="480px"
            >

            </canvas>

        </div>
    )
}

const BodyPartBox = () => {
    return (
        <div
            style={{
                border: "1px solid #2DA5B4",
                borderRadius: "10px",
                width: "150px",
                display: "flex",
                padding: "5px 10px",
            }}
        >
            <img
                src="/bodyPart/thyroid_left.png"
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <span
                    style={{
                        color: "#2DA5B4"
                    }}
                >
                    甲状腺右侧
                </span>
                <span
                    style={{
                        color: "#666666"
                    }}
                >
                    未见异常
                </span>
            </div>
        </div>
    )
}

export default CenterContent