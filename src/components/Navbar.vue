<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRouter} from "vue-router";
import {SearchInput} from "@/components/ui/search-input";
import {BellRing, ShoppingBasket, UserIcon} from "lucide-vue-next";
import useAuthStore from "@/stores/auth.ts";
import {useRole} from "@/hooks/useRoles.ts";

const authStore = useAuthStore()
const router = useRouter()
const { isCustomer} = useRole()

const redirectMap: any= {
  ADMIN: '/admin',
  CUSTOMER: '/restaurants',
  COURIER: '/deliveries',
  RESTAURANT_OWNER: '/dashboard',
}

</script>

<template>
  <FlexBox justify="space-between" class="fixed z-199 top-0 w-full bg-foreground text-accent px-15 py-5 rounded-b-4xl">
    <h1 class="text-3xl font-bold cursor-pointer" @click="router.push(redirectMap[authStore.user.role])">Food<span class="text-primary">Express</span></h1>

    <SearchInput
        class="bg-white w-150 h-15"
        placeholder="Search in Eats"
        @search=""
    />

    <FlexBox gap="20px" class="cursor-pointer">
      <BellRing class="cursor-pointer text-white" :size="30"/>

      <FlexBox gap="5px" v-if="isCustomer">
        <FlexBox gap="5px" align="center" class="bg-primary rounded-[60px] px-5 py-3" @click="router.push('/cart')">
          <FlexBox align="center">
            <ShoppingBasket/>
          </FlexBox>

          <h1 class="font-bold text-xl">Carts</h1>
        </FlexBox>

        <FlexBox gap="5px" align="center" class="bg-white text-primary rounded-[60px] px-5 py-3" @click="router.push('/orders')">
          <FlexBox align="center">
            <ShoppingBasket/>
          </FlexBox>

          <h1 class="font-bold text-xl">Orders</h1>
        </FlexBox>
      </FlexBox>

      <FlexBox class="bg-white rounded-full w-10 h-10 text-foreground" @click="router.push('/profile')">
        <UserIcon/>
      </FlexBox>
    </FlexBox>
  </FlexBox>
</template>