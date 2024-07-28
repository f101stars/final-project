import apiSlice from "../../app/apiSlice"
const typeApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllTypes:build.query({
            query:()=>({
                url:"/api/types"
            }),
            providesTags:["Types"]
        }),
        addType:build.mutation({
            query:(type)=>({
                url:"/api/types",
                method:"POST",
                body:type
            }),
            invalidatesTags:["Types"]
        }),
        updateType:build.mutation({
            query:(type)=>({
                url:"/api/types",
                method:"PUT",
                body:type
            }),
            invalidatesTags:["Types"]
        }),
        deleteType:build.mutation({
            query:(type)=>({
                url:"/api/types",
                method:"Delete",
                body:type
            }),
            invalidatesTags:["Types"]
        })
    })
})

export const {useGetAllTypesQuery,useAddTypeMutation,useUpdateTypeMutation,useDeleteTypeMutation} = typeApiSlice