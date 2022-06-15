import { APIData } from "../axiosConfiguration"

export enum OrderType {
    AYCE = "all-you-can-eat",
    CARTE = "a-la-carte"
}

export type MenuCategories = {
    category: string,
    items: MenuCategoryItem[]
}

export type MenuCategoryItem = {
    id: number,
    name: string,
    price: number,
    img: string,
    included: boolean
}

export type OrderItem = MenuCategoryItem & { 
    quantity: number
};

export type OrdersState = {
    people: number,
    type?: OrderType,
    menu: APIData<MenuCategories[]>,
    bill: OrderItem[],
    billPrice: number,
    items: OrderItem[]
}