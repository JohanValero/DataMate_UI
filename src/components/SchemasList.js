import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchSchemas } from '../store/actions'
import { Link } from "react-router-dom"

function SchemasList (){
    const user = useSelector((state) => state.user_data.user)
    const schemas = useSelector((state) => state.user_data.schemas)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSchemas(user.id, user.token, user.provider))
    }, [dispatch, user])

    return <>
        <p>This user have {schemas.length} schemas:</p>
        <ul>
            {schemas.map((schema) => (
                <li key={schema.id}>
                    <Link to={`/schema/${schema.id}`}>{schema.name}</Link>
                </li>
            ))}
        </ul>
    </>
}

export default SchemasList