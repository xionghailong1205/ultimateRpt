import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react";
import "./style/editorBox.css"

const DialogContext = createContext<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    tableComponent: ReactNode;
    hasPopOverOpen: boolean;
    setHasPopOverOpen: React.Dispatch<React.SetStateAction<boolean>>
}>(null!)

const BaseDialogTriggerButton = ({
    buttonName,
}: {
    buttonName: string
}) => {
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
        >
            {buttonName}
        </Button>
    )
}

const BaseDialogTrigger = () => {
    const {
        setOpen,
        title
    } = useContext(DialogContext)

    return (
        <DialogTrigger asChild
            onClick={() => {
                setOpen(true)
            }}
        >
            <div>
                <BaseDialogTriggerButton
                    buttonName={title}
                />
            </div>
        </DialogTrigger>
    )
}

const BaseDialogContentWrapper = ({
    title,
    tableComponent,
}: {
    title: string
    tableComponent: ReactNode
}) => {
    const {
        setOpen,
        hasPopOverOpen
    } = useContext(DialogContext)

    console.log(hasPopOverOpen)

    const handleEscKeyDown = useCallback(() => {
        if (hasPopOverOpen) {

        } else {
            setOpen(false)
        }
    }, [hasPopOverOpen])

    return (
        <DialogContent
            style={{
                width: "1000px",
                maxWidth: "1000px",
                minWidth: "1000px"
            }}

            // onPointerDownOutside={
            //     () => {
            //         // event.preventDefault()
            //         setOpen(false)
            //     }
            // }

            onOpenAutoFocus={
                (event) => {
                    event.preventDefault()
                }
            }

            onCloseAutoFocus={(e) => {
                e.preventDefault()
            }}

            onEscapeKeyDown={handleEscKeyDown}
        >
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-[#2da5b4]"
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </DialogHeader>
            {tableComponent}
        </DialogContent>
    )
}

export const DialogWrapper = ({
    title,
    tableComponent
}: {
    title: string;
    tableComponent: ReactNode
}) => {
    const [open, setOpen] = useState(false)
    const [hasPopOverOpen, setHasPopOverOpen] = useState(false)

    const value = {
        setOpen,
        title,
        tableComponent,
        setHasPopOverOpen,
        hasPopOverOpen
    }

    return (
        <Dialog
            open={open}
            modal={false}
        >
            <DialogContext.Provider value={value} >
                <BaseDialogTrigger />
                <BaseDialogContentWrapper
                    title={title}
                    tableComponent={tableComponent}
                />
            </DialogContext.Provider>
        </Dialog>
    )
}

export const useDialogContext = () => {
    return useContext(DialogContext)
}