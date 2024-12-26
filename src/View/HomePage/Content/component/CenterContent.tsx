import { DivProp } from "./type"
import { BodyPartBoxProp, BodyPartService } from "@/service/BodyPartService"
import { useBodyPartCanvas } from "@/service/BodyPartCanvasService/BodyPartCanvasStore"
import { BodyPartCanvasService } from "@/service/BodyPartCanvasService/BodyPartCanvasService"
import { useEffect } from "react"

const CenterContent = ({ ...prop }: DivProp) => {
    const bodyPartCanvaState = useBodyPartCanvas(state => state.bodyPartCanvaState)

    useEffect(() => {
        BodyPartCanvasService.initBodyPartCanvas()
    })

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
            {
                bodyPartCanvaState === "afterQuerying" ? (
                    <>
                        <BodyPartList
                            bodyPartInfoList={BodyPartService.getRightBodyPartList()}
                        />
                        <BodyPartOverview />
                        <BodyPartList
                            bodyPartInfoList={BodyPartService.getLeftBodyPartList()}
                        />
                    </>
                ) : (
                    <div
                        className="w-full h-full center text-[16px] text-[--theme-fore-color]"
                    >
                        等待查询中...
                    </div>
                )
            }
        </div>
    )
}

interface BodyPartListProp extends DivProp {
    bodyPartInfoList: Array<BodyPartBoxProp>
}

const BodyPartList = ({
    bodyPartInfoList,
    ...prop
}: BodyPartListProp) => {
    return (
        <div
            {...prop}
            style={{
                padding: "5% 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: "2%",
                width: "25%",
                ...prop.style
            }}
        >
            {
                bodyPartInfoList.map(bodyPartInfo => {
                    return (
                        <BodyPartBox
                            {...bodyPartInfo}
                        />
                    )
                })
            }
        </div>
    )
}

const BodyPartOverview = ({ ...prop }: DivProp) => {
    // 创建 canvas 的 ref
    // const canvasRef = useRef<HTMLCanvasElement>(null);

    // 这个位置创建一个钩子
    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     if (canvas) {
    //         const ctx = canvas.getContext('2d')!
    //         const humanBg = new Image();
    //         humanBg.onload = function () {
    //             ctx.drawImage(humanBg, 0, 0, 150, 450);
    //         };
    //         humanBg.src = "/background/man.png";
    //     } else {
    //         // 执行其他逻辑
    //     }
    // }, [])

    return (
        <div
            {...prop}
            style={{
                minWidth: "calc(var(--bodypart-box-minheight) * 0.3125)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                ...prop.style
            }}
        >
            <canvas
                id={BodyPartCanvasService.bodyPartCanvas}
                width={BodyPartCanvasService.canvasWidth}
                height={BodyPartCanvasService.canvasHeight}
                className="h-full"
            >

            </canvas>

        </div>
    )
}

const BodyPartBox = ({
    keyValue,
    label
}: BodyPartBoxProp) => {
    return (
        <div
            style={{
                border: "1px solid #2DA5B4",
                borderRadius: "10px",
                display: "flex",
                padding: "5px 10px",
                height: "8%",
                maxWidth: "200px",
                minWidth: "150px",
                maxHeight: "50px",
                width: "80%"
            }}
        >
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
                    {label}
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