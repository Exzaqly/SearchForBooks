import React, {FC} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addBooksPage, AppDispatch, findBooks} from "./redux/booksReducer";
import {booksListSelector} from "./redux/selectors";
import {Header} from "./components/Header/Header";
import {Books} from "./components/Books/Books";
import {Route, Routes} from "react-router-dom";
import {BookPage} from "./components/Books/BookPage";

const App: FC = () => {

  return(
      <div>
            <Header />
          <Routes>
              <Route path={'/books'} element={<Books />}/>
              <Route path={'/books/:id'} element={<BookPage />}/>
              <Route path={'*'} element={<div> Search! </div>}/>
          </Routes>
      </div>
  )
}

export default App;
