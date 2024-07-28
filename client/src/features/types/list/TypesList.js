import React from 'react'
import Search from '../../../components/search/Search';
import { Link, useSearchParams } from 'react-router-dom';
import "./types-list.css"
import { useGetAllTypesQuery, useDeleteTypeMutation } from "../typesApiSlice"
import useGetFilePath from '../../../hooks/useGetFilePath';
const TypesList = () => {
    const [deleteType, { isSuccess: isDeleteSuccess }] = useDeleteTypeMutation()
    const { getFilePath } = useGetFilePath()
    const deleteClick = (type) => {
        if (window.confirm("בטוח שברצונך למחוק ?")) {
            deleteType({ _id: type._id })
        }

    }
    const { data: typesObject, isError, error, isLoading, isSuccess } = useGetAllTypesQuery()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>{JSON.stringify(error)}</h1>
    const filteredData = !q ? [...typesObject.data] : typesObject.data.filter(type => type.title.indexOf(q) > -1)

    return (
        <div className="types-list">
            <div className="types-list-top">
                <Search placeholder="חיפוש" />
                <Link className="types-list-add-button" to="/dash/types/add">הוספה</Link>
            </div>
            <table className="types-list-table">
                <thead>
                    <tr>
                        <td>תיאור</td>
                        <td>זמן</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((type) => (
                        <tr key={type.id}>
                            <td>{type.title}</td>
                            <td>{type.time} דקות</td>

                            <td>
                                <div className="types-list-buttons">
                                    <Link className='types-list-button types-list-view' to={`/dash/types/${type._id}`}>
                                        עדכון
                                    </Link>

                                    <button onClick={() => deleteClick(type)} className="types-list-button types-list-delete">
                                        מחיקה
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TypesList