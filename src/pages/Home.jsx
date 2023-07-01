import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from "swiper";
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {useLazyFetchByCategoryQuery} from "../redux/place/place.api.js";
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";
import MobilePlace from "../components/MobilePlace.jsx";
import PlaceItem from "../components/PlaceItem.jsx";
import HeroSlider from "../components/HeroSlider.jsx";

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
                                        <img src={`${VITE__API}/categories/${category.photo}`}
                                             alt=""/>
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
