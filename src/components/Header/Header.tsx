import { FC } from 'react'
import { Search } from '../Search/Search'
import { Showing } from '../Showing/Showing'
import styles from './Header.module.css'

export const Header: FC = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>Search For Books</h1>
      <Search />
      <Showing />
    </div>
  )
}