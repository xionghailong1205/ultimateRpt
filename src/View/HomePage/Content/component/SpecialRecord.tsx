import Title from './Title'
import { DivProp } from './type'

const SpecialRecord = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <Title
                titleName="特殊记录"
                style={{
                    marginBottom: "10px",
                }}
            />
        </div>
    )
}

export default SpecialRecord