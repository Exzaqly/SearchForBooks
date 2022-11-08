import {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, isFetchingSelector, loadMoreSelector, totalResultsSelector} from "../../redux/selectors";
import {Book} from "./Book";
import {Preloader} from "../common/Preloader";
import {addBooksPage, AppDispatch} from "../../redux/booksReducer";
import {NavLink} from "react-router-dom";

export const Books: FC = () => {
    const totalResults = useSelector(totalResultsSelector)
    const books = useSelector(booksListSelector)
    const isFetching = useSelector(isFetchingSelector)
    const isLoading = useSelector(loadMoreSelector)
    const dispatch: AppDispatch = useDispatch()
    const loadMore = () => {
        dispatch(addBooksPage())
    }
    return (
        isFetching ?
            <Preloader/> :
            totalResults ?
                <div>
                    <h2>Found {totalResults} results</h2>
                    {books.map(b => <NavLink to={`/book/${b.id}`}>
                        <Book
                            key={b.id}
                            title={b.volumeInfo.title}
                            authors={b.volumeInfo.authors}
                            categories={b.volumeInfo.categories}
                            image={b.volumeInfo.imageLinks?.thumbnail}
                        />
                    </NavLink>)}
                    {isLoading ? <Preloader/> : <button onClick={loadMore}>load More</button>}
                </div> : <div>search!</div>

    )
}
