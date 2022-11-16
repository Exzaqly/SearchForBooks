import { FC } from 'react'
import preloaderSVG from '../../assets/preloader.svg'
import styles from './Preloader.module.css'

export const Preloader: FC = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloaderSVG} alt="" />
    </div>
  )
}