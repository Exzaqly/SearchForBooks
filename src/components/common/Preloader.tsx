import {FC} from "react";
import preloaderSVG from '../../assets/preloader.svg'

export const Preloader: FC = () => {
    return(
        <div>
            <img src={preloaderSVG} alt=""/>
        </div>
    )
}