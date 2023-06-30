import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper";
import {useToggleFavouritePlaceMutation, useUserFavouritesQuery} from "../redux/place/place.api.js";
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";

const Favourites = ({VITE__API}) => {
    const {user} = useTelegram()
    const {data, isLoading, isError} = useUserFavouritesQuery(user?.id)
    const [toggleFavourite] = useToggleFavouritePlaceMutation()
    const handleToggleFavourite = async (id) => {
        if (!id) {
            try {
                const res = await toggleFavourite({placeId: id, telegramId: user?.id})
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
    }
    if (isLoading) return <p className={'center'}>loading</p>
    if (isError) return <p className={'center'}>error :/</p>
    return (
        <>
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

            <section className="favorite">
                <div className="favorite__container">
                    <div className="favorite__body">
                        <h2 className="favorite__title">ПОНРАВИВШЕЕСЯ ВАМ</h2>
                        <div className="favorite__items">
                            {

                                data.map(e => (
                                    <div className="favorite__item item-favorite">
                                        <div onClick={() => handleToggleFavourite(e?.place._id)}
                                             className="item-favorite_unlike">✛
                                        </div>
                                        <Link to={`/place/${e.place._id}`} className="item-favorite__body">
                                            <div className="item-favorite__image-ibg">
                                                <img
                                                    src={`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`}
                                                    alt=""/>
                                                <div className="item-favorite__labels">
                                                    <button className="item-favorite__label _icon-favorite"></button>
                                                </div>
                                            </div>
                                            <div className="item-favorite__content">

                                                <div className="item-favorite__mark">{e.category.name}</div>
                                                <div className="item-favorite__name">{e.place.name}</div>
                                                <div className="item-favorite__grade grade grade_small">
                                                    <span>{e.place.rating.toFixed(1)}</span></div>
                                                <div className="list-product">
                                                    {!!e?.info?.type?.value ?
                                                        <div
                                                            className="list-product__item _icon-kitchen">{e.info.type.value}
                                                        </div> : <></>
                                                    }
                                                    {
                                                        e?.info?.location?.value ? <div
                                                            className="list-product__item _icon-location">{e.info.location.value}
                                                        </div> : <></>
                                                    }

                                                </div>

                                            </div>
                                        </Link>
                                        <button className="item-favorite__button">Добавьте комментарий</button>
                                        <span className="item-favorite__info">(видно только вам)</span>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default Favourites;
