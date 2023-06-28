import React from 'react';
import {Link} from "react-router-dom";
const VITE__API = 'https://spacerateserver-production.up.railway.app'

const PlaceItem = ({id, info, e}) => {
    return (
        <article key={id}
                 className="ratings__item item-ratings">
            <div className="item-ratings__content">
                <div className="item-ratings__top">
                    <Link to={`/place/${id}`}
                          className="item-ratings__name">{e.place.name}</Link>
                    <div className="item-ratings__grade">
                        <div className="grade">
                            {/*ИДЕАЛЬНО */}
                            <span>{e.place.rating?.toFixed(1)}</span></div>
                        <Link to={`/place/${id}`}
                              className="link">читать все отзывы</Link>
                    </div>
                </div>
                <div className="item-ratings__text">{
                    e.place.description
                }
                </div>
                <div className="item-ratings__bottom">
                    <div className="item-ratings__list list-product">
                        <div
                            className="list-product__item _icon-ruble">{info.price.value}</div>
                        <div
                            className="list-product__item _icon-location">{info.location.value}</div>
                        <div className="list-product__item _icon-kitchen">{info.type.value}
                        </div>
                    </div>
                    <Link to={`/place/${id}`}
                          className="item-ratings__goto _icon-link"></Link>
                </div>
            </div>
            <div className="item-ratings__image-ibg">
                <Link to={`/place/${id}`}>


                    <img
                        src={`${VITE__API}/places/${e.photos[0].photo}`}
                        alt=""/></Link>
                <button className="item-ratings__favorite _icon-favorite"></button>
            </div>
        </article>
    );
};

export default PlaceItem;
