import {FC} from "react";
import {
    AppDispatch,
    categories,
    Category,
    setCategory,
    setSortingMethod,
    sortingMethods,
    SortingMethods
} from "../../redux/showingReducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import styles from './Showing.module.css'

export const Showing: FC = () => {
    return (
        <div className={styles.showingContainer}>
            <Categories />
            <Sorting />
        </div>
    )
}

const Sorting: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const {register, handleSubmit} = useForm<SortingForm>()
    const onSubmit: SubmitHandler<SortingForm> = (data) => {
        dispatch(setSortingMethod(data.sorting))
    }
    return (
        <form className={styles.form}  onChange={handleSubmit(onSubmit)}>
            <label>Sorting by: </label>
            <select {...register('sorting')}>
                <option value={sortingMethods.relevance}>Relevance</option>
                <option value={sortingMethods.newest}>Newest</option>
            </select>
        </form>
    )
}

const Categories: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const {register, handleSubmit} = useForm<CategoryForm>()
    const onSubmit: SubmitHandler<CategoryForm> = (data) => {
        dispatch(setCategory(data.category))
    }
    return (
        <form className={styles.form} onChange={handleSubmit(onSubmit)}>
            <label>Categories: </label>
            <select {...register('category')}>
                <option value={categories.all}>All</option>
                <option value={categories.art}>Art</option>
                <option value={categories.biography}>Biography</option>
                <option value={categories.history}>History</option>
                <option value={categories.medical}>Medical</option>
                <option value={categories.computers}>Computers</option>
                <option value={categories.poetry}>Poetry</option>
            </select>
        </form>
    )
}

type CategoryForm = {
    category: Category
}
type SortingForm = {
    sorting: SortingMethods
}