import { createReducer } from '@reduxjs/toolkit'
import {
  addOrderItem,
  getMenu,
  removeOrderItem,
  resetOrder,
  setOrderPeople,
  setOrderType,
  sendOrder,
} from '../actions/orders'
import { APIStatus, InternalError } from '../axiosConfiguration'
import { OrdersState, OrderType } from '../types/orders'

export const initialState: OrdersState = {
  people: 1,
  menu: { status: APIStatus.IDLE },
  bill: [],
  billPrice: 0,
  items: [],
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setOrderPeople, (state, action) => {
      state.people = Math.max(action.payload, 1)
    })
    .addCase(setOrderType, (state, action) => {
      state.type = action.payload
      state.billPrice = (state.type === OrderType.AYCE ? 24.99 : 2.5) * state.people
    })
    .addCase(resetOrder, (state) => {
      state.people = 1
      state.type = undefined
      state.items = []
      state.bill = []
      state.billPrice = 0
    })
    .addCase(addOrderItem, (state, action) => {
      const itemAlreadyAdded = state.items.findIndex((item) => {
        return (
          item.id === action.payload.id &&
          item.name === action.payload.name &&
          item.price === action.payload.price
        )
      })

      if (itemAlreadyAdded === -1) {
        state.items = [...state.items, action.payload]
      } else {
        state.items[itemAlreadyAdded].quantity += action.payload.quantity
      }
    })
    .addCase(removeOrderItem, (state, action) => {
      const updatedList = [...state.items]

      updatedList.splice(action.payload, 1)
      state.items = updatedList
    })

  builder.addCase(sendOrder, (state) => {
    state.bill = [...state.bill, ...state.items]
    state.billPrice = state.items.reduce((totalPrice, item) => {
      if (state.type === OrderType.AYCE && item.included) {
        return totalPrice
      }

      return totalPrice + item.price * item.quantity
    }, state.billPrice)
    state.items = []
  })

  builder
    .addCase(getMenu.pending, (state) => {
      state.menu.status = APIStatus.PENDING
    })
    .addCase(getMenu.fulfilled, (state, action) => {
      state.menu.status = APIStatus.FULFILLED
      state.menu.data = action.payload
    })
    .addCase(getMenu.rejected, (state, action) => {
      state.menu.status = APIStatus.REJECTED
      state.menu.error = {
        code: action.error.code || InternalError.code,
        message: action.error.message || InternalError.message,
      }
    })
})
