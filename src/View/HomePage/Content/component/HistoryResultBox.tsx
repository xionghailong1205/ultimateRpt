import { DivProp } from './type'
import Title from "./Title"
import { cn } from '@/lib/utils'

const HistoryResultBox = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
            className={cn("component-container", prop.className)}
        >
            <Title
                titleName='历史结果显示栏：'
            />
            <div
                className='left-content-box flex-1'
            >
                <Row
                    content='轻度脂肪肝'
                />
            </div>
        </div>
    )
}

const Row = ({
    content
}: {
    content: string
}) => {
    return (
        <div
            style={{
                color: "#666666"
            }}
        >
            {content}
        </div>
    )
}

export default HistoryResultBox