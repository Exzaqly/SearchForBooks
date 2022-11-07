import {AppStateType, BaseThunk, InferActionsType} from "./store";
import {booksAPI} from "../api/API";
import {ThunkDispatch} from "redux-thunk";

const BOOKS_RECEIVED = 'books/BOOKS_RECEIVED'
const SET_TOTAL_RESULTS = 'books/SET_TOTAL_RESULTS'
const SET_TOTAL_PAGES = 'books/SET_TOTAL_PAGES'
const SET_SEARCH_TERM = 'books/SET_SEARCH_TERM'
const SET_CURRENT_PAGE = 'books/SET_CURRENT_PAGE'
let initialState = {
    booksList: [] as BookType[],
    totalResults: null as number | null,
    totalPages: null as number | null,
    currentPage: 0,
    searchTerm: '',
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
}

const _getBooks = (): Thunk => async (dispatch, getState) => {
    const data = await booksAPI.getBooks(getState().books.searchTerm, getState().showing.category, getState().books.currentPage, getState().showing.sorting)
    dispatch(actions.booksReceived(data.items))
    dispatch(actions.setTotalResults(data.totalItems))
    dispatch(actions.setTotalPages(Math.ceil(data.totalItems / 30)))
}
export const findBooks = (searchTerm: string): Thunk => async (dispatch, getState) => {
    dispatch(actions.setSearchTerm(searchTerm))
    dispatch(actions.setCurrentPage(0))
    await dispatch(_getBooks())
}
export const addBooksPage = (): Thunk => async (dispatch, getState) => {
    dispatch(actions.setCurrentPage(getState().books.currentPage + 1))
    await dispatch(_getBooks())
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
    infoLink: string
}