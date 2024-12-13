import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { DivProp, InputProp } from "../HomePage/Content/component/type"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/store/useAuth"
import { useForm } from '@tanstack/react-form'
import { clsx } from "clsx"
import { cn } from "@/lib/utils"

const Login = () => {
    const [loginResult, setLoginResult] = useState('')

    let navigate = useNavigate()

    // 如果已经登陆, 就跳转到 HomePage
    useEffect(() => {
        const Authorization = useAuth.getState().Authorization
        if (Authorization) {
            navigate('/home')
        }
    }, [])

    // 添加简单的登陆验证
    const form = useForm({
        defaultValues: {
            account: '',
            passWord: ''
        },
        onSubmit: async ({ value }) => {
            console.log(value)

            const result = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("登录成功")
                }, 1000)
            })

            console.log(result)
        }
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
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
                    <form.Field
                        name="account"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? '请输入账号'
                                    : undefined
                        }}
                        children={(field) => {
                            const fieldEmpty = field.state.meta.errors.length > 0

                            const className = clsx({
                                'border-red-700': fieldEmpty,
                                // "placeholder:text-red-800": fieldEmpty
                            })

                            return (
                                <>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="账号"
                                        style={{
                                            width: "80%"
                                        }}
                                        className={className}
                                    />
                                </>
                            )
                        }}
                    />
                    <form.Field
                        name="passWord"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? '请输入密码'
                                    : undefined
                        }}
                        children={(field) => {
                            const fieldEmpty = field.state.meta.errors.length > 0

                            const className = clsx({
                                'border-red-700': fieldEmpty,
                            })

                            return (
                                <PassInput
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="账号"
                                    style={{
                                        width: "80%"
                                    }}
                                    className={className}
                                />
                            )
                        }}
                    />
                    {
                        loginResult ? (
                            <div>
                                {loginResult}
                            </div>
                        ) : ""
                    }
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button
                                type="submit"
                                disabled={!canSubmit}
                                style={{
                                    width: "80%",
                                    marginTop: "20px",
                                }}
                                className="bg-[#2da5b4] hover:bg-[#11b6cb]"
                            >
                                {isSubmitting ? '登录中' : '登录'}
                            </Button>
                        )}
                    />
                </div>
            </div>
        </form>
    )
}

const PassInput = ({
    ...prop
}: InputProp) => {
    const [show, setShow] = useState(false)

    return (
        <div
            {...prop}
            className={cn(
                "flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                prop.className
            )}
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