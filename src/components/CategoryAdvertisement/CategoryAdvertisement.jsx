import s from './CategoryAdvertisement.module.scss'
import {useFetchAdvertisementsQuery} from "../../redux/category/category.api.js";
import {Link} from "react-router-dom";
const VITE__API = import.meta.env.VITE__API
const CategoryAdvertisement = ({id}) => {
    const {data, isLoading, isSuccess} = useFetchAdvertisementsQuery(id)
    if(!data || isLoading || !isSuccess) return <></>
    return (
        <ul className={`advertisement__container`}>
            {
                data.map(adv=>(
                    <li key={adv._id} className={s.advertisement}>
                        <Link target={'_blank'} to={adv.link}>
                            <img loading="lazy"  className={s.img} src={`${VITE__API}/categories/${adv.photo}`} alt=""/>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default CategoryAdvertisement;
