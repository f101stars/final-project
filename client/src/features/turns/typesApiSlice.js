import apiSlice from "../../app/apiSlice"
const typeApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllTypes:build.query({
            query:()=>({
                url:"/api/types"
            }),
            providesTags:["Types"]
        }),
        // addTurn:build.mutation({
        //     query:(turn)=>({
        //         url:"/api/turns",
        //         method:"POST",
        //         body:turn
        //     }),
        //     invalidatesTags:["Turns"]
        // }),
        // updateTurn:build.mutation({
        //     query:(turn)=>({
        //         url:"/api/turns",
        //         method:"PUT",
        //         body:turn
        //     }),
        //     invalidatesTags:["Turns"]
        // }),
        // deleteTurn:build.mutation({
        //     query:(turn)=>({
        //         url:"/api/turns",
        //         method:"Delete",
        //         body:turn
        //     }),
        //     invalidatesTags:["Turns"]
        // })
    })
})

export const {useGetAllTypesQuery} = typeApiSlice