import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./View/Login";
import { HomePage } from "./View/HomePage";
import { useEffect } from "react";
import { PatientManagement } from "./api/PatientManagement";
import { Auth } from "./api/Auth";

function App() {
  useEffect(() => {
    Auth.Login().then(() => {
      PatientManagement.getPatientList()
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/home">
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
