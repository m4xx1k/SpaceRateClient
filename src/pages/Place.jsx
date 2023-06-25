import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import {useFetchByIdPlaceQuery} from "../redux/place/place.api.js";
import SwiperCore, {Pagination, Navigation} from 'swiper/core';

SwiperCore.use([Pagination, Navigation]);
const Place = () => {
    const {id} = useParams()
    const {data, isSuccess, isError, error} = useFetchByIdPlaceQuery(id)
    const [info, setInfo] = useState({})
    useEffect(() => {
            console.log(data)
            if (isSuccess) {
                let info = {}
                data.info.forEach(e => info[e.name] = e.value)
                setInfo(info)
                console.log(info)
            }
            console.log({data, isSuccess, isError, error})
        },
        [data, isSuccess, isError, error]
    )
    if (!data) return null
    return (
        <main className="page">

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
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 40,
                                    },
                                    992: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    1268: {
                                        slidesPerView: 2,
                                        spaceBetween: 60,
                                    },
                                }}
                                className="restaurant__slider slider-restaurant"
                            >

                                {data.photos.map((e, index) => (
                                    <SwiperSlide key={index}
                                                 className="restaurant__slide slide-restaurant-ibg swiper-slide">
                                        <img src={`${import.meta.env.VITE__API}/places/${e.photo}`} alt={e.photo}/>
                                    </SwiperSlide>
                                ))}
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

                        <div className="restaurant__hide">
                            <button className="rewievs__btn _icon-comment"><span>ОСТАВИТЬ ОТЗЫВ</span></button>
                            <div className="rating rating_lite rating_set">
                                <div className="rating__body">
                                    <div className="rating__active"></div>
                                    <div className="rating__items">
                                        <input type="radio" className="rating__item" value="1" name="rating"/>
                                        <input type="radio" className="rating__item" value="2" name="rating"/>
                                        <input type="radio" className="rating__item" value="3" name="rating"/>
                                        <input type="radio" className="rating__item" value="4"
                                               name="rating"/>
                                        <input type="radio" className="rating__item" value="5"
                                               name="rating"/>
                                    </div>
                                </div>
                                <div className="rating__value"></div>
                            </div>
                        </div>

                        <div className="restaurant__description description-restaurant">
                            <div className="description-restaurant__title">ОПИСАНИЕ:</div>
                            <div className="description-restaurant__body">
                                <div className="description-restaurant__text">
                                    {
                                        data.place.description
                                    }
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

                    </div>
                </div>
            </section>

            <section className="rewievs">
                <div className="rewievs__container">
                    <div className="rewievs__body">
                        <div className="rewievs__top">
                            <h2 className="rewievs__title">ОТЗЫВЫ:</h2>
                            <div className="rewievs__control">
                                <button className="rewievs__btn _icon-comment"><span>ОСТАВИТЬ ОТЗЫВ</span></button>
                                <div className="rewievs__navigation navigation navigation_small navigation_black">
                                    <button className="navigation__button button-prev"></button>
                                    <button className="navigation__button button-next"></button>
                                </div>
                            </div>
                        </div>

                        <div className="rewievs__slider slider-rewievs swiper">
                            <div className="slider-rewievs__wrapper swiper-wrapper">
                                <div className="slider-rewievs__slide slide-rewievs swiper-slide">
                                    <div className="slide-rewievs__top">
                                        <div className="slide-rewievs__ico"><img src="@img/rewievs/01.png" alt=""/>
                                        </div>
                                        <div className="slide-rewievs__info">
                                            <div className="slide-rewievs__name">Сергей Ремезов</div>
                                            <div className="slide-rewievs__place">БЛОГЕР</div>
                                        </div>
                                    </div>
                                    <div className="slide-rewievs__text">Сет морепродуктов. Много маленьких квадратиков
                                        с разными морскими гадами. Аттракцион. Симпатично. Ассорти тако все по 2.
                                        Вкусно, но опять-таки больше развлечение, чем еда. Лапша с говядиной-супер.
                                        Остро, ароматно, идеально. Чизкейк. Вау. Супчик-огонь. Ганаш-красота и сладость.
                                        Лимонады в красивых бутылках. Цены доступные. Рекомендую.
                                    </div>
                                    <div className="slide-rewievs__date">3 мая 2023</div>
                                </div>
                                <div className="slider-rewievs__slide slide-rewievs swiper-slide">
                                    <div className="slide-rewievs__top">
                                        <div className="slide-rewievs__ico"><img src="@img/rewievs/02.png" alt=""/>
                                        </div>
                                        <div className="slide-rewievs__info">
                                            <div className="slide-rewievs__name">Гостья Заведения</div>
                                            <div className="slide-rewievs__place">ГУРМАН</div>
                                        </div>
                                    </div>
                                    <div className="slide-rewievs__text">Это были самые божественные боул и тартар,
                                        которые пробовала! Невероятно вкусно! И огромное спасибо девушкам-официанткам за
                                        подачу. Очень красиво рассказывали и советовали чем и как есть. Надеюсь к вам
                                        скоро вернуться!
                                    </div>
                                    <div className="slide-rewievs__date">13 июня 2023</div>
                                </div>
                                <div className="slider-rewievs__slide slide-rewievs swiper-slide">
                                    <div className="slide-rewievs__top">
                                        <div className="slide-rewievs__ico"><img src="@img/rewievs/01.png" alt=""/>
                                        </div>
                                        <div className="slide-rewievs__info">
                                            <div className="slide-rewievs__name">Сергей Ремезов</div>
                                            <div className="slide-rewievs__place">БЛОГЕР</div>
                                        </div>
                                    </div>
                                    <div className="slide-rewievs__text">Сет морепродуктов. Много маленьких квадратиков
                                        с разными морскими гадами. Аттракцион. Симпатично. Ассорти тако все по 2.
                                        Вкусно, но опять-таки больше развлечение, чем еда. Лапша с говядиной-супер.
                                        Остро, ароматно, идеально. Чизкейк. Вау. Супчик-огонь. Ганаш-красота и сладость.
                                        Лимонады в красивых бутылках. Цены доступные. Рекомендую.
                                    </div>
                                    <div className="slide-rewievs__date">3 мая 2023</div>
                                </div>
                                <div className="slider-rewievs__slide slide-rewievs swiper-slide">
                                    <div className="slide-rewievs__top">
                                        <div className="slide-rewievs__ico"><img src="@img/rewievs/02.png" alt=""/>
                                        </div>
                                        <div className="slide-rewievs__info">
                                            <div className="slide-rewievs__name">Гостья Заведения</div>
                                            <div className="slide-rewievs__place">ГУРМАН</div>
                                        </div>
                                    </div>
                                    <div className="slide-rewievs__text">Это были самые божественные боул и тартар,
                                        которые пробовала! Невероятно вкусно! И огромное спасибо девушкам-официанткам за
                                        подачу. Очень красиво рассказывали и советовали чем и как есть. Надеюсь к вам
                                        скоро вернуться!
                                    </div>
                                    <div className="slide-rewievs__date">13 июня 2023</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

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
