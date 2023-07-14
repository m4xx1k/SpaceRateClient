import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {Link} from "react-router-dom";
import HeroSlider from "../components/HeroSlider.jsx";
import {toWebp} from "../utils.js";

const VITE__API = import.meta.env.VITE__API

const Home = () => {
    const {data, isLoading} = useFetchAllQuery()

    return (<>

        <HeroSlider/>
        <Link style={{borderRadius:6,width:'fit-content', border:'1px solid #000', padding:'4px 8px', margin:'12px 36px'}} to={'events'}>Кино</Link>

        <section className="categories">
            <div className="categories__container">
                <div className="categories__body">

                    <div className="categories__title title title_2">КАТЕГОРИИ РЕЙТИНГОВ</div>
                    <div className="categories__items">
                        {
                            !isLoading ? data?.map(category => (
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
                                )) :
                                Array(20).fill().map((_, i) =>

                                    <div key={i} style={{height: 56, width: 90}} className={'skeleton-loading'}></div>
                                )
                        }


                    </div>
                </div>
            </div>
        </section>


    </>)
};

export default Home;
