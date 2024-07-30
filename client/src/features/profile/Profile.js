import { useNavigate, useParams } from "react-router-dom";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../users/usersApiSlice";
import "./profile.css"
import { useEffect } from "react";
import useGetFilePath from "../../hooks/useGetFilePath";
const Profile = () => {
  const userId = useParams().id
  const { data: usersObject, isError, error, isLoading } = useGetAllUsersQuery()
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation()
  const navigate = useNavigate()
  const { getFilePath } = useGetFilePath()
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
    console.log(userObject)
    updateUser(data)

  }
  
  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const user = usersObject.data.find(u => u._id === userId)
  if (!user) return <h1>{"Not found"}</h1>

  return (
    <div className="single-user-container">
      <div className="single-user-info">
        <div className="single-user-img-container">
          <img src={getFilePath(user.image)} alt="" fill />
        </div>
        {user.username}
      </div> 
      <div className="single-user-form-container">
        <form onSubmit={formSubmit} className="single-user-form">
          <label>שם משתמש</label>
          <input readOnly={true} type="text" name="username" defaultValue={user.username} />
          <label>שם מלא</label>
          <input type="text" name="fullname" placeholder="שם מלא" defaultValue={user.fullname} />
          <label>מייל</label>
          <input type="email" name="email" placeholder="מייל " defaultValue={user.email} />
          <label>טלפון</label>
          <input type="text" name="phone" placeholder="טלפון " defaultValue={user.phone} />
          <input name="_id" defaultValue={user._id} type="hidden" />
          <lable>תמונת פרופיל</lable>
          <input type="file" name="image" />

          <button>עדכן</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;