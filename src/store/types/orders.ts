export enum OrderType {
    AYCE,
    CARTE
}

export type OrdersState = {
    people?: number,
    type?: OrderType
}