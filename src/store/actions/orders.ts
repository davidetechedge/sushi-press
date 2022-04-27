import { createAction } from "@reduxjs/toolkit";
import { OrderType } from "../types/orders";

export const setOrderPeople = createAction<number>('orders/setOrderPeople');

export const setOrderType = createAction<OrderType>('orders/setOrderType');

export const resetOrder = createAction<void>('orders/resetOrder');