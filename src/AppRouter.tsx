import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

const CartContainer = React.lazy(() => import('./Containers/CartContainer'))
const HomeContainer = React.lazy(() => import('./Containers/HomeContainer'))
const MenuContainer = React.lazy(() => import('./Containers/MenuContainer'))

export const history = createBrowserHistory()

const AppRouter = () => {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/menu" element={<MenuContainer />} />
          <Route path="/menu/:cat" element={<MenuContainer />} />
          <Route path="/cart" element={<CartContainer />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default AppRouter
