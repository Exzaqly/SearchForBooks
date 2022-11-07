import {FC} from "react"
import bookCover from '../../assets/bookCover.png'

export const Book: FC<Props> = ({title, categories, authors, image}) => {
    return (
        <div>
            <img src={image? image : bookCover} alt=""/>
            {categories && <span>{categories[0]}</span>}
            <h3>{title}</h3>
            {authors && <p>{[...authors]}</p>}
        </div>
    )
}

type Props = {
    title: string
    authors: string[]
    categories: string[]
    image: string
}