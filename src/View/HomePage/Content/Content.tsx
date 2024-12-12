import CenterContent from "./component/CenterContent"
import LeftContent from "./component/LeftContent"
import RightContent from "./component/RightContent"

const Content = () => {
    return (
        <div
            style={{
                flex: 1,
                // minHeight: "800px",
                display: "flex",
                padding: "20px 30px",
                justifyContent: "space-between",
                overflow: "auto"
            }}
        >
            <LeftContent
            // style={{
            //     flex: 1
            // }}
            />
            <CenterContent
                style={{
                    minWidth: "800px",
                    height: "var(--bodypart-box-height)"
                }}
            />
            <RightContent
            // style={{
            //     flex: 1
            // }}
            />
        </div>
    )
}

export default Content