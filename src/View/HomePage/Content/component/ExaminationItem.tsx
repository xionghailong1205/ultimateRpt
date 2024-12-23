import { DivProp } from "@/View/type"
import Title from "./Title"
import { usePatientInfoPage } from "@/store/usePatientInfoPage"
import { cn } from "@/lib/utils"
import CircleIcon from "@/Icon/circle"
import { ExaminationItemHelper } from "@/util/ExaminationItemFilter"
import { SelectInput } from "@/components/Inputer/SelectInput"

// 检查项目的组件
export const ExaminationItem = ({
    ...prop
}: DivProp) => {
    const examResults = usePatientInfoPage(state => state.examResults)
    const examRstInUltimateSound = ExaminationItemHelper.getItemCodeInUltimateSoundExaminationList(examResults)

    console.log(examRstInUltimateSound)

    return (
        <div
            {...prop}
            className={cn("component-container", prop.className)}
        >
            <Title
                titleName='检查项目:'
            />
            <div
                className='left-content-box flex-1 flex flex-col h-[calc(100%-30px)]'
            >
                <div
                    className="overflow-auto flex-1 flex gap-4 flex-col font-medium"
                >
                    {
                        examRstInUltimateSound.map((examRst, index) => {
                            return (
                                <div
                                    key={examRst.itemCode}
                                    className="text-[#FC9302]"
                                >
                                    {/* 用来测试用 */}
                                    {/* {
                                        `${index}、${examRst.itemName}-${examRst.result}`
                                    } */}
                                    {/* 用来开展示效果 */}
                                    {
                                        `${index}、${examRst.itemName}`
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className="h-[30px] flex items-end justify-between"
                >
                    <ExaminationRstStatus
                        statusColor="#43B53A"
                        statusName="待检查"
                    />
                    <ExaminationRstStatus
                        statusColor="#FC9302"
                        statusName="已检查"
                    />
                    <ExaminationRstStatus
                        statusColor="#FA5D29"
                        statusName="异常"
                    />
                </div>
            </div>
        </div>
    )
}

interface ExaminationRstStatusProp {
    statusColor: string;
    statusName: string;
}

const ExaminationRstStatus = ({
    statusColor,
    statusName
}: ExaminationRstStatusProp) => {
    return (
        <div
            className="flex justify-between items-center gap-1"
        >
            <div
                style={{
                    height: "7px",
                    width: "7px"
                }}
            >
                <CircleIcon
                    fill={statusColor}
                />
            </div>
            <div
                style={{
                    color: statusColor,
                    fontWeight: "bold"
                }}
            >
                {statusName}
            </div>
        </div>
    )
}