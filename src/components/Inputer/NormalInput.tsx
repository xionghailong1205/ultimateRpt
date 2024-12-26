import { InputProp } from '@/View/type'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { useFieldValidService } from '@/service/FieldValidService'
import clsx from 'clsx'

interface NormalInputProp extends InputProp {
}

export const NormalInput = ({
    ...prop
}: NormalInputProp) => {
    const {
        handleChange,
        handleBlur,
        fieldValue,
        inValid
    } = useFieldValidService()

    const className = clsx({
        'ring-1 ring-[#b91c1c]': inValid,
    })

    return (
        <Input
            value={fieldValue}
            onChange={(e) => {
                handleChange(e.target.value)
            }}
            // @ts-ignore
            type={prop.type}
            onBlur={handleBlur}
            placeholder="请输入..."
            style={{
                fontSize: "12px",
            }}
            className={cn("px-2 h-[30px] focus-visible:ring-1 ring-[#2da5b4]", className)}
        />
    )
}

export default NormalInput