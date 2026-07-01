import { useQuery } from '@tanstack/vue-query'
import { restaurantService } from '@/api/restaurants.ts'
import { queryKeys } from './queryKeys'
import {computed, type Ref,} from "vue";

export function useRestaurants() {
    return useQuery({
        queryKey: queryKeys.restaurants.all,
        queryFn: restaurantService.getRestaurants,
        staleTime: 1000 * 60 * 5
    })
}

export function useRestaurantsByCategory(ctg: Ref<string>) {
    return useQuery({
        queryKey: computed(() => queryKeys.restaurants.byCategory(ctg.value)),
        queryFn: () => restaurantService.getRestaurantsByCategory(ctg.value),
        staleTime: 1000 * 60 * 5
    })
}

export function useRestaurant(id: string) {
    return useQuery({
        queryKey: computed(() => queryKeys.restaurants.byId(id)),
        queryFn: () => restaurantService.getRestaurant(id),
        enabled: computed(() => !!id),
    })
}

export function useGeneralCategories() {
    return useQuery({
        queryKey: computed(() => queryKeys.restaurants.generalCategories),
        queryFn: () => restaurantService.getGeneralCategories(),
    })
}

export function useAds() {
    return useQuery({
        queryKey: computed(() => queryKeys.restaurants.ads),
        queryFn: () => restaurantService.getAds(),
    })
}