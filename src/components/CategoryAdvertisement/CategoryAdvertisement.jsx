import s from './CategoryAdvertisement.module.scss'
import {useFetchAdvertisementsQuery} from "../../redux/category/category.api.js";
import {Link} from "react-router-dom";
const CategoryAdvertisement = ({id}) => {
    const {data, isLoading, isSuccess} = useFetchAdvertisementsQuery(id)
    console.log(data)
    if(!data || isLoading || !isSuccess) return <></>
    return (
        <ul className={`advertisement__container`}>
            {
                data.map(adv=>(
                    <li key={adv._id} className={s.advertisement}>
                        <Link target={'_blank'} to={adv.link}>
                            <img className={s.img} src={`https://api.goodjoy.uz/categories/${adv.photo}`} alt=""/>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default CategoryAdvertisement;
