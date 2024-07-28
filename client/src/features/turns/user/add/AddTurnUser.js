import "./add-turn.css"
import { useAddTurnMutation, useGetAllTurnsQuery } from "../../turnsApiSlice"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTypesQuery } from "../../typesApiSlice"
import useAuth from "../../../../hooks/useAuth";


const AddTurnUser = () => {
    const [turnDate, setTurnDate] = useState("")
    const [startMin, setStartMin] = useState("00")
    const [startHou, setStartHou] = useState("09")
    const [endMin, setEndMin] = useState("00")
    const [endHou, setEndHou] = useState("09")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [addTurn, { isSuccess }] = useAddTurnMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess)
            navigate("/dash/turns-user")
    }, [isSuccess])
    const user = useAuth()

    const checkDate = () => {
        const appointmentDate = new Date(turnDate);
        const dayOfWeek = appointmentDate.getDay();
        const newTurnStartTime = Number(startHou) * 100 + Number(startMin);
        const newTurnEndTime = Number(endHou) * 100 + Number(endMin);
        if (dayOfWeek === 2) {
            setError(true)
            setMessage("לא ניתן לקבוע תור ביום שלישי")
            return
        }
        else if (dayOfWeek === 6) {
            setError(true)
            setMessage("לא ניתן לקבוע תור ביום שבת")
            return
        }

        for (const turn of turns) {
            const turnStartTime = turn.start.hour * 100 + turn.start.minutes;
            const turnEndTime = turn.end.hour * 100 + turn.end.minutes;
            const cdate = new Date(turn.turnDate)
            const a = cdate.toString()
            const b = appointmentDate.toString()
            if ((a === b)&& 
            ((turnStartTime >= newTurnStartTime && turnStartTime < newTurnEndTime) ||
                    (turnEndTime > newTurnStartTime && turnEndTime <= newTurnEndTime))
            ) {
                console.log("oops....");
                setError(true)
                setMessage("התור אינו פנוי!")
                return
            }
        }

        setError(false)
    }
    const submitForm = (e) => {
        e.preventDefault()
        checkDate()
        const data = {
            user,
            turnDate,
            start: {
                hour: (Number)(startHou),
                minutes: (Number)(startMin)
            },
            end: {
                hour: (Number)(endHou),
                minutes: (Number)(endMin)
            },
            description
        }
        // console.log(data);
        addTurn(data)

    }
    const { data: turnsObject, isLoading: getAllUsersLoad } = useGetAllTurnsQuery()
    const { data: typesObject, isLoading } = useGetAllTypesQuery()

    if (isLoading || getAllUsersLoad) return <h1> Loading ...</h1>
    const turns = turnsObject.data
    console.log(typesObject);
    const types = typesObject.data

    return (
        <div className="add-turn-container">
            <form onSubmit={submitForm} className="add-turn-form">
                {/* <h6>תאריך</h6> */}
                <input type="date" name="turnDate" required onChange={(e) => setTurnDate(e.target.value)} />
                <select name="type" onChange={(e) => setDescription(e.target.value)}>
                    <option value="" >תיאור</option>
                    {
                        types.map((type) => {
                            return <option value={type._id} >{type.title}</option>
                        })
                    }
                </select>
                <select onChange={(e) => setStartMin(e.target.value)} >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
                {/* <input type="text" placeholder="שעת התחלה -דקות" required onChange={(e) => setStartMin(e.target.value)} /> */}
                <select onChange={(e) => setStartHou(e.target.value)} >
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                </select>
                {/* <input type="text" placeholder="שעת התחלה -שעה" required onChange={(e) => setStartHou(e.target.value)} /> */}
                <select onChange={(e) => setEndMin(e.target.value)} defaultValue="00">
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
                {/* <input type="text" placeholder="שעת סיום -דקות" required onChange={(e) => setEndMin(e.target.value)} /> */}
                <select onChange={(e) => setEndHou(e.target.value)} defaultValue="09">
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                </select>
                {/* <input type="text" placeholder="שעת סיום -שעה" required onChange={(e) => setEndHou(e.target.value)} /> */}


                <button type="submit">שלח</button>
            </form>
            {error && <h5>{message}</h5>}

        </div>
    );
};

export default AddTurnUser;