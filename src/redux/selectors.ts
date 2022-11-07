import {AppStateType} from "./store";

export const booksListSelector = (state: AppStateType) => state.books.booksList
export const totalResultsSelector = (state: AppStateType) => state.books.totalResults
export const isFetchingSelector = (state: AppStateType) => state.books.isFetching