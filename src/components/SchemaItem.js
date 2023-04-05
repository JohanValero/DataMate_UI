import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSchemas } from '../store/actions'

function SchemaItem() {
    const user = useSelector((state) => state.user_data.user)
    const schemaList = useSelector((state) => state.user_data.schemas)
    const { id: schemaId } = useParams()
    const schema = schemaList.find((schema) => schema.id === parseInt(schemaId))
    const dispatch = useDispatch()

    useEffect(() => {
        if(schemaList.length === 0)
            dispatch(fetchSchemas(user.id, user.token, user.provider))
    }, [dispatch, user])

    return <>
        This is a schema for: {schemaId}.<br/>
        There exists {schemaList.length} schemas, current schema id is: {schema?.id}.
    </>
}

export default SchemaItem