import { useAuth } from "@/store/useAuth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const RouterNeedAuth = ({
  children
}: {
  children: ReactNode
}) => {
  const Authorization = useAuth.getState().Authorization

  if (Authorization) {
    return children
  } else {
    return (
      <Navigate to={'/'} />
    )
  }
}

export default RouterNeedAuth