import {useToggleFavouritePlaceMutation, useUserFavouritesQuery} from "../redux/place/place.api.js";
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";
import HeroSlider from "../components/HeroSlider.jsx";
import {toWebp} from "../utils.js";
import {useToggleFavouriteEventMutation, useUserEventFavouritesQuery} from "../redux/event/event.api.js";

const VITE__API = import.meta.env.VITE__API
const Favourites = () => {
    // const {user} = useTelegram()
    const user = {id: '466439009'}
    const {data:places, isLoading, isError} = useUserFavouritesQuery(user?.id)
    const {data:events, isLoading:isLoadingEvents, isError:isErrorEvents} = useUserEventFavouritesQuery(user?.id)
    console.log({events})
    const [togglePlaceFavourite] = useToggleFavouritePlaceMutation()
    const [toggleEventFavourite] = useToggleFavouriteEventMutation()
    const handleTogglePlaceFavourite = async (id) => {
        if (id) {
            try {
                await togglePlaceFavourite({placeId: id, telegramId: user?.id})
            } catch (e) {
                console.log(e)
            }
        }
    }
    const handleToggleEventFavourite = async (id) => {
        if (id) {
            try {
                await toggleEventFavourite({eventId: id, telegramId: user?.id})
            } catch (e) {
                console.log(e)
            }
        }
    }
    if (isError || isErrorEvents) return <p className={'center'}>error :/</p>
    return (
        <>
            <HeroSlider/>
            <section className="favorite">
                <div className="favorite__container">
                    <div className="favorite__body">
                        <h2 className="favorite__title">ПОНРАВИВШЕЕСЯ ВАМ</h2>
                        <div className="favorite__items">
                            {
                                !isLoading && Array.isArray(places) ? places.map(e => (
                                        <div key={e?.place._id} className="favorite__item item-favorite">
                                            <div onClick={() => handleTogglePlaceFavourite(e?.place._id)}
                                                 className="item-favorite_unlike">✛
                                            </div>
                                            <Link to={`/place/${e.place._id}`} className="item-favorite__body">
                                                <div className="item-favorite__image-ibg">
                                                    <picture>
                                                        <source
                                                            srcSet={toWebp(`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`)}/>
                                                        <img
                                                            src={`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`}
                                                            alt=""/>
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

                                    )) :
                                    <>
                                        <div style={{width:'90vw',height:202}} className="skeleton-loading"></div>
                                        <div style={{width:'90vw',height:202}} className="skeleton-loading"></div>
                                    </>
                            } {
                                !isLoadingEvents && Array.isArray(events) ? events.map(e => {
                                    console.log({event:e})
                                    return <div key={e?._id} className="favorite__item item-favorite">
                                            <div onClick={() => handleToggleEventFavourite(e?._id)}
                                                 className="item-favorite_unlike">✛
                                            </div>
                                            <Link to={`/event/${e._id}`} className="item-favorite__body">
                                                <div className="item-favorite__image-ibg">
                                                    <picture>
                                                        <source
                                                            srcSet={toWebp(`${VITE__API}/events/${e?.photos?.length ? e.photos[0]?.photo : ''}`)}/>
                                                        <img
                                                            src={`${VITE__API}/events/${e?.photos?.length ? e.photos[0]?.photo : ''}`}
                                                            alt=""/>
                                                    </picture>
                                                    {/*<img src={`${VITE__API}/places/${e?.photos?.length ? e.photos[0]?.photo : ''}`}*/}
                                                    {/*    alt=""/>*/}
                                                    <div className="item-favorite__labels">
                                                        <button className="item-favorite__label _icon-favorite"></button>
                                                    </div>
                                                </div>
                                                <div className="item-favorite__content">

                                                    <div className="item-favorite__mark">{e.type?.name}</div>
                                                    <div className="item-favorite__name">{e.name}</div>
                                                    <div className="item-favorite__grade grade grade_small">
                                                        {/*<span>{e.place.rating.toFixed(1)}</span></div>*/}
                                                        {/*<div className="list-product">*/}
                                                        {/*    {e?.info?.type?.value ?*/}
                                                        {/*        <div*/}
                                                        {/*            className="list-product__item _icon-kitchen">{e.info.type.value}*/}
                                                        {/*        </div> : <></>*/}
                                                        {/*    }*/}
                                                        {/*    {*/}
                                                        {/*        e?.info?.location?.value ? <div*/}
                                                        {/*            className="list-product__item _icon-location">{e.info.location.value}*/}
                                                        {/*        </div> : <></>*/}
                                                        {/*    }*/}

                                                    </div>

                                                </div>
                                            </Link>
                                            <button className="item-favorite__button">Добавьте комментарий</button>
                                            <span className="item-favorite__info">(видно только вам)</span>
                                        </div>

                                    }) :
                                    <>
                                        <div style={{width:'90vw',height:202}} className="skeleton-loading"></div>
                                        <div style={{width:'90vw',height:202}} className="skeleton-loading"></div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </section>


        </>

    );
};

export default Favourites;
