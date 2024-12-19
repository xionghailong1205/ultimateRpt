import Header from './Header/Header'
import Content from './Content/Content'
import Overlay from './component/Overlay'
import { usePatientInfoPage } from '@/store/usePatientInfoPage'
import { AlertDialogGlobal } from './component/AlertDialog'

const HomePage = () => {
    const patientPageStatus = usePatientInfoPage(state => state.patientPageStatus)

    return (
        <div
            className='test'
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "relative"
            }}
        >
            <Header />
            <Content />
            <Overlay />
            <AlertDialogGlobal />
        </div>
    )
}

export default HomePage