import apiSlice from "../../app/apiSlice"
const postApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAllPosts:build.query({
            query:()=>({
                url:"/api/posts"
            }),
            providesTags:["Posts"]
        }),
        addPost:build.mutation({
            query:(post)=>({
                url:"/api/posts",
                method:"POST",
                body:post
            }),
            invalidatesTags:["Posts"]
        }),
        deletePost:build.mutation({
            query:(post)=>({
                url:"/api/posts",
                method:"Delete",
                body:post
            }),
            invalidatesTags:["Posts"]
        })
    })
})

export const {useGetAllPostsQuery,useAddPostMutation,useDeletePostMutation} = postApiSlice