import './App.css'
import Home from "./pages/Home.jsx";
import Place from "./pages/Place.jsx";
import './assets/scss/style.scss'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import TelegramRequire from "./components/TelegramRequire.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Favourites from "./pages/Favourites.jsx";
import Places from "./pages/Places.jsx";

const VITE__API = 'https://api.goodjoy.uz'

function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={'/'} element={<Home VITE__API={VITE__API}/>}/>

                <Route element={<TelegramRequire VITE__API={VITE__API}/>}>
                    <Route path={'/profile'} element={<Profile VITE__API={VITE__API}/>}/>
                    <Route path={'/favourites'} element={<Favourites VITE__API={VITE__API}/>}/>

                </Route>
                <Route path={'/login'} element={<Login VITE__API={VITE__API}/>}/>
                <Route path={'/place/:id'} element={<Place VITE__API={VITE__API}/>}/>
                <Route path={'/places/:id'} element={<Places VITE__API={VITE__API}/>}/>
                <Route path={'*'} element={<>404</>}/>
            </Route>
        </Routes>
    )
}

export default App
