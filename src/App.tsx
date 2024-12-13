import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./View/Login";
import { HomePage } from "./View/HomePage";
import { useEffect } from "react";
import { PatientManagement } from "./api/PatientManagement";
import { Auth } from "./api/Auth";
import { getAuthorizationCookie } from "./store/useAuth";
import RouterNeedAuth from "./View/Router/RouterNeedAuth";

function App() {
  useEffect(() => {
    // Auth.Login().then(() => {
    //   PatientManagement.getPatientList()
    // })

    // getAuthorizationCookie()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/home">
          <Route index element={
            <RouterNeedAuth>
              <HomePage />
            </RouterNeedAuth>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
