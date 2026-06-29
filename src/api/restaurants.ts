import api from "@/api/api.ts";
import type {IGeneralCategories, IRestaurant} from "@/types/restaurants.ts";

const BASE = import.meta.env.VITE_RESTAURANT_URL as string

export const restaurantService = {
    getRestaurants: async ():Promise<IRestaurant[]> => {
        const {data} = await api.get(`${BASE}/restaurants`)
        return data
    },
    getRestaurant: async (id: string):Promise<IRestaurant> => {
        const {data} = await api.get(`${BASE}/restaurant/${id}`)
        return data
    },
    getGeneralCategories: async ():Promise<IGeneralCategories[]> => {
        const {data} = await api.get(`${BASE}/general-category`)
        return data
    },
    getAds: async ():Promise<IAds[]> => {
        const {data} = await api.get(`${BASE}/ads`)
        return data
    }
}

