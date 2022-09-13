import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { MenuCategories, OrderItem, OrderType } from '../types/orders'

export const setOrderPeople = createAction<number>('orders/setOrderPeople')

export const setOrderType = createAction<OrderType>('orders/setOrderType')

export const resetOrder = createAction<void>('orders/resetOrder')

export const getMenu = createAsyncThunk<MenuCategories[]>('orders/getMenu', async () => {
  const response = await axios.get<MenuCategories[]>('https://api.npoint.io/8f7a5852d72e99542a52')

  return response.data
})

export const addOrderItem = createAction<OrderItem>('orders/addOrderItem')

export const removeOrderItem = createAction<number>('orders/removeOrderItem')

export const sendOrder = createAction<void>('orders/sendOrder')
