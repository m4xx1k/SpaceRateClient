import React from 'react';
import {Link} from "react-router-dom";
import {toWebp} from "../utils.js";
import {useFindPlaceImagesQuery, useFindPlaceInfosQuery} from "../redux/place/place.api.js";

const VITE__API = import.meta.env.VITE__API
const infos = [
    {
        icon: 'ruble',
        name: 'price'
    },
    {
        icon: 'location',
        name: 'location'
    },
    {
        icon: 'kitchen',
        name: 'type'
    }
]
const PlaceItem = ({id, e}) => {
    const {data:info,isLoading, isSuccess} = useFindPlaceInfosQuery(id)
    const {data:photos, isSuccess:isSuccessPhotos} = useFindPlaceImagesQuery(id)
    return (
        <article key={id}
                 className="ratings__item item-ratings">
            <div className="item-ratings__content">
                <div className="item-ratings__top">
                    <Link to={`/place/${id}`}
                          className="item-ratings__name">{e.name}</Link>
                    <div className="item-ratings__grade">
                        <div className="grade">
                            {/*ИДЕАЛЬНО */}
                            <span>{e.rating?.toFixed(1)}</span></div>
                        <Link to={`/place/${id}`}
                              className="link">читать все отзывы</Link>
                    </div>
                </div>
                <div className="item-ratings__text">{
                    e.description
                }
                </div>
                <div className="item-ratings__bottom">
                    <div className="item-ratings__list list-product">
                        {
                           !isLoading && isSuccess && infos.map(elem => {
                                if (info[elem.name]?.value) {
                                    return <div
                                        className={`list-product__item _icon-${elem.icon}`}
                                        key={elem.name}>
                                        {info[elem.name].value}
                                    </div>
                                }
                            })
                        }

                    </div>
                    <Link to={`/place/${id}`}
                          className="item-ratings__goto _icon-link"></Link>
                </div>
            </div>
            <div className="item-ratings__image-ibg">
                <Link to={`/place/${id}`}>
                    {
                        isSuccessPhotos && (
                            <picture >
                                <source   srcSet={toWebp(`${VITE__API}/places/${photos[0]?.photo}`)}/>
                                <img loading="lazy"  src={`${VITE__API}/places/${photos[0]?.photo}`} alt=""/>
                            </picture>
                        )
                    }

                </Link>
                <button className="item-ratings__favorite _icon-favorite"></button>
            </div>
        </article>
    );
};

export default PlaceItem;
