import React from 'react'
import Auth from './Auth'
import { Link } from 'react-router-dom'

function Header() {
    return <header className="App-header">
        <Link to = "/"><h1>Data Mate</h1></Link>
        <Auth />
    </header>
}

export default Header