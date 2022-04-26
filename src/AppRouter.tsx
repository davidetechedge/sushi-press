import { createBrowserHistory } from 'history'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomeContainer from "./Containers/HomeContainer";


export const history = createBrowserHistory()

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeContainer />}/>
                <Route path="/menu-all-you-can-eat" element={<HomeContainer />}/>
                <Route path="/menu-a-la-carte" element={<HomeContainer />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
