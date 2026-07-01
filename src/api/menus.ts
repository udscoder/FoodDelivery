import api from "@/api/api.ts";
import type {ICategoryMenu, IOrder} from "@/types/menu.ts";


const BASE = import.meta.env.VITE_RESTAURANT_URL as string
const MENU_BASE = import.meta.env.VITE_MENUS_URL as string

export const menuService = {
    getMenus: async (restaurant_id: string):Promise<ICategoryMenu[]> => {
        const {data} = await api.get(`${BASE}/restaurants/${restaurant_id}/menu-items`)
        return data
    },

    sendOrder: async (res_id: string, currency: string, items: any): Promise<IOrder> => {
        const { data } = await api.post(`${MENU_BASE}/orders`, { restaurantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', currency: currency, items: items })
        return data
    },

}

