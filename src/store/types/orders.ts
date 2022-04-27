export enum OrderType {
    AYCE = "all-you-can-eat",
    CARTE = "a-la-carte"
}

export type OrdersState = {
    people: number,
    type?: OrderType
}