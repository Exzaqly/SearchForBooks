import React, {FC} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Books} from "./components/Books/Books";
import {Route, Routes} from "react-router-dom";
import {BookPage} from "./components/Books/BookPage";

const App: FC = () => {

    return (
        <div className='AppContainer'>
            <Header/>
            <Routes>
                    <Route path={'/books'} element={<Books/>}/>
                    <Route path={'/books/:id'} element={<BookPage/>}/>
                    <Route path={'*'} element={<div> Search! </div>}/>
            </Routes>
        </div>
    )
}

export default App;
