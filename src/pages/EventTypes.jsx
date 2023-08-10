import React from 'react';
import {useFindAllEventTypesQuery} from "../redux/event/event.api.js";
import {Link} from "react-router-dom";

const EventTypes = () => {
    const {data: types} = useFindAllEventTypesQuery()
    return (
        <>


            <section className="events-poster">
                <div className="events-poster__container">
                    <div className="events-poster__body">

                    </div>
                    <h3 className="events-poster__title">Афиша событий города</h3>
                    <ul className="events-poster__items">
                        {/*<li className="events-poster__item"><Link to="/movies" className="events-poster__link _icon-link">Кино</Link>*/}
                        {/*</li>*/}
                        {
                            types?.length && types.map(type => {
                                const {name,isMovie} = type
                                if (!isMovie) {
                                    return <li key={name} className="events-poster__item">
                                        <Link to={`/events/${type._id}/${type.name}`}
                                              className="events-poster__link _icon-link">{name}</Link>
                                    </li>
                                }
                            })

                        }
                    </ul>
                </div>
            </section>
        </>
    );
};

export default EventTypes;
