import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./View/Login";
import { HomePage } from "./View/HomePage";
import RouterNeedAuth from "./View/Router/RouterNeedAuth";

function App() {
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
