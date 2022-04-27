import { createBrowserHistory } from 'history'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomeContainer from "./Containers/HomeContainer";
import MenuContainer from "./Containers/MenuContainer";


export const history = createBrowserHistory()

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeContainer />}/>
                <Route path="/menu" element={<MenuContainer />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
