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


function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={'/'} element={<Home/>}/>

                <Route element={<TelegramRequire/>}>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/favourites'} element={<Favourites/>}/>
                </Route>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/place/:id'} element={<Place/>}/>
                <Route path={'/places/:id'} element={<Places/>}/>
                <Route path={'*'} element={<>404</>}/>
            </Route>
        </Routes>
    )
}

export default App
