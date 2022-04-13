import { createReducer } from "@reduxjs/toolkit";
import { resetOrder, setOrderPeople, setOrderType } from "../actions/orders";
import { OrdersState } from "../types/orders";

export const initialState: OrdersState = {
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setOrderPeople, (state, action) => {
            state.people = action.payload;
        })
        .addCase(setOrderType, (state, action) => {
            state.type = action.payload;
        })
        .addCase(resetOrder, (state) => {
            state.people = undefined;
            state.type = undefined;
        })
});