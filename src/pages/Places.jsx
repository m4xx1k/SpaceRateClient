import React, {useState} from 'react';
import HeroSlider from "../components/HeroSlider.jsx";
import {useParams} from "react-router";
import {useFetchByCategoryQuery, useFindAllPlacesMainByCategoryIdQuery} from "../redux/place/place.api.js";
import PlaceItem from "../components/PlaceItem.jsx";
import MobilePlace from "../components/MobilePlace.jsx";
import {useFindCategoryByIdQuery} from "../redux/category/category.api.js";
import CategoryAdvertisement from "../components/CategoryAdvertisement/CategoryAdvertisement.jsx";

const Places = () => {
    const {id} = useParams()
    const {data: category} = useFindCategoryByIdQuery(id)
    const {data: places, isError, isLoading} = useFindAllPlacesMainByCategoryIdQuery(id)
    if (isError) return <p className="center">ошибка</p>
    if ((places === null || places === undefined) && !isLoading) {
        return <p className="center">не найдено</p>
    }

    return (
        <>

            <HeroSlider/>
            <CategoryAdvertisement id={id}/>

            <section className="ratings">
                <div className="ratings__container">
                    <div className="ratings__body">
                        <h2 className="ratings__title title title_1">ТОП {category?.name}</h2>

                        <div className="ratings__items ratings__items_pc">
                            {
                             !isLoading &&   places.map(e => {

                                    return <PlaceItem e={e} id={e._id} key={e._id}/>

                                })
                            }


                        </div>

                        <div className="ratings__items ratings__items_mob">

                            {
                              !isLoading &&  places?.map((e, i) => <MobilePlace key={i} e={e} i={i}/>)
                            }


                        </div>

                    </div>
                </div>
            </section>

            {
              !isLoading &&  places?.length === 0 ?
                    <div className="ratings__container">
                        <div className="ratings__body">
                            <h2 className="ratings__title title title_1">пока нету мест в
                                категории {category?.name}</h2>
                        </div>
                    </div>
                    : <></>
            }
        </>
    );
};

export default Places;
