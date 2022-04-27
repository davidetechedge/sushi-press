import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MenuCategories, OrderType } from "../types/orders";

export const setOrderPeople = createAction<number>('orders/setOrderPeople');

export const setOrderType = createAction<OrderType>('orders/setOrderType');

export const resetOrder = createAction<void>('orders/resetOrder');

export const getMenu = createAsyncThunk<MenuCategories[]>(
    'orders/getMenu',
    async () => {
        const response = await axios.get<MenuCategories[]>('https://jsonkeeper.com/b/OOVX');

        return response.data;
    }
)