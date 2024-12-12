import { DivProp } from './type'
import Title from "./Title"

const HistoryResultBox = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <Title
                titleName='历史结果显示栏：'
                style={{
                    marginBottom: "10px"
                }}
            />
            <div
                className='left-content-box'
                style={{
                    height: "150px"
                }}
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