import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import { useNavigate} from "react-router-dom";
import HeroSlider from "../components/HeroSlider.jsx";
import {toWebp} from "../utils.js";

const Home = ({VITE__API}) => {
    // const [activeCategory, setActiveCategory] = useState(null)
    const {data} = useFetchAllQuery()
    const navigate = useNavigate()
    // const [fetchPlaces] = useLazyFetchByCategoryQuery()
    // const [places, setPlaces] = useState([])
    const selectCategory = async category => {
        navigate(`/places/${category._id}`)
        // const {data} = await fetchPlaces(category._id)
        // setPlaces(data)
        // setActiveCategory(category._id)
    }

    return (<>

        <HeroSlider/>
        <section className="categories">
            <div className="categories__container">
                <div className="categories__body">
                    <div className="categories__title title title_2">КАТЕГОРИИ РЕЙТИНГОВ</div>
                    <div className="categories__items">
                        {
                            data?.map(category => (
                                <div onClick={() => selectCategory(category)} key={category._id}
                                    // className={`categories__item item-categories${category._id === activeCategory ? ' active' : ''}`}
                                     className={`categories__item item-categories`}
                                >

                                    {category.name}
                                    <div className="item-categories__img-ibg">
                                        <picture>
                                            <source srcSet={toWebp(`${VITE__API}/categories/${category.photo.split('.')[0]}.webp`)}/>
                                            <img src={`${VITE__API}/categories/${category.photo}`}
                                                 alt=""/>
                                        </picture>


                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </section>


    </>)
};

export default Home;
