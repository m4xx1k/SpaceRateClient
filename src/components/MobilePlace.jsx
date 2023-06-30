import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useFetchCountRatingsQuery} from "../redux/place/place.api.js";
const VITE__API = 'https://api.goodjoy.uz'

const MobilePlace = ({e, i}) => {
    const id = e.place._id
    const {data, error} = useFetchCountRatingsQuery(id)

    return (
        <div className="newtop__item item-newtop">
            <div className="item-newtop__body">
                <div className="item-newtop__name"><Link to={`/place/${id}`}>{i + 1}. {e.place.name}</Link></div>
                <div className="item-newtop__grade grade grade_small"><span>{e.place.rating.toFixed(1)}</span></div>
                <Link to={`/place/${id}`}
                      className="item-newtop__reviews">({!!data && typeof data === 'number' ? data : '-'}) ОТЗЫВЫ</Link>
                <Link to={`/place/${id}`} className="item-newtop__logo"><img  src={`${VITE__API}/places/${e?.photos[0]?.photo}`} alt=""/></Link>
            </div>
            <Link to={`/place/${id}`} className="item-newtop__link _icon-link">Подробнее</Link>
        </div>

// <article key={id} className="ratings__item item-ratings">
        //     <div className="item-ratings__content">
        //         <div className="item-ratings__top">
        //             <Link to={`/place/${id}`}
        //                   className="item-ratings__name">{`${i + 1}. ${e.place.name}`}</Link>
        //             <Link to={`/place/${id}`}
        //                   className="item-ratings__goto _icon-link"></Link>
        //         </div>
        //         <div className="item-ratings__grade">
        //             <div className="grade"><span>{e.place.rating.toFixed(1)}</span></div>
        //             <Link to={`/place/${id}`} className="link">({!!data && typeof data === 'number' ? data : '-'})
        //                 отзывы</Link>
        //         </div>
        //     </div>
        // </article>
    );
};

export default MobilePlace;
