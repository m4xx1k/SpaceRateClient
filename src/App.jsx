import './App.css'
import Home from "./pages/Home.jsx";
import './assets/scss/style.scss'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import TelegramRequire from "./components/TelegramRequire.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Favourites from "./pages/Favourites.jsx";

import {Suspense, lazy, useEffect} from 'react';
import {useTelegram} from "./hooks/useTelegram.js";
const routes = [
	{
		path:'/',
		element:lazy(()=>import('./pages/Home.jsx'))
	},
	{
		path:'/eventstypes',
		element:lazy(()=>import('./pages/EventTypes.jsx'))
	},
	{
		path:'/place/:id',
		element:lazy(()=>import('./pages/Place.jsx'))
	},
	{
		path:'/login',
		element:lazy(()=>import('./pages/Login/Login.jsx'))
	},
	{
		path:'/places/:id',
		element:lazy(()=>import('./pages/Places.jsx'))
	},
	{
		path:'/movies',
		element:lazy(()=>import('./pages/Movies.jsx'))
	},
	{
		path:'/events/:type/:name',
		element:lazy(()=>import('./pages/Events.jsx'))
	},
	{
		path:'/event/:id',
		element:lazy(()=>import('./pages/Event.jsx'))
	},
	{
		path:'/movie/:id',
		element:lazy(()=>import('./pages/Movie.jsx'))
	}
]
function App({hideLoader}) {
	const {tg} = useTelegram()
	useEffect(() => {
		if(tg) tg.ready()

		hideLoader();
		console.log('none')
	}, []);
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<TelegramRequire/>}>
					<Route path={'/favourites'} element={<Favourites/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Route>
				<Route path={'/'} element={<Home/>}/>
				{
					routes.map(el=>{
						const Element = el.element
						const path = el.path
						return <Route key={path} path={path} element={
							<Suspense fallback={<></>}><Element/></Suspense>

					}/>
					})
				}
                <Route path={'*'} element={<>404</>}/>
            </Route>
        </Routes>
    )
}

export default App
