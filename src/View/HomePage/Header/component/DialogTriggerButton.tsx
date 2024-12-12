import { Button } from '@/components/ui/button'

const DialogTriggerButton = ({
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

export default DialogTriggerButton