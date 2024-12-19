import { DivProp } from "@/View/type"
import Title from "./Title"
import { usePatientInfoPage } from "@/store/usePatientInfoPage"
import { cn } from "@/lib/utils"

// 检查项目的组件
export const ExaminationItem = ({
    ...prop
}: DivProp) => {
    const examResults = usePatientInfoPage(state => state.examResults)
    console.log(examResults)

    return (
        <div
            {...prop}
            className={cn("component-container", prop.className)}
        >
            <Title
                titleName='历史结果显示栏：'
            />
            <div
                className='left-content-box flex-1 flex flex-col h-[calc(100%-30px)]'
            >
                <div
                    className="overflow-auto flex-1"
                >
                    {
                        examResults.map(examRst => {
                            return (
                                <div>
                                    {
                                        examRst.itemName
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className="h-[30px]"
                >
                    Footer
                </div>
            </div>
        </div>
    )
}