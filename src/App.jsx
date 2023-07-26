import './App.css'
import Home from "./pages/Home.jsx";
import './assets/scss/style.scss'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import TelegramRequire from "./components/TelegramRequire.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Favourites from "./pages/Favourites.jsx";
// import Places from "./pages/Places.jsx";
// import Events from "./pages/Movies.jsx";
// import Movie from "./pages/Movie.jsx";
// import Login from "./pages/Login/Login.jsx";
// import Place from "./pages/Place.jsx";
import { Suspense, lazy } from 'react';
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
function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<TelegramRequire/>}>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Route>
				<Route path={'/'} element={<Home/>}/>
				<Route path={'/favourites'} element={<Favourites/>}/>
				{
					routes.map(el=>{
						const Element = el.element
						const path = el.path
						return <Route key={path} path={path} element={
							<Suspense fallback={<></>}><Element/></Suspense>

					}/>
					})
				}
				{/*
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/events'} element={<Events/>}/>
                <Route path={'/place/:id'} element={<Place/>}/>
                <Route path={'/movie/:id'} element={<Movie/>}/>
                <Route path={'/places/:id'} element={<Places/>}/> */}
                <Route path={'*'} element={<>404</>}/>
            </Route>
        </Routes>
    )
}

export default App
