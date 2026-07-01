import { computed } from 'vue'
import type { Role } from '@/types/auth'
import useAuthStore from "@/stores/auth.ts";

export function useRole() {
    const auth = useAuthStore()

    const role = computed(() => auth.user?.role)

    const isAdmin = computed(() => role.value === 'ADMIN')
    const isCustomer = computed(() => role.value === 'CUSTOMER')
    const isCourier = computed(() => role.value === 'COURIER')
    const isRestaurantOwner = computed(() => role.value === 'RESTAURANT_OWNER')

    const hasRole = (roles: Role[]) => computed(() =>
        !!role.value && roles.includes(role.value)
    )

    return { role, isAdmin, isCustomer, isCourier, isRestaurantOwner, hasRole }
}