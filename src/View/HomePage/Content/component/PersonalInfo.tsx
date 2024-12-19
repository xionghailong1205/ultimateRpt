import { ReactNode } from "react"
import Title from "./Title"
import { DivProp } from './type'
import { usePatientInfoPage } from "@/store/usePatientInfoPage"
import { cn } from "@/lib/utils"

const PersonalInfo = ({
    ...prop
}: DivProp) => {
    const bhkCode = usePatientInfoPage(state => state.bhkCode)
    const personName = usePatientInfoPage(state => state.personName)
    const sex = usePatientInfoPage(state => state.sex)
    const age = usePatientInfoPage(state => state.age)


    return (
        <div
            {...prop}
            className={cn("component-container", prop.className)}
        >
            <Title
                titleName='个人信息栏'
            />
            <div
                className='left-content-box'
                style={{
                    justifyContent: "space-between"
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
                    value={bhkCode}
                />
                <Row
                    label={(
                        <>
                            <span>姓</span>
                            <span>名:</span>
                        </>
                    )}
                    value={personName}
                />
                <Row
                    label={(
                        <>
                            <span>性</span>
                            <span>别:</span>
                        </>
                    )}
                    value={sex}
                />
                <Row
                    label={(
                        <>
                            <span>年</span>
                            <span>龄:</span>
                        </>
                    )}
                    value={age}
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