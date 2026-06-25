import api from "@/api/api.ts";
import type {IMenu} from "@/types/menu.ts";


const BASE = import.meta.env.VITE_RESTAURANT_URL as string

export const menuService = {
    getMenus: async (restaurant_id: string):Promise<IMenu[]> => {
        const {data} = await api.get(`${BASE}/restaurants/${restaurant_id}/menu`)
        return data
    },
}

