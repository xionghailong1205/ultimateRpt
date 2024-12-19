import HistoryResultBox from './HistoryResultBox'
import PersonalInfo from './PersonalInfo'
import { DivProp } from './type'
import './LeftContent.css'
import { ExaminationItem } from './ExaminationItem'

const LeftContent = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
            style={{
                minHeight: "800px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <PersonalInfo
                className='h-[--personal-info-height]'
            />
            <HistoryResultBox
                className='h-[--history-result-height]'
            />
            <ExaminationItem
                className='h-[--examination-item-height]'
            />
        </div>
    )
}

export default LeftContent