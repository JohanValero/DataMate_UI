import React from 'react'
import Header from './components/Header'
import SchemasList from './components/SchemasList'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchemaItem from './components/SchemaItem';

function App() {
    const user = useSelector((state) => state.user_data.user)

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route exact path='/' element={ user && <SchemasList /> }/>
                    <Route path='/schema/:id' element={ user && <SchemaItem /> }/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App