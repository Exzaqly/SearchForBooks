import {FC} from "react";
import {Search} from "../Search/Search";
import {Showing} from "../Showing/Showing";
import {Link} from "react-router-dom";

export const Header: FC = () => {
  return(
      <div>
            <h1>Search For Books</h1>
              <Search />
            <Showing />
      </div>
  )
}