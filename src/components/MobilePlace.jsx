import React from 'react';
import {Link} from "react-router-dom";
import {useFetchCountRatingsQuery, useFindPlaceImagesQuery} from "../redux/place/place.api.js";
import {toWebp} from "../utils.js";

const VITE__API = import.meta.env.VITE__API
const MobilePlace = ({e, i}) => {
    const id = e._id
    const {data} = useFetchCountRatingsQuery(id)

    const {data: photos, isLoading: isLoadingPhotos, isSuccess: isSuccessPhotos} = useFindPlaceImagesQuery(id)

    return (
        <div className="newtop__item item-newtop">
            <div className="item-newtop__body">
                <div className="item-newtop__name">
                    <Link to={`/place/${id}`}>{i + 1}. {e.name}</Link>
                </div>
                <div className="item-newtop__grade grade grade_small">
                    <span>{e.rating.toFixed(1)}</span>
                </div>
                <Link to={`/place/${id}`}
                      className="item-newtop__reviews">
                    ({!!data && typeof data === 'number' ? data : '-'}) ОТЗЫВЫ
                </Link>
                <Link to={`/place/${id}`} className="item-newtop__logo">
                    {isSuccessPhotos && <picture>
                        <source className="item-newtop__logo_img"
                                srcSet={toWebp(`${VITE__API}/places/${photos[0]?.photo}`)}/>
                        <img className="item-newtop__logo_img" src={`${VITE__API}/places/${photos[0]?.photo}`} alt=""/>
                    </picture>}
                </Link>
            </div>
            <Link to={`/place/${id}`} className="item-newtop__link _icon-link">Подробнее</Link>
        </div>

    );
};

export default MobilePlace;
