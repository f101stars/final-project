import { useGetAllTypesQuery } from "../../turns/typesApiSlice"
import {useSearchParams } from 'react-router-dom';
import Search from '../../../components/search/Search';
import "./prices-list.css";

const PricesList = () =>{
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
            </div>
            <table className="types-list-table">
                <thead>
                    <tr>
                        <td className="title">סוג טיפול</td>
                        <td className="title">מחיר</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((type) => (
                        <tr key={type.id} className="type">
                            <td >{type.title}</td>
                            <td>{type.price} ש"ח</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );}

export default PricesList