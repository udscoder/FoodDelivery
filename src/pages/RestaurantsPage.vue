<script setup lang="ts">
import {useRestaurants} from "@/hooks/useRestaurants.ts";

import FlexBox from "@/components/ui/FlexBox.vue";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RestaurantBlock from "@/components/RestaurantBlock.vue";

const {data: restaurants, isLoading, error: isError} = useRestaurants()

const categories = ['All', 'Carry-out', 'Burgers', 'Sushi', 'Pizza', 'Wok', 'Pasta', 'Uzbek']
console.log('BBB', isError)
</script>

<template>
  <FlexBox v-if="!isLoading || !isError" direction="column" align="start" class="my-10 mx-20" gap="20px">
    <FlexBox align="center" class="w-full">
      <Tabs default-value="All">
        <TabsList class="w-full justify-start overflow-x-auto bg-foreground text-white p-3">
          <TabsTrigger
              v-for="cat in categories"
              :key="cat"
              :value="cat"
              class="text-[16px] cursor-pointer font-normal"
          >
            {{ cat }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </FlexBox>


    <FlexBox direction="column" align="start" gap="15px">
      <h1 class="text-2xl font-bold text-foreground">Restaurants</h1>

      <FlexBox gap="20px" align="start" class="flex-wrap">
        <RestaurantBlock v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"/>
      </FlexBox>
    </FlexBox>
  </FlexBox>

  <div v-if="isError">Error loading restaurants</div>
</template>