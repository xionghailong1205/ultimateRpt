import HistoryResultBox from './HistoryResultBox'
import PersonalInfo from './PersonalInfo'
import { DivProp } from './type'
import './LeftContent.css'

const LeftContent = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <PersonalInfo
                style={{
                    marginBottom: "20px"
                }}
            />
            <HistoryResultBox />
        </div>
    )
}

export default LeftContent