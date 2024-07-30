import React from 'react'
import Search from '../../../../components/search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import "./turns-list-user.css"
import { useGetAllTurnsQuery, useDeleteTurnMutation} from "../../turnsApiSlice"
import useAuth from '../../../../hooks/useAuth';
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}
const TurnsListUser = () => {
    const { username } = useAuth()
    const [deleteTurn] = useDeleteTurnMutation()
    const deleteClick = (turn) => {
        if (window.confirm("בטוח שברצונך למחוק ?")) {
            deleteTurn({ _id: turn._id })
        }

    }
    const { data: turnsObject, isError, error, isLoading} = useGetAllTurnsQuery()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>

    let filteredData = !q ? [...turnsObject.data] : turnsObject.data.filter(turn => (turn.description.title.indexOf(q) > -1))
    filteredData = filteredData.filter(turn => turn.user.username === username)
    return (
        <div className="turns-list">
            <div className="turns-list-top">
                <Search placeholder="חיפוש" />
                <Link className="turns-list-add-button" to="/dash/turns-user/add">תור חדש</Link>
            </div>
            <table className="turns-list-table">
                <tbody>
                    {filteredData.map((turn) => (
                        <div className='turn-in-list' key={turn.id}>
                            <h3 className='date'>{formatDate(turn.turnDate)}</h3>
                            <div className='times'>
                                <div><h5>שעת התחלה</h5>
                                    <p>{turn.start.minutes} : {turn.start.hour} </p></div>

                                <div><h5>שעת סיום</h5>
                                    <p>{turn.end.minutes} : {turn.end.hour}</p></div>
                            </div>
                            <p>{turn.description?.title}</p>
                            <p>
                                <div className="turns-list-buttons">
                                    <button onClick={() => deleteClick(turn)} className="turns-list-button turns-list-delete">
                                        ביטול
                                    </button>
                                </div>
                            </p>
                        </div>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TurnsListUser