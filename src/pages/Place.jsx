import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import {useFetchAllRatingsMutation, useFetchByIdPlaceQuery} from "../redux/place/place.api.js";
import SwiperCore, {Pagination, Navigation} from 'swiper/core';
import RateForm from "../components/RateForm/RateForm.jsx";
import dayjs from "dayjs";
import ReviewSlide from "../components/ReviewSlide.jsx";

SwiperCore.use([Pagination, Navigation]);
const Place = () => {
    const {id} = useParams()
    const {data, isSuccess, isLoading, isError, error} = useFetchByIdPlaceQuery(id)
    const [fetchRatings] = useFetchAllRatingsMutation()
    const [ratings, setRatings] = useState(null)
    const [info, setInfo] = useState({})
    useEffect(() => {
        if (isSuccess) {
            let info = {}
            data.info.forEach(e => info[e.name] = e.value)
            setInfo(info)
            console.log(info)
        }
        const handleFetchAllRatings = async () => {
            const {data} = await fetchRatings({placeId: id})
            setRatings(data.ratings)
        }
        if (ratings === null) handleFetchAllRatings()
        console.log({data, isSuccess, isError, error})
    }, [data, isSuccess, isError, error])
    const swiperRef = useRef();
    if (isLoading) return <p>loading</p>
    if (isError) return <p>'error'</p>
    if (!data || !ratings) return <p>no data</p>
    return (<main className="page">

            <section className="restaurant">
                <div className="restaurant__container">
                    <div className="restaurant__body">
                        <div className="restaurant__top">
                            <h1 className="restaurant__title">{data?.place?.name}</h1>
                            <div className="restaurant__grade grade-restaurant">
                                <span>ИДЕАЛЬНО</span>
                                <div className="grade-restaurant__rating rating">
                                    <div className="rating__body">
                                        <div className="rating__active"></div>
                                        <div className="rating__items">
                                            <input type="radio" className="rating__item" value="1" name="rating"/>
                                            <input type="radio" className="rating__item" value="2" name="rating"/>
                                            <input type="radio" className="rating__item" value="3"
                                                   name="rating"/>
                                            <input type="radio" className="rating__item" value="4"
                                                   name="rating"/>
                                            <input type="radio" className="rating__item" value="5"
                                                   name="rating"/>
                                        </div>
                                    </div>
                                    <div className="rating__value">4</div>
                                </div>

                            </div>
                        </div>

                        <div className="restaurant__slider slider-restaurant">
                            <Swiper
                                pagination={{clickable: true}}
                                navigation={true}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1, spaceBetween: 10,
                                    }, 768: {
                                        slidesPerView: 1.5, spaceBetween: 40,
                                    }, 992: {
                                        slidesPerView: 2, spaceBetween: 40,
                                    }, 1268: {
                                        slidesPerView: 2, spaceBetween: 60,
                                    },
                                }}
                                className="restaurant__slider slider-restaurant"
                            >

                                {data.photos.map((e, index) => (<SwiperSlide key={index}
                                                                             className="restaurant__slide slide-restaurant-ibg swiper-slide">
                                    <img src={`${import.meta.env.VITE__API}/places/${e.photo}`} alt={e.photo}/>
                                </SwiperSlide>))}
                            </Swiper>
                            {/*<Swiper className="slider-restaurant__wrapper swiper-wrapper"*/}
                            {/*        observer={true}*/}
                            {/*        observeParents={true}*/}
                            {/*        spaceBetween={10 * 4}*/}
                            {/*>*/}
                            {/*    {*/}
                            {/*        data.photos.map(e => (*/}
                            {/*            <SwiperSlide key={e._id}*/}
                            {/*                         className="slider-restaurant__slide slide-restaurant-ibg swiper-slide">*/}
                            {/*                <img src={`${import.meta.env.VITE__API}/places/${e.photo}`}*/}
                            {/*                     alt=""/>*/}
                            {/*            </SwiperSlide>*/}
                            {/*        ))*/}
                            {/*    }*/}

                            {/*</Swiper>*/}
                            <div className="slider-restaurant__pagination pagination"></div>
                            <div className="slider-restaurant__navigation navigation">
                                <button className="navigation__button button-prev"></button>
                                <button className="navigation__button button-next"></button>
                            </div>
                        </div>

                        <div className="restaurant__bottom">
                            <button className="restaurant__like _icon-favorite">МНЕ НРАВИТСЯ</button>
                            <div className="restaurant__social social">
                                <a href="#" className="social__link _icon-vk"></a>
                                <a href="#" className="social__link _icon-telegram"></a>
                                <a href="#" className="social__link _icon-facebook"></a>
                                <a href="#" className="social__link _icon-instagram"></a>
                            </div>
                        </div>

                        <div className="restaurant__description description-restaurant">
                            <div className="description-restaurant__title">ОПИСАНИЕ:</div>
                            <div className="description-restaurant__body">
                                <div className="description-restaurant__text">
                                    {data.place.description}
                                </div>
                                <div className="description-restaurant__list list-product">
                                    <div className="list-product__item _icon-ruble">{info.price}</div>
                                    <div className="list-product__item _icon-time">{info.time}</div>
                                    <div className="list-product__item _icon-location">{info.location}</div>
                                    <div className="list-product__item _icon-kitchen">{info.type}
                                    </div>
                                    <a href={`mailto:${info.email}`}
                                       className="list-product__item _icon-mail">{info.site}</a>
                                    <a href="tel:89291052929"
                                       className="list-product__item _icon-phone">{info.telephone}</a>

                                    <div className="description-restaurant__social social">
                                        <a href={info.tg} className="social__link _icon-vk"></a>
                                        <a href={info.tg} className="social__link _icon-telegram"></a>
                                        <a href={info.fb} className="social__link _icon-facebook"></a>
                                        <a href={info.inst} className="social__link _icon-instagram"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RateForm placeId={data.place._id}/>

                    </div>
                </div>
            </section>
            {
                !!ratings?.length && ratings.length > 0 ?
                    <section className="rewievs">
                        <div className="rewievs__container">
                            <div className="rewievs__body">
                                <div className="rewievs__top">
                                    <h2 className="rewievs__title">ОТЗЫВЫ:</h2>
                                    <div className="rewievs__control">
                                        <button className="none rewievs__btn _icon-comment"><span>ОСТАВИТЬ ОТЗЫВ</span>
                                        </button>
                                        <div
                                            className="rewievs__navigation navigation navigation_small navigation_black">
                                            <button onClick={() => swiperRef.current.slidePrev()}
                                                    className="navigation__button button-prev"></button>
                                            <button onClick={() => swiperRef.current.slideNext()}
                                                    className="navigation__button button-next"></button>
                                        </div>
                                    </div>
                                </div>


                                <Swiper
                                    pagination={{clickable: true}}
                                    navigation={true}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1, spaceBetween: 10,
                                        }, 768: {
                                            slidesPerView: 1.5, spaceBetween: 40,
                                        }, 992: {
                                            slidesPerView: 2, spaceBetween: 40,
                                        }, 1268: {
                                            slidesPerView: 2, spaceBetween: 60,
                                        },
                                    }}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}

                                    className="rewievs__slider slider-rewievs swiper slider-rewievs__wrapper swiper-wrapper"
                                >

                                    {ratings.map((e, index) => {
                                        // const {data} = await fetchRatings({placeId: id})
                                        // const e = data.ratings[index]
                                        return (
                                            // <div className="swiper-slide" key={index}>
                                            //     <ReviewSlide key={e._id} e={e} index={index}/>
                                            // </div>
                                            <SwiperSlide className="slider-rewievs__slide slide-rewievs swiper-slide"
                                                         key={index}>
                                                <div className="slide-rewievs__top">
                                                    <div className="slide-rewievs__ico"><img
                                                        src={e?.user?.picture ? e.user.picture : 'Username'}
                                                        alt=""/>
                                                    </div>
                                                    <div className="slide-rewievs__info">
                                                        <div className="slide-rewievs__name">{e?.user?.username ? e.user.username : 'Username'}</div>
                                                        <div className="slide-rewievs__place">{e?.user?.name ? e.user.name : 'Name'}</div>
                                                    </div>
                                                </div>
                                                <div className="slide-rewievs__text">{e.text}
                                                </div>
                                                <div
                                                    className="slide-rewievs__date">{dayjs(e.date).format('DD.MM.YYYY HH:mm')}</div>
                                            </SwiperSlide>

                                        )
                                    })}
                                </Swiper>


                            </div>
                        </div>
                    </section> : null}

            <section className="links">
                <div className="links__container">
                    <div className="links__body">
                        <a href="#" className="links__item links__item_btn">РЕЙТИНГИ </a>
                        <a href="#" className="links__item">МНЕ НРАВИТСЯ</a>
                        <a href="#" className="links__item">ОТДЕЛ ЗАБОТЫ</a>
                    </div>
                </div>
            </section>

        </main>

    );
};

export default Place;
