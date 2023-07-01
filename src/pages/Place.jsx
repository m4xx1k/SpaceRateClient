import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import {
    useFetchAllRatingsQuery,
    useFetchByIdPlaceQuery, useFindUserPlaceRatingMutation, useRatePlaceMutation,
    useToggleFavouritePlaceMutation
} from "../redux/place/place.api.js";
import SwiperCore, {Pagination, Navigation} from 'swiper/core';
import RateForm from "../components/RateForm/RateForm.jsx";
import dayjs from "dayjs";
import {useTelegram} from "../hooks/useTelegram.js";
import {clsx} from 'clsx';
import ReactStars from "react-rating-stars-component";
import {Link, useNavigate} from "react-router-dom";
import {useFindUserMutation} from "../redux/auth/authApiSlice.js";
import {useSelector} from "react-redux";

SwiperCore.use([Pagination, Navigation]);
const Place = ({VITE__API}) => {
    const {id} = useParams()
    const {user, tg} = useTelegram()
    const navigate = useNavigate()
    const {ratingsNames} = useSelector(state => state.place)
    // const [ratings, setRatings] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const {data, isSuccess, isLoading, isError, error: placeError} = useFetchByIdPlaceQuery({
        id,
        telegramId: user?.id
    })
    const [toggleFavourite] = useToggleFavouritePlaceMutation()
    const {data: ratings} = useFetchAllRatingsQuery({
        placeId: id,
        telegramId: user?.id
    })
    const [findUser] = useFindUserMutation()

    const [rating, setRating] = useState(0)
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [findUserRating] = useFindUserPlaceRatingMutation()
    const [ratePlace] = useRatePlaceMutation()
    const ratingChanged = async (newRating) => {
        if (!user) {
            window.location.replace('https://t.me/spaceratebot')
            return
        }

        setIsShow(true);
        setRating(newRating);
    };
    const handleRateSpace = async e => {
        e?.preventDefault()
        const {data} = await findUser({telegramId: user.id})

        if (data) {
            if (text && rating) {
                await ratePlace({telegramId: `${user.id}`, value: rating, placeId: id, text})
                setIsShow(false)
            } else {
                setError('Заполните рейтинг и текст')
            }
        } else navigate('/login')

    }
    useEffect(() => {
        tg.ready()
    }, [])
    useEffect(() => {
        if (isSuccess) {

            setIsLiked(data?.isFavourite)
        }
        // const handleFetchAllRatings = async () => {
        //     const {data} = await fetchRatings({placeId: id})
        //     setRatings(data.ratings)
        // }
        // if (ratings === null) handleFetchAllRatings()
        // console.log({data, isSuccess, isError, placeError})
    }, [data, isSuccess, isError, error])

    const handleToggleFavourite = async () => {
        if (!user) {
            window.location.replace('https://t.me/spaceratebot')
            return
        }
        const {data} = await findUser({telegramId: user.id})

        if (data) {
            try {
                const res = await toggleFavourite({placeId: id, telegramId: user?.id})
                console.log(res)
                setIsLiked(prev => !prev)
            } catch (e) {
                console.log(e)
            }
        } else {
            navigate('/login')
        }

    }

    const swiperRef = useRef();
    if (isLoading) return <p></p>
    if (isError) return <p>error:/</p>
    if (!data || !ratings?.ratings) return <p></p>
    return (<>

            {
                isShow ?
                    <RateForm data={data} placeId={id} text={text} rating={rating} error={error} setError={setError}
                              setIsShow={setIsShow} setText={setText} ratingChanged={ratingChanged}
                              handleRateSpace={handleRateSpace}/>
                    : <>
                        <section className="restaurant">
                            <div className="restaurant__container">
                                <div className="restaurant__body">
                                    <div className="restaurant__top">
                                        <h1 className="restaurant__title">{data?.place?.name}</h1>
                                        <div className="restaurant__grade grade-restaurant">
                                            <span>{ratingsNames[!rating ? 0 : Math.ceil(data.place.rating) - 1].toUpperCase()}</span>
                                            <div className="grade-restaurant__rating rating">
                                                <div className="rating__body">
                                                    <div className="rating__active"></div>
                                                    <div className="rating__items">
                                                        <input type="radio" className="rating__item" value="1"
                                                               name="rating"/>
                                                        <input type="radio" className="rating__item" value="2"
                                                               name="rating"/>
                                                        <input type="radio" className="rating__item" value="3"
                                                               name="rating"/>
                                                        <input type="radio" className="rating__item" value="4"
                                                               name="rating"/>
                                                        <input type="radio" className="rating__item" value="5"
                                                               name="rating"/>
                                                    </div>
                                                </div>
                                                {/*<span className={'rating__star'}>★</span>*/}
                                                <div className="rating__value">{data.place.rating.toFixed(1)}</div>
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
                                                <img src={`${VITE__API}/places/${e.photo}`} alt={e.photo}/>
                                            </SwiperSlide>))}
                                        </Swiper>

                                        <div className="slider-restaurant__pagination pagination"></div>
                                        <div className="slider-restaurant__navigation navigation">
                                            <button className="navigation__button button-prev"></button>
                                            <button className="navigation__button button-next"></button>
                                        </div>
                                    </div>

                                    <div className="restaurant__bottom">
                                        <button onClick={handleToggleFavourite}
                                                className={clsx("restaurant__like", isLiked && "restaurant__liked", "_icon-favorite")}>МНЕ
                                            НРАВИТСЯ
                                        </button>
                                        <div className="restaurant__social social">
                                            {
                                                data?.info?.email?.value ?
                                                    <a rel={'nofollow'} target={'_blank'} href={data.info.email.value}
                                                       className="social__link _icon-vk"></a>
                                                    : <></>
                                            }
                                            {data?.info?.tg?.value
                                                ?
                                                <a rel={'nofollow'} target={'_blank'} href={data.info.tg.value}
                                                   className="social__link _icon-telegram"></a>
                                                : <></>
                                            }
                                            {data?.info?.fb?.value
                                                ?
                                                <a rel={'nofollow'} target={'_blank'} href={data.info.fb.value}
                                                   className="social__link _icon-facebook"></a>
                                                : <></>
                                            }
                                            {data?.info?.inst?.value
                                                ?
                                                <a rel={'nofollow'} target={'_blank'} href={data.info.inst.value}
                                                   className="social__link _icon-instagram"></a>
                                                : <></>
                                            }


                                        </div>
                                    </div>
                                    <div className="restaurant__hide">
                                        <button onClick={() => setIsShow(true)} className="rewievs__btn _icon-comment">
                                            <span>ОСТАВИТЬ ОТЗЫВ</span></button>
                                        <div className="rating rating_lite rating_set">
                                            <ReactStars
                                                count={5}
                                                onChange={ratingChanged}
                                                size={32}
                                                activeColor="#ffd700"
                                                value={rating}
                                            />
                                            <div className="rating__value"></div>
                                        </div>

                                    </div>

                                    <div className="restaurant__description description-restaurant">
                                        <div className="description-restaurant__title">ОПИСАНИЕ:</div>
                                        <div className="description-restaurant__body">
                                            <div className="description-restaurant__text">
                                                {data.place.description}
                                            </div>
                                            <div className="description-restaurant__list list-product">


                                                {data?.info?.price?.value
                                                    ?
                                                    <div className="list-product__item _icon-ruble">
                                                        {data.info.price.value}
                                                    </div>
                                                    : <></>
                                                }{data?.info?.time?.value
                                                ?
                                                <div className="list-product__item _icon-time">
                                                    {data.info.time.value}
                                                </div>
                                                : <></>
                                            }{data?.info?.location?.value
                                                ?
                                                <div
                                                    className="list-product__item _icon-location">
                                                    {data.info.location.value}
                                                </div>
                                                : <></>
                                            }{data?.info?.type?.value
                                                ?
                                                <div className="list-product__item _icon-kitchen">
                                                    {data.info.type.value}
                                                </div>
                                                : <></>
                                            }{data?.info?.email?.value
                                                ?
                                                <a href={`mailto:${data.info.email.value}`}
                                                   className="list-product__item _icon-mail">{data.info.email.value}</a>
                                                : <></>
                                            }{data?.info?.site?.value
                                                ?
                                                <a href={`${data.info.site.value}`}
                                                   className="list-product__item _icon-mail">{data.info.site.value}</a>
                                                : <></>
                                            }{data?.info?.telephone?.value
                                                ?
                                                <a href={`tel:${data.info.telephone.value}`}
                                                   className="list-product__item _icon-phone">{data.info.telephone.value}</a>

                                                : <></>
                                            }


                                                <div className="description-restaurant__social social">
                                                    {data?.info?.tg?.value
                                                        ?
                                                        <a href={data.info.tg.value} className="social__link _icon-vk"></a>

                                                        : <></>
                                                    }
                                                    {data?.info?.tg?.value
                                                        ?
                                                        <a href={data.info.tg.value}
                                                           className="social__link _icon-telegram"></a>
                                                        : <></>
                                                    }
                                                    {data?.info?.fb?.value
                                                        ?
                                                        <a href={data.info.fb.value}
                                                           className="social__link _icon-facebook"></a>

                                                        : <></>
                                                    }
                                                    {data.info?.inst?.value
                                                        ?
                                                        <a href={data.info.inst.value}
                                                           className="social__link _icon-instagram"></a>
                                                        : <></>
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </section>
                        {
                            !!ratings?.ratings?.length && ratings.ratings.length > 0 ?
                                <section className="rewievs">
                                    <div className="rewievs__container">
                                        <div className="rewievs__body">
                                            <div className="rewievs__top">
                                                <h2 className="rewievs__title">ОТЗЫВЫ:</h2>
                                                <div className="rewievs__control">
                                                    <button className="none rewievs__btn _icon-comment">
                                                        <span>ОСТАВИТЬ ОТЗЫВ</span>
                                                    </button>
                                                    <div
                                                        className="rewievs__navigation navigation navigation_small navigation_black">
                                                        {/*<button onClick={() => swiperRef.current.slidePrev()}*/}
                                                        {/*        className="navigation__button button-prev"></button>*/}
                                                        {/*<button onClick={() => swiperRef.current.slideNext()}*/}
                                                        {/*        className="navigation__button button-next"></button>*/}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={'rewievs__list'}>
                                                {ratings.ratings.map((e, index) => {
                                                    // const {data} = await fetchRatings({placeId: id})
                                                    // const e = data.ratings[index]
                                                    return (
                                                        // <div className="swiper-slide" key={index}>
                                                        //     <ReviewSlide key={e._id} e={e} index={index}/>
                                                        // </div>
                                                        <div
                                                            className="rewievs__list_item slider-rewievs__slide slide-rewievs swiper-slide"
                                                            key={index}>
                                                            <div className="slide-rewievs__top">
                                                                <div className="slide-rewievs__ico"><img
                                                                    src={e?.user?.picture ? e.user.picture : 'Username'}
                                                                    alt=""/>
                                                                </div>
                                                                <div className="slide-rewievs__info">
                                                                    <div
                                                                        className="slide-rewievs__name">{e?.user?.username ? e.user.username : 'Username'}</div>
                                                                    <div
                                                                        className="slide-rewievs__place">{e?.user?.name ? e.user.name : 'Name'}</div>
                                                                </div>
                                                            </div>
                                                            <div className="slide-rewievs__text">{e.text}
                                                            </div>
                                                            <div
                                                                className="slide-rewievs__date">{dayjs(e.date).format('DD.MM.YYYY HH:mm')}</div>
                                                        </div>

                                                    )
                                                })}

                                            </div>
                                            {/*<Swiper*/}
                                            {/*    pagination={{clickable: true}}*/}
                                            {/*    navigation={true}*/}
                                            {/*    breakpoints={{*/}
                                            {/*        320: {*/}
                                            {/*            slidesPerView: 1, spaceBetween: 10,*/}
                                            {/*        }, 768: {*/}
                                            {/*            slidesPerView: 1.5, spaceBetween: 40,*/}
                                            {/*        }, 992: {*/}
                                            {/*            slidesPerView: 2, spaceBetween: 40,*/}
                                            {/*        }, 1268: {*/}
                                            {/*            slidesPerView: 2, spaceBetween: 60,*/}
                                            {/*        },*/}
                                            {/*    }}*/}
                                            {/*    onSwiper={(swiper) => {*/}
                                            {/*        swiperRef.current = swiper;*/}
                                            {/*    }}*/}

                                            {/*    className="rewievs__slider slider-rewievs swiper slider-rewievs__wrapper swiper-wrapper"*/}
                                            {/*>*/}

                                            {/*</Swiper>*/}


                                        </div>
                                    </div>
                                </section>
                                :
                                null}
                    </>
            }


        </>
    );
};

export default Place;
