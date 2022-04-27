export enum OrderType {
    AYCE = "menu-all-you-can-eat",
    CARTE = "menu-a-la-carte"
}

export type OrdersState = {
    people: number,
    type?: OrderType
}