import apiSlice from "../../app/apiSlice"
const turnApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllTurns:build.query({
            query:()=>({
                url:"/api/turns"
            }),
            providesTags:["Turns"]
        }),
        addTurn:build.mutation({
            query:(turn)=>({
                url:"/api/turns",
                method:"POST",
                body:turn
            }),
            invalidatesTags:["Turns"]
        }),
        updateTurn:build.mutation({
            query:(turn)=>({
                url:"/api/turns",
                method:"PUT",
                body:turn
            }),
            invalidatesTags:["Turns"]
        }),
        deleteTurn:build.mutation({
            query:(turn)=>({
                url:"/api/turns",
                method:"Delete",
                body:turn
            }),
            invalidatesTags:["Turns"]
        })
    })
})

export const {useAddTurnMutation,useDeleteTurnMutation,useGetAllTurnsQuery,useUpdateTurnMutation} = turnApiSlice