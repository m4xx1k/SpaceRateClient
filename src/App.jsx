import './App.css'
import Home from "./pages/Home.jsx";
import Place from "./pages/Place.jsx";
import './assets/scss/style.scss'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/place/:id'} element={<Place/>}/>
            </Route>
        </Routes>
    )
}

export default App
