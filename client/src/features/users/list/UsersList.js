import React from 'react'
import Search from '../../../components/search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import "./users-list.css"
import { useGetAllUsersQuery, useDeleteUserMutation } from "../usersApiSlice"
import useGetFilePath from '../../../hooks/useGetFilePath';
const UsersList = () => {
    const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation()
    const { getFilePath } = useGetFilePath()
    const deleteClick = (user) => {
        if (window.confirm("בטוח שברצונך למחוק את המשתמש?")) {
            deleteUser({ _id: user._id })
        }

    }
    const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q ? [...usersObject.data] : usersObject.data.filter(user => (user.fullname.indexOf(q) > -1) || (user.email.indexOf(q) > -1))

    return (
        <div className="users-list">
            <div className="users-list-top">
                <Search placeholder="Search for a user..." />
                <Link className="users-list-add-button" to="/dash/users/add">משתמש חדש</Link>
            </div>
            <div className="users-list-table">
                <tbody>
                    {filteredData.map((user) => (
                        <div className="user-in-list" key={user.id}>
                            <p>
                                <div className="users-list-user">
                                    <img
                                        src={getFilePath(user.image)}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="users-list-user-image" />
                                    {user.fullname}
                                </div>
                            </p>
                            <p>{user.username}</p>

                            <p>{user.email}</p>

                            <p>{user.roles === "Admin" ? "הרשאה: מנהל" : "הרשאה: משתמש"}</p>
                            <p>{user.active ? "פעיל" : "לא פעיל"}</p>
                            <p>{user.phone}</p>

                            <p>
                                <div className="users-list-buttons">
                                    <Link className='users-list-button users-list-view' to={`/dash/users/${user._id}`}>
                                        צפייה
                                    </Link>

                                    <button onClick={() => deleteClick(user)} className="users-list-button users-list-delete">
                                        מחיקה
                                    </button>
                                </div>
                            </p>
                        </div>
                    ))}
                </tbody>
            </div>
        </div>
    );
}

export default UsersList