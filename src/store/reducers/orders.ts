import { createReducer } from "@reduxjs/toolkit";
import { resetOrder, setOrderPeople, setOrderType } from "../actions/orders";
import { OrdersState } from "../types/orders";

export const initialState: OrdersState = {
    people: 1
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setOrderPeople, (state, action) => {
            state.people = Math.max(action.payload, 1);
        })
        .addCase(setOrderType, (state, action) => {
            state.type = action.payload;
        })
        .addCase(resetOrder, (state) => {
            state.people = 1;
            state.type = undefined;
        })
});