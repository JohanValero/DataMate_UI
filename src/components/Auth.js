import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { handleLogin, logOut } from '../store/actions'

function Auth() {
    const user = useSelector((state) => state.user_data.user)
    const dispatch = useDispatch()
    
    const handleGoogleLoginSuccess = (response) => {
        dispatch(handleLogin('google', response))
    }

    const handleLogOut = () => {
        dispatch(logOut())
    }

    return <>
        {   user ?
            <div>
                <h1>Welcome, {user.name} <img src={user.image_url} alt={user.name} /></h1>
                <button onClick={handleLogOut}>Logout</button>
            </div> :
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={(response) => console.log(response)}/>
            </GoogleOAuthProvider>
        }
    </>
}

export default Auth