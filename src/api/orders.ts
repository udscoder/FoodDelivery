import type {ICategoryMenu, IMenu} from "@/types/menu.ts";
import api from "@/api/api.ts";
import type {IOrder} from "@/types/orders.ts";


const BASE = import.meta.env.VITE_MENUS_URL as string

export const ordersService = {
    getOrders: async ():Promise<ICategoryMenu[]> => {
        const {data} = await api.get(`${BASE}/orders`)
        return data
    },

    sendOrder: async (res_id: string, currency: string, items: IMenu[]): Promise<IOrder> => {
        const { data } = await api.post(`${BASE}/orders`, { restaurantId: res_id, currency: currency, items: items })
        return data
    },

    getOrderById: async (id: string):Promise<IOrder> => {
        const {data} = await api.get(`${BASE}/orders/${id}`)
        return data
    },
}