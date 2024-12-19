import { Spinner } from "@/components/ui/spinner"
import { usePatientInfoPage } from "@/store/usePatientInfoPage"

const Overlay = () => {
    const patientPageStatus = usePatientInfoPage(state => state.patientPageStatus)

    return (
        <>
            {
                patientPageStatus === "querying" ? (
                    <div
                        style={{
                            background: "#020202c9",
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: "0px",
                            backdropFilter: "blur(5px)",
                            flexDirection: "column",
                            gap: "3px"
                        }}
                        className='center'
                    >
                        {/* 查询中... */}
                        <Spinner
                            className="stroke-[--theme-fore-color]"
                        />
                        <div
                            className="text-[--theme-fore-color] font-medium"
                        >
                            查询中...
                        </div>
                    </div>
                ) : ""
            }
        </>
    )
}

export default Overlay