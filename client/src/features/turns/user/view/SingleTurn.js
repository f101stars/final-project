import "./single-turn.css"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllTurnsQuery, useUpdateTurnMutation } from "../../turnsApiSlice";

import { useEffect, useState } from "react";
import useGetFilePath from "../../../../hooks/useGetFilePath";
const SingleTurn = () => {
  const { turnId } = useParams()
   const { data: turnsObject, isError, error, isLoading } = useGetAllTurnsQuery()
  const [updateTurn, { isSuccess: isUpdateSuccess }] = useUpdateTurnMutation()
  const { getFilePath } = useGetFilePath()

  const [startMin, setStartMin] = useState(0)
  const [startHou, setStartHou] = useState(0)
  const [endMin, setEndMin] = useState(0)
  const [endHou, setEndHou] = useState(0)
  const [turnDate, setTurnDate] = useState("")


  const navigate = useNavigate()
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/turns-admin")
    }
  }, [isUpdateSuccess])

  const formSubmit = (e) => {
    e.preventDefault()
    const ddata = {
      id: turn._id,
      user: turn.user,
      turnDate,
      start: {
        hour: (Number)(startHou),
        minutes: (Number)(startMin)
      },
      end: {
        hour: (Number)(endHou),
        minutes: (Number)(endMin)
      },
      description: turn.description
    }
    console.log(ddata)
    updateTurn(ddata)

  }


  if (isLoading) return <h1> Loading ...</h1>
  const turn = turnsObject.data.find(u => u._id === turnId)
  console.log("turn",turn);
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  if (!turn) return <h1>{"Not found"}</h1>
  // console.log(turn) 

  return (
    <div className="single-turn-container">
      <div className="single-turn-info">
        <div className="single-turn-img-container">
          <img src={getFilePath(turn.user.image)} alt="" fill />
        </div>
        {turn.user.fullname}
      </div>
      <div className="single-turn-form-container">
        <form onSubmit={formSubmit} className="single-turn-form">

          <label>תאריך</label>
          <input type="date" defaultValue={turn.turnDate} required onChange={(e) => setTurnDate(e.target.value)} />
          <label>שעת התחלה -דקות</label>
          <input type="text" defaultValue={turn.start.minutes} required onChange={(e) => setStartMin(e.target.value)} />
          <label>שעת התחלה -שעה</label>
          <input type="text" defaultValue={turn.start.hour} required onChange={(e) => setStartHou(e.target.value)} />
          <label>שעת סיום - דקות</label>
          <input type="text" defaultValue={turn.end.minutes} required onChange={(e) => setEndMin(e.target.value)} />
          <label>שעת סיום -שעה</label>
          <input type="text" defaultValue={turn.end.hour} required onChange={(e) => setEndHou(e.target.value)} />
          <label>משתמש</label>
          <button>עדכן</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTurn;