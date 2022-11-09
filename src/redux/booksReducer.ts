import {AppStateType, BaseThunk, InferActionsType} from "./store";
import {booksAPI} from "../api/API";
import {ThunkDispatch} from "redux-thunk";

const BOOKS_RECEIVED = 'books/BOOKS_RECEIVED'
const BOOK_RECEIVED = 'books/BOOK_RECEIVED'
const SET_TOTAL_RESULTS = 'books/SET_TOTAL_RESULTS'
const SET_TOTAL_PAGES = 'books/SET_TOTAL_PAGES'
const SET_SEARCH_TERM = 'books/SET_SEARCH_TERM'
const SET_CURRENT_PAGE = 'books/SET_CURRENT_PAGE'
const CLEAR_BOOKS_LIST = 'books/CLEAR_BOOKS_LIST'
const TOGGLE_IS_FETCHING = 'books/TOGGLE_IS_FETCHING'
const TOGGLE_LOAD_MORE = 'books/TOGGLE_LOAD_MORE'
let initialState = {
    booksList: [] as BookType[],
    book: null as BookType | null,
    totalResults: null as number | null,
    totalPages: null as number | null,
    currentPage: 0,
    searchTerm: '',
    isFetching: false,
    loadMore: false
}

const booksReducer = (state = initialState, action: Actions): initialStateType => {
    switch (action.type) {
        case BOOKS_RECEIVED: {
            return {
                ...state,
                booksList: [...state.booksList, ...action.payload]
            }
        }
        case SET_TOTAL_RESULTS: {
            return {
                ...state,
                totalResults: action.payload.totalResult
            }
        }
        case SET_TOTAL_PAGES: {
            return {
                ...state,
                totalPages: action.payload.totalPages
            }
        }
        case SET_SEARCH_TERM: {
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        }
        case CLEAR_BOOKS_LIST: {
            return {
                ...state,
                booksList: []
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        }
        case TOGGLE_LOAD_MORE: {
            return {
                ...state,
                loadMore: action.payload.loadMore
            }
        }
        case BOOK_RECEIVED: {
            return {
                ...state,
                book: action.payload
            }
        }
        default:
            return state
    }
}

const actions = {
    booksReceived: (books: BookType[]) => ({type: BOOKS_RECEIVED, payload: books} as const),
    setTotalResults: (totalResult: number) => ({type: SET_TOTAL_RESULTS, payload: {totalResult}} as const),
    setTotalPages: (totalPages: number) => ({type: SET_TOTAL_PAGES, payload: {totalPages}} as const),
    setSearchTerm: (searchTerm: string) => ({type: SET_SEARCH_TERM, payload: {searchTerm}} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, payload: {currentPage}} as const),
    clearBooksList: () => ({type: CLEAR_BOOKS_LIST} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}} as const),
    toggleLoadMore: (loadMore: boolean) => ({type: TOGGLE_LOAD_MORE, payload: {loadMore}} as const),
    bookReceived: (book: BookType) => ({type: BOOK_RECEIVED, payload: book} as const)
}

const _getBooks = (): Thunk => async (dispatch, getState) => {
try {
    const data = await booksAPI.getBooks(getState().books.searchTerm, getState().showing.category, getState().books.currentPage, getState().showing.sorting)
    dispatch(actions.booksReceived(data.items))
    dispatch(actions.setTotalResults(data.totalItems))
    dispatch(actions.setTotalPages(Math.ceil(data.totalItems / 30)))
}catch (e) {
    alert('Failed to load books')
}

}
export const findBooks = (searchTerm: string): Thunk => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setSearchTerm(searchTerm))
    dispatch(actions.setCurrentPage(0))
    dispatch(actions.clearBooksList())
    await dispatch(_getBooks())
    dispatch(actions.toggleIsFetching(false))
}
export const addBooksPage = (): Thunk => async (dispatch, getState) => {
    dispatch(actions.toggleLoadMore(true))
    dispatch(actions.setCurrentPage(getState().books.currentPage + 1))
    await dispatch(_getBooks())
    dispatch(actions.toggleLoadMore(false))
}
export const getBook = (id: string): Thunk => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true))
    try {
        const data = await booksAPI.getBook(id)
        dispatch(actions.bookReceived(data))
        dispatch(actions.toggleIsFetching(false))
    }
    catch (e){
        alert('Failed to load book')
    }
}

export default booksReducer

type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
type Thunk = BaseThunk<Actions>
export type AppDispatch = ThunkDispatch<AppStateType, any, Actions>
export type BookType = {
    id: string
    volumeInfo: VolumeInfo
}
type VolumeInfo = {
    title: string
    authors: string[]
    categories: string[]
    imageLinks: {
        thumbnail: string
    }
    description: string
    previewLink: string
}