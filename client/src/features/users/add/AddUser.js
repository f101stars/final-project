import "./add-user.css"
import { useAddUserMutation } from "../usersApiSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetFilePath from "../../../hooks/useGetFilePath";
const AddUser = () => {
    const [addUser, { isSuccess }] = useAddUserMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess)
            navigate("/dash/users")
    }, [isSuccess])
    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        //const userObject = Object.fromEntries(data.entries())
        addUser(data)
    }
    return (
        <div className="add-user-container">
            <form onSubmit={submitForm} className="add-user-form">
                <input type="text" placeholder="שם משתמש" name="username" required />
                <input
                    type="password"
                    placeholder="סיסמא"
                    name="password"
                    required
                />
                <input type="text" placeholder="שם מלא" name="fullname" required />
                <input type="email" placeholder="מייל" name="email" required />
                <input type="phone" placeholder="טלפון" name="phone" required />
                <select name="roles" id="roles">
                    <option value="User">
                        הרשאה 
                    </option>
                    <option value="Admin">מנהל</option>
                    <option value="User">משתמש</option>
                </select>
                <select name="active" id="active">
                    <option value={true}>
                        פעיל
                    </option>
                    <option value={true}>כן</option>
                    <option value={false}>לא</option>
                </select>
                <input type="file" name="image" />
                <button type="submit">שלח</button>
            </form>
        </div>
    );
};

export default AddUser;