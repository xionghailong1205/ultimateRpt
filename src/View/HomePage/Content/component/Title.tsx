import { DivProp } from './type'

interface TitleProp extends DivProp {
    titleName: string
}

const Title = ({
    titleName,
    ...prop
}: TitleProp) => {
    return (
        <div
            {...prop}
            style={{
                fontSize: "14px",
                fontWeight: "bold",
                ...prop.style
            }}
        >
            {titleName}
        </div>
    )
}

export default Title