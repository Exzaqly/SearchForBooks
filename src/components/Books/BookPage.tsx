import {FC, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, getBook} from "../../redux/booksReducer";
import {bookSelector, isFetchingSelector} from "../../redux/selectors";
import bookCover from "../../assets/bookCover.png";
import {Preloader} from "../common/Preloader";

export const BookPage: FC = () => {
    const params = useParams() as Params
    const dispatch: AppDispatch = useDispatch()
    const book = useSelector(bookSelector)
    const isFetching = useSelector(isFetchingSelector)
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getBook(params.id))
    }, [])
    const goBack = () => {
        navigate(-1)
    }
    const openInGoogle = () => {
        window.open(book?.volumeInfo.previewLink)
    }
    return (
        isFetching ?
            <Preloader/> :
            book && <div>
                <button onClick={goBack}>go Back</button>
                <img src={book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : bookCover} alt=""/>
                {book.volumeInfo.categories && <span>{book.volumeInfo.categories}</span>}
                <h3>{book.volumeInfo.title}</h3>
                {book.volumeInfo.authors && <p>{[...book.volumeInfo.authors]}</p>}
                {book.volumeInfo.description && <p>{book.volumeInfo.description}</p>}
                <button onClick={openInGoogle}>open in google books</button>

            </div>
    )
}

type Params = {
    id: string
}