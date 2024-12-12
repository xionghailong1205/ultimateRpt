import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { DivProp } from "../HomePage/Content/component/type"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    let navigate = useNavigate()

    return (
        <div
            style={{
                background: "#3fa6e3",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px 10px",
                    gap: "10px",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        fontSize: "25px"
                    }}
                >
                    超声系统
                </div>
                <Input
                    placeholder="账号"
                    style={{
                        width: "80%"
                    }}
                />
                {/* <Input
                    placeholder="密码"
                    type="password"
                    style={{
                        width: "80%"
                    }}                
                /> */}
                <PassInput
                    style={{
                        width: "80%"
                    }}
                />
                <Button
                    style={{
                        width: "80%",
                        marginTop: "20px",
                    }}
                    className="bg-[#2da5b4] hover:bg-[#11b6cb]"
                    onClick={() => {
                        navigate('/home')
                    }}
                >
                    登陆
                </Button>
            </div>
        </div>
    )
}

const PassInput = ({
    ...prop
}: DivProp) => {
    const [show, setShow] = useState(false)

    return (
        <div
            className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...prop}
        >
            <input
                style={{
                    flex: 1
                }}
                placeholder="密码"
                type={show ? "text" : "password"}
                className="placeholder:text-muted-foreground focus-visible:outline-none"
            />
            <div
                className="center"
                style={{
                    userSelect: "none"
                }}
                onClick={() => {
                    setShow(!show)
                }}
            >
                {
                    show ? (
                        <EyeOff
                            style={{
                                height: "75%",
                                width: "75%"
                            }}
                        />
                    ) : (
                        <Eye
                            style={{
                                height: "75%",
                                width: "75%"
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Login