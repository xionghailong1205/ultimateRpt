import CenterContent from "./component/CenterContent"
import LeftContent from "./component/LeftContent"
import RightContent from "./component/RightContent"

const Content = () => {
    return (
        <div
            className="scrollable-container"
            style={{
                width: "100%",
                overflow: "auto",
                height: "100%"
            }}
        >
            <div
                style={{
                    display: "flex",
                    padding: "20px 30px",
                    justifyContent: "space-between",
                    minWidth: "1400px",
                    height: "100%"
                }}
            >
                <LeftContent
                    className="w-[--content-box-width] h-full"
                />
                <CenterContent
                    style={{
                        minWidth: "800px",
                        height: "var(--bodypart-box-height)"
                    }}
                />
                <RightContent />
            </div >
        </div>
    )
}

export default Content