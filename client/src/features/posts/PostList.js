import React, { useEffect } from 'react'
// import Search from '../../components/search/Search';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import "./posts-list.css"
import { useGetAllPostsQuery, useDeletePostMutation, useAddPostMutation } from "../posts/postApiSlice"
import useGetFilePath from '../../hooks/useGetFilePath';
import useAuth from '../../hooks/useAuth';
const PostsList = () => {
    const navigate = useNavigate()
    const [addPost, { isSuccess }] = useAddPostMutation()
    useEffect(() => {
        if (isSuccess)
            navigate("/dash/posts")
    }, [isSuccess])
    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const userObject = Object.fromEntries(data.entries())
        console.log(userObject);
        addPost(userObject)
    }
    const [deletePost, { isSuccess: isDeleteSuccess }] = useDeletePostMutation()
    const user = useAuth()
    const { getFilePath } = useGetFilePath()
    const deleteClick = (post) => {
        if (window.confirm("בטוח שברצונך למחוק ?")) {
            deletePost({ _id: post._id })
        }

    }
    const { data: postsObject, isError, error, isLoading, isSuccess: isSuccessGetPosts } = useGetAllPostsQuery()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q ? [...postsObject.data] : postsObject.data.filter(post => post.title.indexOf(q) > -1)

    return (
        <div className="posts-list">
            <div className="posts-list-table">
            <form onSubmit={submitForm}  className="add-post-form">
                    <input type="text" placeholder="תוסיפי את ההמלצה שלך..." name="text" required />
                    <input value={user._id} name="user" type="hidden" />
                    <button type="submit">{<MdArrowBack/>}</button>
                </form>
                <tbody>
                    {filteredData.map((post) => (
                        <div className="post-in-list" key={post.id}>
                            <p>
                                <div className="posts-list-user">
                                    <img
                                        src={getFilePath(post.user.image)}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="posts-list-post-image" />
                                    {post.user.fullname}
                                </div>
                            </p>
                            <p>{post.text}</p>

                            {user.roles == "Admin" && <div className="posts-list-buttons">
                                <button onClick={() => deleteClick(post)} className="posts-list-button posts-list-delete">
                                    מחיקה
                                </button>
                            </div>}

                        </div>
                    ))}
                </tbody>
            
            </div>
        </div>
    );
}

export default PostsList