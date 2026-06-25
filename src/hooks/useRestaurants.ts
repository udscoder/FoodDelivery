import { useQuery } from '@tanstack/vue-query'
import { restaurantService } from '@/api/restaurants.ts'
import { queryKeys } from './queryKeys'
import {computed,} from "vue";

export function useRestaurants() {
    return useQuery({
        queryKey: queryKeys.restaurants.all,
        queryFn: restaurantService.getRestaurants,
        staleTime: 1000 * 60 * 5
    })
}

export function useRestaurant(id: string) {
    return useQuery({
        queryKey: computed(() => queryKeys.restaurants.byId(id)),
        queryFn: () => restaurantService.getRestaurant(id),
        enabled: computed(() => !!id), // don't fetch if id is missing
    })
}