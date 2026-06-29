<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import type {IRestaurant} from "@/types/restaurants.ts";
import {useRouter} from "vue-router";

const {restaurant} = defineProps<{restaurant: IRestaurant}>()

const router = useRouter()
</script>

<template>
  <FlexBox @click="router.push(`/restaurants/${restaurant.id}`)" gap="10px" direction="column" align="start" class="cursor-pointer flex-wrap w-[25%]">
    <img
        :src="restaurant.restaurant_img"
        :alt="restaurant.name"
        class="w-full h-40 rounded-3xl"
    />

    <FlexBox direction="column" align="start">
      <h2 class="font-medium text-[16px]">{{restaurant.name}}</h2>
      <p>{{restaurant.description}}</p>
    </FlexBox>
  </FlexBox>
</template>