import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from "swiper";
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {useLazyFetchByCategoryQuery} from "../redux/place/place.api.js";
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";
import MobilePlace from "../components/MobilePlace.jsx";
import PlaceItem from "../components/PlaceItem.jsx";

const Home = ({VITE__API}) => {
    const [activeCategory, setActiveCategory] = useState(null)
    const {data} = useFetchAllQuery()
    const [fetchPlaces] = useLazyFetchByCategoryQuery()
    const [places, setPlaces] = useState([])
    const {user, tg} = useTelegram()
    const selectCategory = async category => {
        const {data} = await fetchPlaces(category._id)
        setPlaces(data)
        setActiveCategory(category._id)
    }
    useEffect(() => {

        tg.ready()
    }, [])
    return (<>

        <section className="hero">
            <div className="hero__container">
                <div className="hero__body">

                    <div className="hero__slider swiper">

                        <Swiper
                            loop
                            noSwiping

                            effect="fade"
                            slidesPerView={1}
                            className="hero__wrapper swiper-wrapper"
                            modules={[EffectFade, Autoplay]}
                            observer={true}
                            observeParents={true}
                            speed={800}
                            fadeEffect={{
                                crossFade: true
                            }}
                            autoplay={{
                                delay: 5000, disableOnInteraction: false
                            }}
                        >
                            <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                <div className="slide-hero__title">Не нужно думать куда пойти, ориентируйтесь по
                                    нашим рейтингам.
                                </div>
                                <div className="slide-hero__decors">
                                    <div className="slide-hero__decor slide-hero__decor_1"></div>
                                    <div className="slide-hero__decor slide-hero__decor_2"></div>
                                    <div className="slide-hero__decor slide-hero__decor_3"></div>
                                    <div className="slide-hero__decor slide-hero__decor_4"></div>
                                    <div className="slide-hero__decor slide-hero__decor_5"></div>
                                    <div className="slide-hero__decor slide-hero__decor_6"></div>
                                    <div className="slide-hero__decor slide-hero__decor_7"></div>
                                    <div className="slide-hero__decor slide-hero__decor_8"></div>
                                    <div className="slide-hero__decor slide-hero__decor_9"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                <div className="slide-hero__title">
                                    {/*{!!user?.username ? user.username : 'is not tg'}*/}
                                    Думать нужно думать куда пойти
                                </div>
                                <div className="slide-hero__decors">
                                    <div className="slide-hero__decor slide-hero__decor_10"></div>
                                    <div className="slide-hero__decor slide-hero__decor_11"></div>
                                    <div className="slide-hero__decor slide-hero__decor_12"></div>
                                    <div className="slide-hero__decor slide-hero__decor_13"></div>
                                    <div className="slide-hero__decor slide-hero__decor_14"></div>
                                    <div className="slide-hero__decor slide-hero__decor_15"></div>
                                    <div className="slide-hero__decor slide-hero__decor_16"></div>
                                    <div className="slide-hero__decor slide-hero__decor_17"></div>
                                    <div className="slide-hero__decor slide-hero__decor_18"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                <div className="slide-hero__title">Ориентируйтесь нужно думать куда пойти, по
                                    нашим.
                                </div>
                                <div className="slide-hero__decors">
                                    <div className="slide-hero__decor slide-hero__decor_1"></div>
                                    <div className="slide-hero__decor slide-hero__decor_2"></div>
                                    <div className="slide-hero__decor slide-hero__decor_3"></div>
                                    <div className="slide-hero__decor slide-hero__decor_4"></div>
                                    <div className="slide-hero__decor slide-hero__decor_5"></div>
                                    <div className="slide-hero__decor slide-hero__decor_6"></div>
                                    <div className="slide-hero__decor slide-hero__decor_7"></div>
                                    <div className="slide-hero__decor slide-hero__decor_8"></div>
                                    <div className="slide-hero__decor slide-hero__decor_9"></div>
                                </div>

                            </SwiperSlide>
                        </Swiper>

                        <div className="hero__pagination pagination"></div>
                    </div>

                </div>
                <div className="hero__decors">
                    <div className="hero__decor hero__decor_1"></div>
                    <div className="hero__decor hero__decor_2"></div>
                    <div className="hero__decor hero__decor_3"></div>
                    <div className="hero__decor hero__decor_4"></div>
                    <div className="hero__decor hero__decor_5"></div>
                    <div className="hero__decor hero__decor_6"></div>
                    <div className="hero__decor hero__decor_7"></div>
                    <div className="hero__decor hero__decor_8"></div>
                    <div className="hero__decor hero__decor_9"></div>
                </div>
            </div>
        </section>

        <section className="categories">
            <div className="categories__container">
                <div className="categories__body">
                    <div className="categories__title title title_2">КАТЕГОРИИ РЕЙТИНГОВ</div>
                    <div className="categories__items">
                        {
                            data?.map(category => (
                                <div onClick={() => selectCategory(category)} key={category._id}
                                     className={`categories__item item-categories${category._id === activeCategory ? ' active' : ''} `}>
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

        {
            places?.length ?
                <section className="ratings">
                    <div className="ratings__container">
                        <div className="ratings__body">
                            <h2 className="ratings__title title title_1">TOP 10</h2>

                            <div className="ratings__items ratings__items_pc">
                                {
                                    places.slice(0, 10).map(e => {

                                        const info = e.info
                                        const id = e.place._id
                                        return <PlaceItem e={e} id={id} info={info} key={id}/>

                                    })
                                }


                            </div>

                            <div className="ratings__items ratings__items_mob">

                                {
                                    places?.slice(0, 10)?.map((e, i) => <MobilePlace key={i} e={e} i={i}/>)
                                }


                            </div>

                        </div>
                    </div>
                </section>
                : <></>
        }


    </>)
};

export default Home;
