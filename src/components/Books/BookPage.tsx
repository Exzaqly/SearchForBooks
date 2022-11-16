import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, getBook } from '../../redux/booksReducer'
import { bookSelector, isFetchingSelector } from '../../redux/selectors'
import bookCover from '../../assets/bookCover.jpg'
import { Preloader } from '../common/Preloader'
import styles from './BookPage.module.css'

export const BookPage: FC = () => {
  const params = useParams() as Params
  const dispatch: AppDispatch = useDispatch()
  const book = useSelector(bookSelector)
  const isFetching = useSelector(isFetchingSelector)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getBook(params.id))
  }, [])
  const goBack = () => {
    navigate(-1)
  }
  const openInGoogle = () => {
    window.open(book?.volumeInfo.previewLink)
  }
  return isFetching ? (
    <Preloader />
  ) : (
    book && (
      <div className={styles.bookPageContainer}>
        <div className={styles.header}>
          <button onClick={goBack}>Back</button>
        </div>
        <div className={styles.bookPage}>
          <div className={styles.bookCover}>
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail
                  ? book.volumeInfo.imageLinks.thumbnail
                  : bookCover
              }
              alt=""
            />
          </div>
          <div className={styles.descriptionContainer}>
            {book.volumeInfo.categories && (
              <span>{book.volumeInfo.categories}</span>
            )}
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && <p>{[...book.volumeInfo.authors]}</p>}
            {book.volumeInfo.description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: book.volumeInfo.description,
                }}
              />
            )}
            <button onClick={openInGoogle}>Open in Google Books</button>
          </div>
        </div>
      </div>
    )
  )
}

type Params = {
    id: string
}