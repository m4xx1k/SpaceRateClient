import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {Link} from "react-router-dom";
import HeroSlider from "../components/HeroSlider.jsx";
import {toWebp} from "../utils.js";
const VITE__API = import.meta.env.VITE__APP

const Home = () => {
    const {data} = useFetchAllQuery()

    return (<>

        <HeroSlider/>
        <section className="categories">
            <div className="categories__container">
                <div className="categories__body">
                    <div className="categories__title title title_2">КАТЕГОРИИ РЕЙТИНГОВ</div>
                    <div className="categories__items">
                        {
                            data?.map(category => (
                                <Link to={`/places/${category._id}`} key={category._id}
                                    // className={`categories__item item-categories${category._id === activeCategory ? ' active' : ''}`}
                                      className={`categories__item item-categories`}
                                >

                                    {category.name}
                                    <div className="item-categories__img-ibg">
                                        <picture>
                                            <source srcSet={toWebp(`${VITE__API}/categories/${category.photo}`)}/>
                                            <img src={`${VITE__API}/categories/${category.photo}`}
                                                 alt=""/>
                                        </picture>


                                    </div>
                                </Link>
                            ))
                        }


                    </div>
                </div>
            </div>
        </section>


    </>)
};

export default Home;
