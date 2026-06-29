<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRouter} from "vue-router";
import useAuthStore from "@/stores/auth.ts";
import {SearchInput} from "@/components/ui/search-input";
import {BellRing, ShoppingBasket, UserIcon} from "lucide-vue-next";
import CardBlock from "@/components/CardBlock.vue";

const pages = [
  {
    id: 1,
    title: "Restaurants",
    route: "/restaurants"
  },
  {
    id: "2",
    title: "Menu",
    route: "/menu"
  },
  {
    id: 3,
    title: "Cart",
    route: "/cart"
  },
  {
    id: 4,
    title: "Orders",
    route: "/orders"
  },
  {
    id: 5,
    title: "Profile",
    route: "/profile"
  },
  {
    id: 6,
    title: "LogOut",
    route: "/login"
  }
]

const router = useRouter()
const auth = useAuthStore()
</script>

<template>
  <FlexBox justify="space-between" class="fixed top-0 w-full bg-foreground text-accent px-15 py-5 rounded-b-4xl">
    <h1 class="text-3xl font-bold cursor-pointer" @click="router.push('/')">Food<span class="text-primary">Express</span></h1>

    <SearchInput
        class="bg-white w-150 h-15"
        placeholder="Search in Eats"
        @search=""
    />

<!--    <FlexBox gap="30px">-->
<!--      <FlexBox-->
<!--          v-for="page in pages"-->
<!--          class="cursor-pointer"-->
<!--          @click="page.id == 6 ? auth.logOut() : router.push(page.route)"-->
<!--      >-->
<!--        <div>{{ page.title }}</div>-->
<!--      </FlexBox>-->
<!--    </FlexBox>-->

    <FlexBox gap="20px" class="cursor-pointer">
      <BellRing class="cursor-pointer text-white" :size="30"/>

      <FlexBox gap="5px" align="center" class="bg-primary rounded-[60px] px-5 py-3" @click="router.push('/cart')">
        <FlexBox align="center">
          <ShoppingBasket/>
        </FlexBox>

        <h1 class="font-bold text-xl">Carts</h1>
      </FlexBox>

      <FlexBox class="bg-white rounded-full w-10 h-10 text-foreground">
        <UserIcon/>
      </FlexBox>
    </FlexBox>
  </FlexBox>
</template>