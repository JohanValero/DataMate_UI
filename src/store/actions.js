import axios from 'axios'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = "LOGOUT"

export const FETCH_SCHEMAS_START = 'FETCH_SCHEMAS_START'
export const FETCH_SCHEMAS_SUCCESS = 'FETCH_SCHEMAS_SUCCESS'
export const FETCH_SCHEMAS_ERROR = 'FETCH_SCHEMAS_ERROR'

export const fetchSchemasStart = () => ({type: FETCH_SCHEMAS_START})
export const fetchSchemasSuccess = (schemas) => ({type: FETCH_SCHEMAS_SUCCESS, payload: schemas})
export const fetchSchemasError = (e) => ({type: FETCH_SCHEMAS_ERROR, payload: e})

export const ERROR_CODE_EXPIRATION_TOKEN = 1

export const handleServerControlledError = (error, dispatch) => {
    switch (error.message_id) {
        case ERROR_CODE_EXPIRATION_TOKEN:
            dispatch(logOut())
            break
        default:
            console.error("Unknow error:", error)
            alert(error)
            break
    }
}

export const fetchSchemas = (user_id, user_token, provider) => async (dispatch) => {
    dispatch(fetchSchemasStart())
    try {
        const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + `/api/${provider}/get_schemas`,
            {   user_id: user_id,
                id_token: user_token
            }
        )
        if( response?.data.status === "OK")
            dispatch(fetchSchemasSuccess(response.data?.schemas))
        else
            handleServerControlledError(response?.data, dispatch)
    } catch (error) {
        dispatch(fetchSchemasError(error.message))
    }
}

export const loginSuccess = (userData) => ({type: LOGIN_SUCCESS, payload: userData})
export const loginError = (error) => ({type: LOGIN_ERROR, payload: error})
export const logOut = () => ({type: LOGOUT})

export const handleLogin = (provider, response) => async (dispatch) => {
    try {
        const backendResult = await axios.post(
            process.env.REACT_APP_BACKEND_URL + `/auth/${provider}`,
            {id_token: response.credential}
        )
        if(backendResult?.data?.status === "OK"){
            const userData = backendResult.data.user_data
            userData.token = response.credential
            userData.provider = provider
            localStorage.setItem("user", JSON.stringify(userData))
            dispatch(loginSuccess(userData))
        }else if( backendResult?.data?.status === "ERROR" ){
            console.error('Error during login:', backendResult.data.message)
            dispatch(loginError(backendResult.data))
        }
    } catch (error) {
        console.error('Error during login:', error)
        dispatch(loginError(error))
    }
}