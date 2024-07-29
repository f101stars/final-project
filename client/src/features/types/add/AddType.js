import "./add-type.css"
import { useAddTypeMutation } from "../typesApiSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddType = () => {
    const [addType, { isSuccess }] = useAddTypeMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess)
            navigate("/dash/types")
    }, [isSuccess])
    const submitForm = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const typeObject = Object.fromEntries(data.entries())
        addType(typeObject)
    }
    return (
        <div className="add-type-container">
            <form onSubmit={submitForm} className="add-type-form">
                <input type="text" placeholder="תיאור" name="title" required />
                <input type="text" placeholder="אורך הטיפול" name="time" required />
                <input type="text" placeholder="מחיר" name="price" required />

                <button type="submit">שלח</button>
            </form>
        </div>
    );
};

export default AddType;