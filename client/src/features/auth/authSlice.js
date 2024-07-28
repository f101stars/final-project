import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            const accessToken= action.payload.accessToken
            state.token = accessToken
        },
        logout: (state, action) => {
            state.action = null
        }
    }
})

export default authSlice.reducer
export const { setToken, logout } = authSlice.actions
export  const selectToken = (state)=>state.auth.token