import { useContext } from "react"
import { myContext } from "../components/context/AuthProvider"

const useAuth = () => {

    return useContext(myContext)
}

export default useAuth;