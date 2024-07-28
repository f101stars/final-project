import { useNavigate, useParams } from "react-router-dom";
import { useGetAllTypesQuery, useUpdateTypeMutation } from "../typesApiSlice";
import "./single-type.css"
import { useEffect } from "react";
const SingleType = () => {
  const typeId = useParams().id
  const { data: typesObject, isError, error, isLoading } = useGetAllTypesQuery()
  const [updateType, { isSuccess: isUpdateSuccess }] = useUpdateTypeMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/types")
    }
  }, [isUpdateSuccess])
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const typeObject = Object.fromEntries(data.entries())
    console.log(typeObject)
    updateType(typeObject)

  }
  
  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const type = typesObject.data.find(u => u._id === typeId)
  if (!type) return <h1>{"Not found"}</h1>

  return (
    <div className="single-type-container">
      <div className="single-type-form-container">
        <form onSubmit={formSubmit} className="single-type-form">

          <label>תיאור</label>
          <input type="text" name="title" defaultValue={type.title} />
          <label>זמן</label>
          <input type="text" name="time"  defaultValue={type.time} />
          <input name="_id" defaultValue={type._id} type="hidden" />
          <button>עדכן</button>
        </form>
      </div>
    </div>
  );
};

export default SingleType;