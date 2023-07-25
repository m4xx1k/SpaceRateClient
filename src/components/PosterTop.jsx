import React, {useState} from 'react';
import {clsx} from "clsx";
import {Link, useLocation} from "react-router-dom";
import {useFindAllEventTypesQuery} from "../redux/event/event.api.js";
import {useParams} from "react-router";

const PosterTop = () => {
    const {data:types} = useFindAllEventTypesQuery()
    const [menu, setMenu]=useState(false)
    const {pathname} = useLocation()
    const {name} = useParams()
    return (
        <div className="poster__top">
            {/*<a href="#" className="poster__back">НАЗАД</a>*/}
            <button onClick={()=>setMenu(prev=>!prev)} className={clsx("poster__button","_icon-arrow-bottom", menu && 'active')}>СОБЫТИЯ</button>
            <div className="poster__label">{pathname!=='/movies'? name:"КИНО"}</div>
            <ul className={clsx("poster__list", menu && 'active')}>
                <Link to={`/movies`} className={clsx("poster__item", pathname==='/movies'&&'active')}>КИНО</Link>

                {
                    types?.map(type=>(
                        type.name!=='movie'&& <Link to={`/events/${type._id}/${type.name.replaceAll(' ','_')}`} className={clsx("poster__item",type.name.toLowerCase() ===name?.replaceAll('_',' ').toLowerCase() &&"active")}>{type.name}</Link>

                    ))
                }
                <div className="poster__list-close"></div>
            </ul>
        </div>

    );
};

export default PosterTop;
