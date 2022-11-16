import { AppStateType, BaseThunk, InferActionsType } from './store'
import { ThunkDispatch } from 'redux-thunk'

const SET_SORTING_METHOD = 'showing/SET_SORTING_METHOD'
const SET_CATEGORY = 'showing/SET_CATEGORY'
export const categories = {
  all: 'all',
  art: 'art',
  biography: 'biography',
  computers: 'computers',
  history: 'history',
  medical: 'medical',
  poetry: 'poetry',
}
export const sortingMethods = {
  relevance: 'relevance',
  newest: 'newest',
}
let initialState = {
  sorting: sortingMethods.relevance as SortingMethods,
  category: categories.all as Category,
}

const showingReducer = (
  state = initialState,
  action: Actions
): initialStateType => {
  switch (action.type) {
    case SET_SORTING_METHOD: {
      return {
        ...state,
        sorting: action.payload.sorting,
      }
    }
    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload.category,
      }
    }
    default:
      return state
  }
}

export const actions = {
  setSortingMethod: (sorting: SortingMethods) =>
    ({ type: SET_SORTING_METHOD, payload: { sorting } } as const),
  setCategory: (category: Category) =>
    ({ type: SET_CATEGORY, payload: { category } } as const),
}

export const setSortingMethod =
  (sorting: SortingMethods): Thunk =>
  (dispatch) => {
    dispatch(actions.setSortingMethod(sorting))
  }
export const setCategory =
  (category: Category): Thunk =>
  (dispatch) => {
    dispatch(actions.setCategory(category))
  }

export default showingReducer

type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
type Thunk = BaseThunk<Actions, void>
export type Category = keyof typeof categories
export type SortingMethods = keyof typeof sortingMethods
export type AppDispatch = ThunkDispatch<AppStateType, any, Actions>