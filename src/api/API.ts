import axios from "axios";
import {BookType} from "../redux/booksReducer";

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes',
})
const APIkey = 'AIzaSyCqwB0oEBasGvlKnzNY5f9AEjbmyEg4Rb4'

export const booksAPI = {
    getBooks: (searchTerm: string, category: string, page: number, sorting: string) => {
        if(category === 'all'){
            return (
                instance.get<GetBooksResponse>(`?q=${searchTerm}&startIndex=${page}&orderBy=${sorting}&maxResults=30&key=${APIkey}`)
                    .then(response => response.data)
            )
        }
        return (
            instance.get<GetBooksResponse>(`?q=${searchTerm}+subject:${category}&startIndex=${page}&orderBy=${sorting}&maxResults=30&key=${APIkey}`)
                .then(response => response.data)
        )
    }
}

type GetBooksResponse = {
    items: BookType[]
    totalItems: number
}

