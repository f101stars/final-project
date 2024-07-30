import React from 'react';
import Search from '../../../../components/search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import "./turns-list-admin.css";
import { useGetAllTurnsQuery, useDeleteTurnMutation } from "../../turnsApiSlice";

// פונקציה לעיצוב התאריך
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}

const TurnsListAdmin = () => {
    const [deleteTurn, { isSuccess: isDeleteSuccess }] = useDeleteTurnMutation();
    const deleteClick = (turn) => {
        if (window.confirm("בטוח שברצונך למחוק ?")) {
            deleteTurn({ _id: turn._id });
        }
    };

    const { data: turnsObject, isError, error, isLoading, isSuccess } = useGetAllTurnsQuery();
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    if (isLoading) return <h1> Loading ...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;

    const filteredData = !q ? [...turnsObject.data] : turnsObject.data.filter(turn => (turn.description.title.indexOf(q) > -1) || (turn.user.fullname.indexOf(q) > -1));

    return (
        <div className="turns-list">
            <div className="turns-list-top">
                <Search placeholder="Search for a turn..." />
                <Link className="turns-list-add-button" to="/dash/turns-admin/add">תור חדש</Link>
            </div>
            <div className="turns-list-table">
                <tbody>
                    {filteredData.map((turn) => (

                        <div className='turn-in-list' key={turn._id}>
                            {/* {console.log(turn)} */}
                            <h3 className='date'>{formatDate(turn.turnDate)}</h3>
                            <div className='times'>
                                <div>
                                    <h5>שעת התחלה</h5>
                                    <p>{turn.start.minutes} : {turn.start.hour}</p>
                                </div>
                                <div>
                                    <h5>שעת סיום</h5>
                                    <p>{turn.end.minutes} : {turn.end.hour}</p>
                                </div>
                            </div>
                            <p>{turn.user?.fullname}</p>
                            <p>{turn.description?.title}</p>
                            <p>
                                <div className="turns-list-buttons">
                                    <Link className='turns-list-button turns-list-view' to={`/dash/turns-admin/${turn._id}`}>
                                        עריכה
                                    </Link>
                               <button onClick={() => deleteClick(turn)} className="turns-list-button turns-list-delete">
                                        ביטול
                                    </button>
                                </div>
                            </p>
                        </div>
                    ))}
                </tbody>
            </div>
        </div>
    );
};

export default TurnsListAdmin;
