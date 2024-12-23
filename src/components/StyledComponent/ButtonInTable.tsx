import { ButtonProp } from '@/View/type'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonInTableProp extends ButtonProp {
    children: ReactNode
}

const ButtonInTable = ({
    children,
    ...prop
}: ButtonInTableProp) => {
    return (
        <Button
            {...prop}
            className={cn("h-[--queryForm-row-height] bg-[--theme-fore-color] hover:bg-[--theme-fore-color-hover]", prop.className)}
            style={{
                fontSize: "var(--global-font-size)",
                ...prop.style
            }}
        >
            {children}
        </Button>
    )
}

export default ButtonInTable