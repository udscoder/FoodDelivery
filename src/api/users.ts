import api from "@/api/api.ts";
import type {IUsers} from "@/types/users.ts";

const BASE = import.meta.env.VITE_AUTH_URL as string

export const usersService = {
    getUsers: async ():Promise<IUsers[]> => {
        const {data} = await api.get(`${BASE}/users`)
        return data
    },
}

