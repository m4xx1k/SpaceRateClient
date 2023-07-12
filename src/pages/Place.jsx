    import React, {useEffect, useRef, useState} from 'react';
    import {useParams} from "react-router";
    import {Swiper, SwiperSlide} from "swiper/react";
    import {
        useFetchAllRatingsQuery,
        useFetchByIdPlaceQuery,
        useFindPlaceImagesQuery,
        useFindPlaceInfosQuery,
        useFindPlaceMainByIdQuery,
        useRatePlaceMutation,
        useToggleFavouritePlaceMutation
    } from "../redux/place/place.api.js";
    import SwiperCore, {Pagination, Navigation} from 'swiper/core';
    import RateForm from "../components/RateForm/RateForm.jsx";
    import dayjs from "dayjs";
    import {useTelegram} from "../hooks/useTelegram.js";
    import {clsx} from 'clsx';
    import ReactStars from "react-rating-stars-component";
    import {useNavigate} from "react-router-dom";
    import {useFindUserMutation} from "../redux/auth/authApiSlice.js";
    import {useSelector} from "react-redux";
    import {toWebp} from "../utils.js";

    SwiperCore.use([Pagination, Navigation]);
    const infosElements = [
        {
            icon: 'ruble',
            name: 'price'
        },
        {
            icon: 'time',
            name: 'time'
        },
        {
            icon: 'location',
            name: 'location'
        }, {
            icon: 'kitchen',
            name: 'type'
        }
    ]
    const socials = [
        {
            name: 'tg',
            icon: 'telegram'
        },
        {
            name: 'fb',
            icon: 'facebook'
        },
        {
            name: 'inst',
            icon: 'instagram'
        },
    ]
    const PhotosSlider = ({id}) => {
        const {data: photos, isLoading: isLoadingPhotos, isSuccess: isSuccessPhotos} = useFindPlaceImagesQuery(id)
        return (<div className="restaurant__slider slider-restaurant">
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

                    {(isSuccessPhotos && !isLoadingPhotos) ? photos.map((e, index) => (
                            <SwiperSlide key={index}
                                         className="restaurant__slide slide-restaurant-ibg swiper-slide">
                                <picture>
                                    <source srcSet={toWebp(`${VITE__API}/places/${e.photo}`)}/>
                                    <img
                                        src={`${VITE__API}/places/${e.photo}`}
                                        alt={`${VITE__API}/places/${e.photo}`}/>
                                    {/*<img src="https://via.placeholder.com/374" alt=""/>*/}
                                </picture>

                            </SwiperSlide>
                        ))
                        :
                        <SwiperSlide className="restaurant__slide slide-restaurant-ibg-loading swiper-slide">
                            <></>
                        </SwiperSlide>
                    }
                </Swiper>

                <div className="slider-restaurant__pagination pagination"></div>
                <div className="slider-restaurant__navigation navigation">
                    <button className="navigation__button button-prev"></button>
                    <button className="navigation__button button-next"></button>
                </div>
            </div>
        )
    }
    const Reviews = ({placeId, userId}) => {
        const {data, isLoading, isSuccess} = useFetchAllRatingsQuery({
            placeId,
            telegramId: userId
        })
        return (

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
                                </div>
                            </div>
                        </div>
                        <div className={'rewievs__list'}>
                            {
                                (!isLoading && isSuccess) ? data.ratings.map((e, index) => {
                                        return (
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
                                    })
                                    :

                                    <>
                                        <div
                                            className="rewievs__list_item-loading slider-rewievs__slide slide-rewievs swiper-slide"></div>
                                        <div
                                            className="rewievs__list_item-loading slider-rewievs__slide slide-rewievs swiper-slide"></div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </section>


        )
    }

    const VITE__API = import.meta.env.VITE__API

    const Place = () => {
        const {id} = useParams()
        const {user, tg} = useTelegram()
        const navigate = useNavigate()
        const {ratingsNames} = useSelector(state => state.place)
        const [isLiked, setIsLiked] = useState(false)
        const {data: place, isSuccess, isLoading, isError, error: placeError} = useFindPlaceMainByIdQuery({
            id,
            telegramId: user?.id
        })
        const {data: infos, isLoading: isLoadingInfos, isSuccess: isSuccessInfos} = useFindPlaceInfosQuery(id)

        const [toggleFavourite] = useToggleFavouritePlaceMutation()

        const [findUser] = useFindUserMutation()

        const [rating, setRating] = useState(0)
        const [text, setText] = useState('')
        const [error, setError] = useState('')
        const [isShow, setIsShow] = useState(false)
        const [ratePlace] = useRatePlaceMutation()
        const ratingChanged = async (newRating = 0) => {
            const user = {id:'466439009'}
            if (!user) {
                window.location.replace('https://t.me/goodjoyuz_bot')
                return
            }
            const {data: isUserLogged} = await findUser({telegramId: user.id})
            if (isUserLogged) {
                setIsShow(true);
                if (newRating) setRating(newRating);
            } else {
                navigate('/login')
            }

        };
        const handleRateSpace = async e => {
            e?.preventDefault()
            const {data: isUserLogged} = await findUser({telegramId: user.id})

            if (isUserLogged) {
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
                if (isSuccess) setIsLiked(place?.isFavourite)
            }, [place, isSuccess]
        )

        const handleToggleFavourite = async () => {
            if (!user) {
                window.location.replace('https://t.me/goodjoyuz_bot')
                return
            }
            const {data} = await findUser({telegramId: user.id})

            if (data) {
                try {
                    await toggleFavourite({placeId: id, telegramId: user?.id})
                    setIsLiked(prev => !prev)
                } catch (e) {
                    console.log(e)
                }
            } else {
                navigate('/login')
            }

        }

        if (isError) return <p>error:/</p>
        if (!place || !isSuccessInfos || !isSuccess) return <p></p>
        return (<>

                {
                    isShow ?
                        <RateForm data={place} placeId={id} text={text} rating={rating}
                                  error={error}
                                  setError={setError}
                                  info={infos}
                                  setIsShow={setIsShow} setText={setText} ratingChanged={ratingChanged}
                                  handleRateSpace={handleRateSpace}/>
                        : <>
                            <section className="restaurant">
                                <div className="restaurant__container">
                                    <div className="restaurant__body">
                                        <div className="restaurant__top">
                                            <h1 className="restaurant__title">{place?.name}</h1>
                                            <div className="restaurant__grade grade-restaurant">

                                                <span>
                                                    {place.rating ?

                                                        ratingsNames[Math.ceil(place.rating) - 1].toUpperCase()
                                                        : '-'
                                                    }
                                                </span>
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
                                                    <div className="rating__value">{place.rating.toFixed(1)}</div>
                                                </div>

                                            </div>
                                        </div>

                                        <PhotosSlider id={id}/>

                                        <div className="restaurant__bottom">
                                            <button onClick={handleToggleFavourite}
                                                    className={clsx("restaurant__like", isLiked && "restaurant__liked", "_icon-favorite")}>МНЕ
                                                НРАВИТСЯ
                                            </button>
                                            <div className="restaurant__social social">
                                                {
                                                    isSuccessInfos && socials.map(elem => {
                                                        if (infos[elem.name]?.value) {
                                                            return <a target={'_blank'} rel={'noreferrer'} key={elem.name}
                                                                      href={infos[elem.name].value}
                                                                      className={`social__link _icon-${elem.icon}`}></a>

                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="restaurant__hide">
                                            <button onClick={() => ratingChanged(0)} className="rewievs__btn _icon-comment">
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
                                                    {place.description}
                                                </div>
                                                <div className="description-restaurant__list list-product">
                                                    {
                                                        !isLoadingInfos ?
                                                            <>
                                                                {
                                                                    infosElements.map(elem => {
                                                                        if (infos[elem.name]?.value) {
                                                                            return <div
                                                                                className={`list-product__item _icon-${elem.icon}`}
                                                                                key={elem.name}>
                                                                                {infos[elem.name].value}
                                                                            </div>
                                                                        }
                                                                    })
                                                                }

                                                                {infos?.email?.value
                                                                    &&
                                                                    <a href={`mailto:${infos.email.value}`}
                                                                       className="list-product__item _icon-mail">{infos.email.value}</a>
                                                                }
                                                                {infos?.site?.value
                                                                    &&
                                                                    <a href={`${infos.site.value}`}
                                                                       className="list-product__item _icon-mail">{infos.site.value}</a>
                                                                }
                                                                {infos?.telephone?.value
                                                                    &&
                                                                    <a href={`tel:${infos.telephone.value}`}
                                                                       className="list-product__item _icon-phone">{infos.telephone.value}</a>

                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                <div className={'list-product__item-loading'}></div>
                                                                <div className={`list-product__item-loading`}></div>
                                                                <div className={`list-product__item-loading`}></div>

                                                            </>
                                                    }


                                                    <div className="description-restaurant__social social">

                                                        {
                                                            socials.map(elem => {
                                                                if (infos[elem.name]?.value) {
                                                                    return <a key={elem.name}
                                                                              href={infos[elem.name].value}
                                                                              className={`social__link _icon-${elem.icon}`}></a>
                                                                }
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </section>
                            <Reviews placeId={id} userId={user?.id}/>

                        </>
                }


            </>
        );
    };

    export default Place;
