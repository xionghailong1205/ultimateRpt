import { cn } from "@/lib/utils"
import { DivProp } from "@/View/type"

interface RstInputProp extends DivProp {
    value: string
}

const RstInput = ({
    value,
    ...prop
}: RstInputProp) => {
    return (
        <div
            {...prop}
            className={cn("h-full rounded-sm flex px-2 py-0.5", prop.className)}
        >
            {value}
        </div>
    )
}

export default RstInput