<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import type {IRestaurant} from "@/types/restaurants.ts";
import {useRouter} from "vue-router";
import { ImageOff } from 'lucide-vue-next'
import {ref} from "vue";

const {restaurant} = defineProps<{restaurant: IRestaurant}>()

const router = useRouter()

const imgError = ref(false)

function handleImgError() {
  imgError.value = true
}
</script>

<template>
  <FlexBox @click="router.push(`/restaurants/${restaurant.id}`)" direction="column" align="start" class="cursor-pointer relative">
    <FlexBox align="start" class="w-full h-40 rounded-t-3xl relative">
      <img
          v-if="!imgError"
          :src="restaurant.restaurant_img"
          :alt="restaurant.name"
          class="w-full h-full rounded-t-3xl"
          @error="handleImgError"
      />

      <ImageOff v-else class="w-full h-40 text-gray-400 bg-gray-200 rounded-t-3xl" />

      <FlexBox wrap="wrap" gap="5px" align="start" class="absolute bottom-1 right-0  p-2">
        <p v-for="cat in restaurant.categories.slice(0, 2)" class="bg-primary rounded-full px-2 text-white font-bold text-[14px]">{{cat.name}}</p>
      </FlexBox>
    </FlexBox>

    <FlexBox gap="5px" direction="column" align="start" class="bg-foreground text-white p-3 rounded-b-3xl">
      <h2 class="font-medium text-[16px]">{{restaurant.name}}</h2>

      <p class="text-white/50">{{restaurant.description}}</p>
    </FlexBox>
  </FlexBox>
</template>