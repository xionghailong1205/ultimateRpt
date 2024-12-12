import { ReactNode } from "react"
import Title from "./Title"
import { DivProp } from './type'

const CommonAbnormalities = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <Title
                titleName='常见异常'
                style={{
                    marginBottom: "10px",
                }}
            />
            <div
                style={{
                    width: "var(--content-box-width)",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    // gridAutoRows: "50px",
                    color: "#666666",
                    gridGap: "10px"
                }}
            >
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>脂肪肝</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>肝囊肿</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>肝内</div>
                            <div>胆管结石</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>血管瘤</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>肝内</div>
                            <div>光点增粗</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>肝硬化</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>肝内胆</div>
                            <div>管钙化灶</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName={(
                        <>
                            <div>其他</div>
                        </>
                    )}
                />
                <AbnormalityBox
                    buttonName=""
                />
            </div>
        </div>
    )
}

const AbnormalityBox = ({
    buttonName
}: {
    buttonName: ReactNode
}) => {
    return (
        <div
            style={{
                height: "100%",
                aspectRatio: "1",
                background: "white",
                borderRadius: "var(--box-radius)",
                flexDirection: "column",
                cursor: "pointer"
            }}
            className="center"
        >
            {buttonName}
        </div>
    )
}

export default CommonAbnormalities