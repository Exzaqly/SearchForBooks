import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {AppDispatch, findBooks} from "../../redux/booksReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from './Search.module.css'
import search from '../../assets/search.png'

export const Search: FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const {register, handleSubmit} = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (data.searchTerm !== '') {
            dispatch(findBooks(data.searchTerm))
            navigate('/books')
        }
    }
    return(
      <div className={styles.formContainer}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register('searchTerm')} placeholder={'Search...'}/>
                  <button type='submit'><img className={styles.buttonImg} src={search} alt=""/></button>
              </form>
      </div>
  )
}

type FormData = {
    searchTerm: string
}