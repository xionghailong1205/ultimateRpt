import { Input } from '@/components/ui/input'
import ScanIcon from '@/Icon/scan'
import SearchIcon from '@/Icon/search'

const SearchBox = () => {
    return (
        <div
            style={{
                width: "250px"
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
                <Input
                    style={{
                        border: "none",
                        fontSize: "12px"
                    }}
                    className=' placeholder:text-[#9B9B9B]'
                    placeholder='输入检查号查询患者'
                />
                <div
                    style={{
                        height: "20px",
                        width: "20px",
                    }}
                    className='center'
                >
                    <SearchIcon
                        style={{
                            fill: "#2DA5B4"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBox