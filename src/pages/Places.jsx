import React, {useState, useEffect} from 'react';
import HeroSlider from "../components/HeroSlider.jsx";
import {useParams} from "react-router";
import {useFindAllPlacesMainByCategoryIdQuery} from "../redux/place/place.api.js";
import PlaceItem from "../components/PlaceItem.jsx";
import MobilePlace from "../components/MobilePlace.jsx";
import {useFindCategoryByIdQuery} from "../redux/category/category.api.js";
import CategoryAdvertisement from "../components/CategoryAdvertisement/CategoryAdvertisement.jsx";

const Places = () => {
    const {id} = useParams()
    const user = {id: '466439009'}

    const [page, setPage] = useState(1);
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const {data: category} = useFindCategoryByIdQuery(id)
    const {data: places, isError, isLoading, isFetching, refetch} = useFindAllPlacesMainByCategoryIdQuery({
        id,
        telegramId: user?.id,
        page
    })

    const loadMore = () => {
        setPage(page + 1);
        // refetch()
    }

    // Merge new places into loaded places when places change
    useEffect(() => {
        if (places) {
            setLoadedPlaces(prevPlaces => [...prevPlaces, ...places.filter(place => !prevPlaces.map(prev => prev._id).includes(place._id))])
        }
    }, [places]);

    if (isError) return <p className="center">ошибка</p>

    return (
        <>
            <HeroSlider/>
            <CategoryAdvertisement id={id}/>

            <section className="ratings">
                <div className="ratings__container">
                    <div className="ratings__body">
                        <h2 className="ratings__title title title_1">ТОП {category?.name}</h2>

                        <div className="ratings__items ratings__items_pc">
                            {!isLoading && loadedPlaces?.map(e => <PlaceItem e={e} id={e._id} key={e._id}/>)}
                        </div>

                        <div className="ratings__items ratings__items_mob">
                            {!isLoading ? loadedPlaces?.map((e, i) => <MobilePlace key={i} e={e} i={i}/>)
                                :  <>
                                    <div style={{height:'96px',width:'88vw'}} className={'skeleton-loading'}></div>
                                    <div style={{height:'96px',width:'88vw'}} className={'skeleton-loading'}></div>
                                    <div style={{height:'96px',width:'88vw'}} className={'skeleton-loading'}></div>
                                    <div style={{height:'96px',width:'88vw'}} className={'skeleton-loading'}></div>
                                </>
                            }
                        </div>


                        {!isLoading && loadedPlaces && loadedPlaces.length > 0 && (
                            <button onClick={loadMore}>Загрузить больше</button>
                        )}
                    </div>
                </div>
            </section>

            {
                !isLoading && loadedPlaces?.length === 0 ?
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
