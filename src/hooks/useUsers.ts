import {useQuery} from "@tanstack/vue-query";
import {computed} from "vue";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {usersService} from "@/api/users.ts";

export function useUsers() {
    return useQuery({
        queryKey: computed(() => queryKeys.users.users),
        queryFn: () => usersService.getUsers(),
        staleTime: 1000 * 60 * 5
    })
}
