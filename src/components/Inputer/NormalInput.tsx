import { InputProp } from '@/View/type'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface NormalInputProp extends InputProp {
}

export const NormalInput = ({
    ...prop
}: NormalInputProp) => {

    console.log(prop.onChange)

    return (
        <Input
            placeholder="请输入..."
            {...prop}
            onChange={prop.onChange}
            style={{
                fontSize: "12px",
                ...prop.style
            }}
            className={cn("px-2 h-[30px] focus-visible:ring-1 ring-[#2da5b4]", prop.className)}
        />
    )
}

export default NormalInput