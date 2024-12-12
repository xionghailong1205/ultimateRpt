import Header from './Header/Header'
import Content from './Content/Content'

const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh"
            }}
        >
            <Header />
            <Content />
        </div>
    )
}

export default HomePage