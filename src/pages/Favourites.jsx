import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper";
import {useToggleFavouritePlaceMutation, useUserFavouritesQuery} from "../redux/place/place.api.js";
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";
import HeroSlider from "../components/HeroSlider.jsx";

const Favourites = ({VITE__API}) => {
    const {user} = useTelegram()
    const {data, isLoading, isError} = useUserFavouritesQuery(user?.id)
    const [toggleFavourite] = useToggleFavouritePlaceMutation()
    const handleToggleFavourite = async (id) => {
        if (!!id) {
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
            <HeroSlider/>
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
                                                <picture>
                                                    <source srcSet={toWebp(`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`)}/>
                                                    <img src={`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`} alt=""/>
                                                </picture>
                                                {/*<img src={`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`}*/}
                                                {/*    alt=""/>*/}
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
                                                    {e?.info?.type?.value ?
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
