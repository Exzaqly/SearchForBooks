import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, isFetchingSelector, totalResultsSelector} from "../../redux/selectors";
import {Book} from "./Book";
import {Preloader} from "../common/Preloader";
import {addBooksPage, AppDispatch} from "../../redux/booksReducer";

export const Books: FC = () => {
    const totalResults = useSelector(totalResultsSelector)
    const books = useSelector(booksListSelector)
    const isFetching = useSelector(isFetchingSelector)
    const dispatch: AppDispatch = useDispatch()
    const loadMore = () => {
        dispatch(addBooksPage())
    }
    return (
        isFetching?
            <Preloader /> :
            <div>
                    <h2>Found {totalResults} results</h2>
                    {books.map(b => <Book
                        key = {b.id}
                        title = {b.volumeInfo.title}
                        authors = {b.volumeInfo.authors}
                        categories = {b.volumeInfo.categories}
                        image = {b.volumeInfo.imageLinks?.thumbnail}
                    />)}
                    <button onClick={loadMore}>load More</button>
                </div>

    )
}
