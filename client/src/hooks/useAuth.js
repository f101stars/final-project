import {useSelector} from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode";
const useAuth = ()=>{
    const token  = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if(token){
        const userDecoded = jwtDecode(token)
        // console.log("userDecoded" , userDecoded)
        const {_id, username, roles, fullname,image} = userDecoded
        isAdmin = roles ==="Admin"
        isUser = roles ==="User"
        return {username, roles, fullname, isAdmin, isUser, _id,image}

    }

    return {_id:"", username:'', isAdmin, isUser, fullname:'', roles:"",image:""}


}
export default useAuth