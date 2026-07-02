import {useMutation, useQuery} from "@tanstack/vue-query";
import {computed} from "vue";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {ordersService} from "@/api/orders.ts";

export function useOrders() {
    return useQuery({
        queryKey: computed(() => queryKeys.orders.all),
        queryFn: () => ordersService.getOrders(),
        staleTime: 1000 * 60 * 5
    })
}

export function useOrdersById (id: string) {
    return useQuery({
        queryKey: computed(() => queryKeys.orders.byId(id)),
        queryFn: () => ordersService.getOrderById(id),
        staleTime: 1000 * 60 * 5
    })
}

export function useSendOrder() {
    return useMutation({
        mutationFn: ({ res_id, currency, items }: any) =>
            ordersService.sendOrder(res_id, currency, items),
    })
}