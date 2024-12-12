import { ReactNode } from "react"
import Title from "./Title"
import { DivProp } from './type'

const PersonalInfo = ({
    ...prop
}: DivProp) => {
    return (
        <div
            {...prop}
        >
            <Title
                titleName='个人信息栏'
                style={{
                    marginBottom: "10px",
                }}
            />
            <div
                className='left-content-box'
                style={{
                    gap: "15px"
                }}
            >
                <Row
                    label={(
                        <>
                            <span>体</span>
                            <span>检</span>
                            <span>号:</span>
                        </>
                    )}
                    value="5458274572875834"
                />
                <Row
                    label={(
                        <>
                            <span>姓</span>
                            <span>名:</span>
                        </>
                    )}
                    value="王大明"
                />
                <Row
                    label={(
                        <>
                            <span>性</span>
                            <span>别:</span>
                        </>
                    )}
                    value="女"
                />
                <Row
                    label={(
                        <>
                            <span>年</span>
                            <span>龄:</span>
                        </>
                    )}
                    value="36"
                />
            </div>
        </div>
    )
}

const Row = ({
    label,
    value
}: {
    label: ReactNode,
    value: string
}) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: "10px"
            }}
        >
            <div
                style={{
                    width: "42px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#2DA5B4"
                }}
            >
                {label}
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}


export default PersonalInfo