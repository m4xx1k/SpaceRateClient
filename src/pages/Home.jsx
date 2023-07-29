import React, {lazy, Suspense, useEffect} from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import {useFetchAllQuery} from "../redux/category/category.api.js";
import {Link, useNavigate} from "react-router-dom";
import {toWebp} from "../utils.js";
import event from '../assets/icons/event.svg'
import movie from '../assets/icons/movie.svg'
import {useFindUserMutation} from "../redux/auth/authApiSlice.js";
import {useTelegram} from "../hooks/useTelegram.js";

const HeroSlider = lazy(() => import("../components/HeroSlider.jsx"))

const VITE__API = import.meta.env.VITE__API

const Home = () => {
    const {data, isLoading} = useFetchAllQuery()
    const {user} = useTelegram()
    // const user = {id: '1635059635'}
    const [findUser] = useFindUserMutation()
    const navigate = useNavigate()
    useEffect(() => {

        const handleUserAuth = async () => {
            const {data: isUser} = await findUser({telegramId: user.id})
            if (!isUser) {
                console.log('user isnt registered, redirect')
                navigate('/login')
            }else{
                console.log({isUser})
            }

        }
        if (user) {
            console.log('is telegram')
            handleUserAuth()
        }

    }, [])
    return (<>

        <Suspense fallback={
            <div style={{width: '90vw', height: 140, borderRadius: 50}} className={'skeleton-loading'}></div>
        }>
            <HeroSlider/>
        </Suspense>
        <div className="home-buttons">
            <div className="home-buttons__container">
                <div className="home-buttons__body">
                    <div className="row">
                        <Link to="eventstypes" className="home-buttons__btn">СОБЫТИЯ<img loading="lazy" src={event}
                                                                                         alt=""/></Link>
                    </div>
                    <div className="row">
                        <Link to="movies" className="home-buttons__btn">КИНО<img loading="lazy" src={movie}
                                                                                 alt=""/></Link>

                    </div>
                </div>
            </div>
        </div>
        <section className="categories">
            <div className="categories__container">
                <div className="categories__body">

                    <div className="categories__title title title_2">КАТЕГОРИИ РЕЙТИНГОВ</div>
                    <div className="categories__items">
                        {
                            !isLoading ? data?.map(category => (
                                    <Link to={`/places/${category._id}`} key={category._id}
                                        // className={`categories__item item-categories${category._id === activeCategory ? ' active' : ''}`}
                                          className={`categories__item item-categories`}
                                    >

                                        {category.name}
                                        <div className="item-categories__img-ibg">
                                            <picture>
                                                <source srcSet={toWebp(`${VITE__API}/categories/${category.photo}`)}/>
                                                <img loading="lazy" src={`${VITE__API}/categories/${category.photo}`}
                                                     alt=""/>
                                            </picture>


                                        </div>
                                    </Link>
                                )) :
                                Array(20).fill().map((_, i) =>

                                    <div key={i} style={{height: 56, width: 90}} className={'skeleton-loading'}></div>
                                )
                        }


                    </div>
                </div>
            </div>
        </section>


    </>)
};

export default Home;
