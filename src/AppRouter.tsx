import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { CartContainer } from './Containers/CartContainer'
import HomeContainer from './Containers/HomeContainer'
import MenuContainer from './Containers/MenuContainer'

export const history = createBrowserHistory()

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/menu" element={<MenuContainer />} />
        <Route path="/menu/:cat" element={<MenuContainer />} />
        <Route path="/cart" element={<CartContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
