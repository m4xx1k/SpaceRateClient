import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from "swiper";
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {useFetchByCategoryQuery} from "../redux/place/place.api.js";
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";

const Home = () => {
    const [activeCategory, setActiveCategory] = useState(null)
    const {data} = useFetchAllQuery()
    const {data: places} = useFetchByCategoryQuery(activeCategory)
    const {user} = useTelegram()
    useEffect(()=>console.log({places, category:data}),[data, places])
    return (<main className="page menu-open">

        <section className="hero">
            <div className="hero__container">
                <div className="hero__body">

                    <div className="hero__slider swiper">

                        <Swiper
                            loop
                            noSwiping

                            effect="fade"
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
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
                                    {JSON.stringify(user)}
                                    {/*Думать нужно думать куда пойти*/}
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
                                <div onClick={() => setActiveCategory(category._id)} key={category._id}
                                     className={`categories__item item-categories${category._id === activeCategory ? ' active' : ''} `}>
                                    {category.name}
                                    <div className="item-categories__img-ibg">
                                        <img src={`${import.meta.env.VITE__API}/categories/${category.photo}`}
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
                            <h2 className="ratings__title title title_1">рейтинги РЕСТОРАНОВ Санкт-Петербурга</h2>

                            <div className="ratings__items ratings__items_pc">
                                {
                                    places?.map(e => {
                                        let info = {}
                                        e.info.forEach(e => info[e.name] = e.value)
                                        return <article key={e.place._id}
                                                        className="ratings__item item-ratings">
                                            <div className="item-ratings__content">
                                                <div className="item-ratings__top">
                                                    <a href="#" className="item-ratings__name">{e.place.name}</a>
                                                    <div className="item-ratings__grade">
                                                        <div className="grade">ИДЕАЛЬНО <span>9,3</span></div>
                                                        <a href="#" className="link">читать все отзывы</a>
                                                    </div>
                                                </div>
                                                <div className="item-ratings__text">{
                                                    e.place.description
                                                }
                                                </div>
                                                <div className="item-ratings__bottom">
                                                    <div className="item-ratings__list list-product">
                                                        <div
                                                            className="list-product__item _icon-ruble">{info.time}</div>
                                                        <div
                                                            className="list-product__item _icon-location">{info.location}</div>
                                                        <div className="list-product__item _icon-kitchen">{info.type}
                                                        </div>
                                                    </div>
                                                    <Link to={`/place/${e.place._id}`}
                                                          className="item-ratings__goto _icon-link"></Link>
                                                </div>
                                            </div>
                                            <div className="item-ratings__image-ibg">
                                                <a href=""><img
                                                    src={`${import.meta.env.VITE__API}/places/${e.photos[0].photo}`}
                                                    alt=""/></a>
                                                <button className="item-ratings__favorite _icon-favorite"></button>
                                            </div>
                                        </article>

                                    })
                                }


                            </div>

                            <div className="ratings__items ratings__items_mob">
                                <article className="ratings__item item-ratings">
                                    <div className="item-ratings__content">
                                        <div className="item-ratings__top">
                                            <a href="#" className="item-ratings__name">1. Elm</a>
                                            <a href="#" className="item-ratings__goto _icon-link"></a>
                                        </div>
                                        <div className="item-ratings__grade">
                                            <div className="grade"><span>9,3</span></div>
                                            <a href="#" className="link">(20) отзывы</a>
                                        </div>
                                    </div>
                                </article>
                                <article className="ratings__item item-ratings">
                                    <div className="item-ratings__content">
                                        <div className="item-ratings__top">
                                            <a href="#" className="item-ratings__name">2. Forest hill</a>
                                            <a href="#" className="item-ratings__goto _icon-link"></a>
                                        </div>
                                        <div className="item-ratings__grade">
                                            <div className="grade"><span>9</span></div>
                                            <a href="#" className="link">(20) отзывы</a>
                                        </div>
                                    </div>
                                </article>
                                <article className="ratings__item item-ratings">
                                    <div className="item-ratings__content">
                                        <div className="item-ratings__top">
                                            <a href="#" className="item-ratings__name">3. Nama </a>
                                            <a href="#" className="item-ratings__goto _icon-link"></a>
                                        </div>
                                        <div className="item-ratings__grade">
                                            <div className="grade"><span>8,9</span></div>
                                            <a href="#" className="link">(20) отзывы</a>
                                        </div>
                                    </div>
                                </article>
                            </div>

                        </div>
                    </div>
                </section>
                : <></>
        }
        <section className="links">
            <div className="links__container">
                <div className="links__body">
                    <a href="#" className="links__item links__item_btn">РЕЙТИНГИ </a>
                    <a href="#" className="links__item">МНЕ НРАВИТСЯ</a>
                    <a href="#" className="links__item">ОТДЕЛ ЗАБОТЫ</a>
                </div>
            </div>
        </section>

    </main>)
};

export default Home;
