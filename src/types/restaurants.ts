export interface IRestaurant {
    id: string
    owner_user_id: number
    name: string
    description: string
    address: string
    is_open: boolean
    created_at: string
    restaurant_img: string,
    categories: IGeneralCategories[]
}

export interface IGeneralCategories {
    id: number
    name: string
}

export interface IAds {
    id: number
    promotion: string
    image_ads: string
    restaurant: string
}