import DialogTriggerList from "./component/DialogTriggerList"
import SearchBox from "./component/SearchBox"
import SearchStatisticsBox from "./component/SearchStatisticsBox"

const Header = () => {
    return (
        <div
            style={{
                backgroundColor: "white",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 30px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >
                <SearchBox />
                <SearchStatisticsBox />
            </div>
            <DialogTriggerList />
        </div >
    )
}

export default Header