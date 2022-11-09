import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    booksListSelector,
    currentPageSelector,
    isFetchingSelector,
    loadMoreSelector,
    totalPagesSelector,
    totalResultsSelector
} from "../../redux/selectors";
import {Preloader} from "../common/Preloader";
import {addBooksPage, AppDispatch} from "../../redux/booksReducer";
import {Link} from "react-router-dom";
import {Plug} from "../common/Plug";
import styles from './BooksPage.module.css'
import bookCover from "../../assets/bookCover.jpg";

export const BooksPage: FC = () => {
    const totalResults = useSelector(totalResultsSelector)
    const books = useSelector(booksListSelector)
    const isFetching = useSelector(isFetchingSelector)
    const isLoading = useSelector(loadMoreSelector)
    const currentPage = useSelector(currentPageSelector)
    const totalPages = useSelector(totalPagesSelector)
    const dispatch: AppDispatch = useDispatch()
    const loadMore = () => {
        dispatch(addBooksPage())
    }
    return (
        isFetching ?
            <Preloader/> :
            totalPages ?
                <div className={styles.container}>
                    <h2 className={styles.totalResults}>Found {totalResults} results</h2>
                    <div className={styles.booksContainer}>
                        {books.map(b => <Link key={b.id} to={`/books/${b.id}`}>
                            <Book
                                title={b.volumeInfo.title}
                                authors={b.volumeInfo.authors}
                                categories={b.volumeInfo.categories}
                                image={b.volumeInfo.imageLinks?.thumbnail}
                            />
                        </Link>)}
                    </div>
                    {isLoading ? <Preloader/> : currentPage < totalPages &&
                        <button className={styles.loadButton} onClick={loadMore}>Load more</button>}
                </div> : <Plug/>

    )
}

const Book: FC<Props> = ({title, categories, authors, image}) => {
    return (
        <div className={styles.bookContainer}>
            <img src={image ? image : bookCover} alt=""/>
            {categories && <span>{categories[0]}</span>}
            <h3>{title}</h3>
            {authors && <p>{[...authors]}</p>}
        </div>
    )
}

type Props = {
    title: string
    authors: string[]
    categories: string[]
    image: string
}