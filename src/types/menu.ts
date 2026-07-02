export interface ICategoryMenu {
    id: number,
    restaurant: string,
    name: string,
    items: IMenu[]
}
export interface IMenu {
    id: number
    restaurant: string
    category: number
    name: string
    description: string
    price: string
    new_price: string
    discount: string
    discount_status: boolean
    promotion: string
    img_product: string
    delivery_time: string
    quantity: number
}

export interface ICart {
    res_id: string
    menu_id: string
    qty: number
}

