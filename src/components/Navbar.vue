<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRouter} from "vue-router";

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
  }
]

const router = useRouter()
</script>

<template>
  <FlexBox justify="space-between" class="fixed top-0 w-full bg-foreground text-accent px-20 py-5">
    <h1 class="text-2xl font-bold">Food<span class="text-primary">Express</span></h1>

    <FlexBox gap="30px">
      <FlexBox
          v-for="page in pages"
          class="cursor-pointer"
          @click="router.push(page.route)"
      >
        <div>{{ page.title }}</div>
      </FlexBox>
    </FlexBox>
  </FlexBox>
</template>