import React from 'react';
import Header from "./Header.jsx";
import {Outlet, useLocation} from "react-router";
import {Link} from "react-router-dom";
import {BackButton} from "./BackButton";

const Layout = () => {
    const {pathname} = useLocation()
    return (
        <>
            <Header/>
            <main className="page">
                <Outlet/>
            </main>

            <section className="links">
                {/*<BackButton classname={'links__back-btn'}>{'⇦'}</BackButton>*/}
                <div className="links__container">
                    <div className="links__body">
                        <Link to="/"
                              className={`links__item ${pathname !== '/favourites' ? 'links__item_btn' : ''}`}>РЕЙТИНГИ </Link>
                        <Link to="/favourites"
                              className={`links__item ${pathname === '/favourites' ? 'links__item_btn' : ''}`}>МНЕ
                            НРАВИТСЯ</Link>
                        <a href="https://t.me/goodjoyuz_bot" className="links__item">ОТДЕЛ ЗАБОТЫ</a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Layout;
