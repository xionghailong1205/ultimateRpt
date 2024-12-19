import { Input } from '@/components/ui/input'
import ScanIcon from '@/Icon/scan'
import SearchIcon from '@/Icon/search'
import { RetrieveExamRstByBHKCode } from '@/service/RetrieveExamRstByBHKCodeService'
import { useForm } from '@tanstack/react-form'

const SearchBox = () => {
    const form = useForm<{
        bhkCode: string
    }, undefined>({
        defaultValues: {
            bhkCode: ''
        },
        onSubmit: async ({ value }) => {
            const {
                bhkCode
            } = value

            RetrieveExamRstByBHKCode.retrieveExamPatientInfo(bhkCode)

        },
        onSubmitInvalid(props) {
            const errMsg = props.formApi.state.fieldMeta.bhkCode.errors[0] as string
            RetrieveExamRstByBHKCode.showAlertDialogTipRetrieveError(errMsg)
        },
    })

    return (
        <form
            style={{
                width: "250px"
            }}
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!form.state.canSubmit) {
                    const errMsg = form.state.fieldMeta.bhkCode.errors[0] as string
                    RetrieveExamRstByBHKCode.showAlertDialogTipRetrieveError(errMsg)
                }
                form.handleSubmit()
            }}
        >
            <div
                style={{
                    display: "flex",
                    border: "1.5px solid #2DA5B4",
                    alignItems: "center",
                    padding: "0px 15px",
                    borderRadius: "20px",
                    height: "35px"
                }}
            >
                <div
                    style={{
                        height: "20px",
                        width: "20px",
                    }}
                    className='center'
                >
                    <ScanIcon
                        style={{
                            fill: "#2DA5B4"
                        }}
                    />
                </div>
                <form.Field
                    name='bhkCode'
                    validators={{
                        onChange: ({ value }) =>
                            !value
                                ? '请输入体检号'
                                : undefined
                    }}
                    children={(field) => {
                        return (
                            <Input
                                style={{
                                    border: "none",
                                    fontSize: "12px"
                                }}
                                className=' placeholder:text-[#9B9B9B]'
                                placeholder='输入体检号查询患者'
                                onChange={(e) => field.handleChange(e.target.value)}
                                value={field.state.value}
                            />
                        )
                    }}
                />
                <div
                    style={{
                        height: "20px",
                        width: "20px",
                    }}
                    className='center'
                >
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={() => {
                            return (
                                <button
                                    type='submit'
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    <SearchIcon
                                        style={{
                                            fill: "#2DA5B4"
                                        }}
                                    />
                                </button>
                            )
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

export default SearchBox