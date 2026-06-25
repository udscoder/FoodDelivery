<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRestaurant} from "@/hooks/useRestaurants.ts";
import BackButton from "@/components/BackButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useMenus} from "@/hooks/useMenus.ts";
import RestaurantMenuBlock from "@/components/RestaurantMenuBlock.vue";
import CardBlock from "@/components/CardBlock.vue";
import type {IMenu} from "@/types/menu.ts";
import useCardStore from "@/stores/menu.js";
import {computed, } from "vue";

const router = useRouter();

const route = useRoute()
const id = route.params.id as string

const cardStore = useCardStore()

const {data: restaurant, isLoading} = useRestaurant(id)
const {data: menus} = useMenus(id)

const filteredMenus = computed(() => {
  return (menus.value ?? []).map((menu) => ({
    ...menu,
    quantity: cardStore.selectedMenus.find(m => m.id === menu.id)?.quantity ?? 0
  }))
})

const handleClick = () => {
  router.push('/restaurants')
}

const handleAddMenu = (menu: IMenu) => {
  if (cardStore.getSelectedMenus.some((selectedMenu) => selectedMenu.id === menu.id)) {
    cardStore.selectedMenus.map((selectedMenu) => {
      if (selectedMenu.id === menu.id) {
        selectedMenu.quantity++
      }
    })
  } else {
    cardStore.selectedMenus.push({...menu, quantity: 1})
  }
}

</script>

<template>
  <FlexBox v-if="!isLoading" align="start" justify="start" gap="30px" class="rounded-md px-5 py-5 pt-23">
    <FlexBox class="w-80" align="start" justify="start" direction="column">
      <BackButton title="All Restaurants" @click="handleClick"/>
    </FlexBox>

    <FlexBox direction="column" class="w-full mr-100" gap="50px" justify="start" align="start">
      <FlexBox align="start" justify="start" gap="20px" class="w-full h-full bg-foreground rounded-4xl p-5 text-white">
        <img :src="restaurant?.restaurant_img" class="w-40 rounded-4xl h-40 object-fit"/>

        <FlexBox direction="column" align="start" justify="space-between" class="h-full w-[50%]" gap="20px">
          <h1 class="font-bold text-[32px]">{{restaurant?.name}}</h1>
          <p>{{restaurant?.description}}</p>
        </FlexBox>
      </FlexBox>

      <FlexBox
          direction="column"
          gap="10px"
          align="start"
          justify="start"
          class=" w-full rounded-2xl"
      >
        <h1 class="text-2xl font-bold text-foreground">Offers</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RestaurantMenuBlock v-for="menu in filteredMenus" :menu="menu" :key="menu.id" @add-menu="handleAddMenu"/>
        </div>
      </FlexBox>
    </FlexBox>

    <CardBlock/>
  </FlexBox>
</template>