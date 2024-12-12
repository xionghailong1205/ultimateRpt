import { DivProp } from './type'

const DividerLine = ({
    ...prop
}: DivProp) => {
    return (
        <div
            style={{
                width: "var(--content-box-width)",
                height: "2px",
                background: "#2DA5B4",
                ...prop.style
            }}
        >
        </div>
    )
}

export default DividerLine