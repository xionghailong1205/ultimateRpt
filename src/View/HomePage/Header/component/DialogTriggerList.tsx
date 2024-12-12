import { Button } from '@/components/ui/button'
import RetrievePatientDialog from './RetrievePatientDialog'
import UserManagement from './UserManagement'

const DialogTriggerList = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}
        >
            {/* <NavButton
                buttonName='检索病人'
                callback={() => {
                    alert("实现检索病人Modal")
                }}
            /> */}
            <RetrievePatientDialog />
            {/* <UserManagement /> */}
            {/* <NavButton
                buttonName='用户管理'
                callback={() => {
                    alert("实现用户管理Modal")
                }}
            /> */}
            <NavButton
                buttonName='模板管理'
                callback={() => {
                    alert("实现模板管理Modal")
                }}
            />
            <NavButton
                buttonName='录入病人'
                callback={() => {
                    alert("实现录入病人Modal")
                }}
            />
            <NavButton
                buttonName='报告打印'
                callback={() => {
                    alert("实现报告打印Modal")
                }}
            />
            <NavButton
                buttonName='报告预览'
                callback={() => {
                    alert("实现报告预览Modal")
                }}
            />
        </div>
    )
}

interface NavButtonProp {
    buttonName: string,
    callback: Function
}

const NavButton = ({
    buttonName,
    callback
}: NavButtonProp) => {
    return (
        <Button
            style={{
                backgroundColor: "#2DA5B4",
                color: "white",
                padding: "0px 10px",
                fontWeight: "normal",
                fontSize: "12px",
                height: "25px",
                borderRadius: "2px"
            }}
            onClick={() => {
                callback()
            }}
        >
            {buttonName}
        </Button>
    )
}

export default DialogTriggerList