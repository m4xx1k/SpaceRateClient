import React from 'react';
import {useFindAllEventTypesQuery} from "../redux/event/event.api.js";
import {Link} from "react-router-dom";

const EventTypes = () => {
    const {data:types} = useFindAllEventTypesQuery()
    return (
        <section className="events-poster">
            <div className="events-poster__container">
                <div className="events-poster__body">
                    <div className="events-poster__top">
                        <a href="#" className="events-poster__back">НАЗАД</a>
                    </div>
                    {/*<div className="events-poster__slider">*/}
                    {/*    <div className="events-poster__wrapper swiper-wrapper">*/}
                    {/*        <a href="#" className="events-poster__slide slide-events-poster swiper-slide">*/}
                    {/*            <div className="slide-events-poster__img-ibg"><img loading="lazy"  src="@img/events-poster/01.jpg"*/}
                    {/*                                                               alt=""/></div>*/}
                    {/*            <div className="slide-events-poster__content">*/}
                    {/*                <div className="slide-events-poster__top">*/}
                    {/*                    <div className="slide-events-poster__rate">ТОП 10</div>*/}
                    {/*                    <div className="slide-events-poster__number">№1</div>*/}
                    {/*                    <div className="slide-events-poster__grade grade"><span>9,9</span></div>*/}
                    {/*                </div>*/}
                    {/*                <div className="slide-events-poster__bottom">*/}
                    {/*                    <div className="slide-events-poster__title">Искусство «Манга»</div>*/}
                    {/*                    <div className="slide-events-poster__inner">*/}
                    {/*                        <div className="slide-events-poster__date">*/}
                    {/*                            <span>До 3 сентября</span>*/}
                    {/*                            <span>Севкабель Порт</span>*/}
                    {/*                        </div>*/}
                    {/*                        <div className="slide-events-poster__mark">ВЫСТАВКА</div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*    <div className="events-poster__pagination pagination"></div>*/}
                    {/*</div>*/}
                </div>
                <h3 className="events-poster__title">Афиша событий города</h3>
                <ul className="events-poster__items">
                    {/*<li className="events-poster__item"><Link to="/movies" className="events-poster__link _icon-link">Кино</Link>*/}
                    {/*</li>*/}
                    {
                       types?.length && types.map(type=> {
                           const {name} = type
                           if(name!=='movie'){
                               return <li key={name} className="events-poster__item">
                                   <Link to={`/events/${type._id}/${type.name}`} className="events-poster__link _icon-link">{name}</Link>
                               </li>
                           }
                        })

                    }
                </ul>
            </div>
        </section>
    );
};

export default EventTypes;
