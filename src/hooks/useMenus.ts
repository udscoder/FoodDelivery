import {useMutation, useQuery} from "@tanstack/vue-query";
import {computed} from "vue";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {menuService} from "@/api/menus.ts";

export function useMenus(restaurant_id: string) {
    return useQuery({
        queryKey: computed(() => queryKeys.menus.byRestaurantId(restaurant_id)),
        queryFn: () => menuService.getMenus(restaurant_id),
        enabled: computed(() => !!restaurant_id),
    })
}

export function useSendOrder() {
    return useMutation({
        mutationFn: ({ res_id, currency, items }: any) =>
            menuService.sendOrder(res_id, currency, items),
    })
}