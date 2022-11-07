import {BaseThunk, InferActionsType} from "./store";

export const categories = {
    all: 'all',
    art: 'art',
    biography: 'biography',
    computers: 'computers',
    history: 'history',
    medical: 'medical',
    poetry: 'poetry'
}
export const sortingMethods = {
    relevance: 'relevance',
    newest: 'newest'
}
let initialState = {
    sorting: sortingMethods.relevance as SortingMethods,
    category: categories.all as Category,
}






const showingReducer = (state = initialState, action: Actions): initialStateType => {
    switch (action.type) {

        default:
            return state
    }
}

export const actions = {
    setProfile: () => ({type: 'profile/SET-PROFILE'} as const),

}



export default showingReducer

type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
type Thunk = BaseThunk<Actions>
type Category = keyof typeof categories
type SortingMethods = keyof typeof sortingMethods