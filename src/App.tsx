import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addBooksPage, AppDispatch, findBooks} from "./redux/booksReducer";
import {booksListSelector} from "./redux/selectors";

function App() {
    const dispatch:AppDispatch = useDispatch()
    const books = useSelector(booksListSelector)

  return (<div>
        <button onClick={() => {
            dispatch(findBooks('Поющие в терновнике'))
        }}>жмяк</button>
          <button onClick={() => {
            dispatch(addBooksPage())
        }}>клякс</button>
          {books.map(b => <div>
              <div>{b.id} </div>
              <div><img src={b.volumeInfo.imageLinks?.thumbnail? b.volumeInfo.imageLinks.thumbnail : ''} alt=""/></div>
          </div>)}
      </div>
  )
}

export default App;
