import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {AppDispatch, findBooks} from "../../redux/booksReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export const Search: FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const {register, handleSubmit} = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(findBooks(data.searchTerm))
        navigate('/books')
    }
    return(
      <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register('searchTerm')}/>
                  <button type='submit'>find</button>
              </form>
      </div>
  )
}

type FormData = {
    searchTerm: string
}