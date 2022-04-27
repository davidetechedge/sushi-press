import { createReducer } from "@reduxjs/toolkit";
import { getMenu, resetOrder, setOrderPeople, setOrderType } from "../actions/orders";
import { APIError, APIStatus, InternalError } from "../axiosConfiguration";
import { OrdersState } from "../types/orders";

export const initialState: OrdersState = {
    people: 1,
    menu: { status: APIStatus.IDLE }
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

    builder
        .addCase(getMenu.pending, (state) => {
            state.menu.status = APIStatus.PENDING;
        })
        .addCase(getMenu.fulfilled, (state, action) => {
            state.menu.status = APIStatus.FULFILLED;
            state.menu.data = action.payload;
        })
        .addCase(getMenu.rejected, (state, action) => {
            state.menu.status = APIStatus.REJECTED;
            state.menu.error = {
                code: action.error.code || InternalError.code,
                message: action.error.message || InternalError.message
            };
        })
});