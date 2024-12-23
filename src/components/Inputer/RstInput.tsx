import { cn } from "@/lib/utils"
import { useFieldValidService } from "@/service/FieldValidService"
import { DivProp } from "@/View/type"

interface RstInputProp extends DivProp {
}

const RstInput = ({
    ...prop
}: RstInputProp) => {
    const {
        fieldValue
    } = useFieldValidService()

    return (
        <div
            {...prop}
            className={cn("h-full rounded-sm flex px-2 py-0.5", prop.className)}
        >
            {fieldValue}
        </div>
    )
}

export default RstInput