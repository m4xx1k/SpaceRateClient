import React, {useState} from 'react';
import HeroSlider from "../components/HeroSlider.jsx";
import {useParams} from "react-router";
import {useFetchByCategoryQuery} from "../redux/place/place.api.js";
import PlaceItem from "../components/PlaceItem.jsx";
import MobilePlace from "../components/MobilePlace.jsx";
import {useFindCategoryByIdQuery} from "../redux/category/category.api.js";

const Places = () => {
    const {id} = useParams()
    // const [activeCategory, setActiveCategory] = useState(null)
    const {data: category} = useFindCategoryByIdQuery(id)
    const {data: places, isError, isLoading} = useFetchByCategoryQuery(id)
    // const [places, setPlaces] = useState([])
    // const selectCategory = async category => {
    //     const {data} = await fetchPlaces(category._id)
    //     setPlaces(data)
    //     // setActiveCategory(category._id)
    // }
    if (isLoading) return <p className="center">загрузка</p>
    if (isError) return <p className="center">ошибка</p>
    if (places === null || places === undefined) {
        return <p className="center">не найдено</p>
    }

    return (
        <>

            <HeroSlider/>
            {
                places?.length ?
                    <section className="ratings">
                        <div className="ratings__container">
                            <div className="ratings__body">
                                <h2 className="ratings__title title title_1">ТОП {category?.name}</h2>

                                <div className="ratings__items ratings__items_pc">
                                    {
                                        places.map(e => {

                                            const info = e.info
                                            const id = e.place._id
                                            return <PlaceItem e={e} id={id} info={info} key={id}/>

                                        })
                                    }


                                </div>

                                <div className="ratings__items ratings__items_mob">

                                    {
                                        places?.map((e, i) => <MobilePlace key={i} e={e} i={i}/>)
                                    }


                                </div>

                            </div>
                        </div>
                    </section>
                    : <></>
            }
            {
                places?.length === 0 ?
                    <div className="ratings__container">
                        <div className="ratings__body">
                            <h2 className="ratings__title title title_1">пока нету мест в категории  {category?.name}</h2>
                        </div>
                    </div>
                    : <></>
            }
        </>
    );
};

export default Places;