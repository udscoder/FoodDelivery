<script setup lang="ts">
import { useGeneralCategories, useRestaurantsByCategory } from "@/hooks/useRestaurants.ts"
import { useRoute } from "vue-router"
import { computed } from "vue"
import RestaurantBlock from "@/components/RestaurantBlock.vue"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FlexBox from "@/components/ui/FlexBox.vue"
import router from "@/router"

const route = useRoute()

const selectedCategory = computed(() => String(route.params.category))

const { data: restaurantsByCategory, isLoading: isLoadingByCategory } = useRestaurantsByCategory(selectedCategory)
const { data: categories } = useGeneralCategories()

const filteredCategories = computed(() => [{ id: 0, name: "All" }, ...categories?.value ?? []])

function onCategoryChange(val: string | number) {
  if (val === 'All') {
    router.push('/restaurants')
  }
  else {
    router.push('/restaurants/filter/' + String(val))
  }
}
</script>

<template>
  <FlexBox v-if="restaurantsByCategory" direction="column" align="start" class="w-full mt-30 h-full" gap="20px">

    <FlexBox align="center" class="w-full">
      <Tabs :default-value="selectedCategory" @update:model-value="onCategoryChange">
        <TabsList class="w-full justify-start overflow-x-auto bg-foreground text-white p-3">
          <TabsTrigger
              v-for="cat in filteredCategories"
              :key="cat.id"
              :value="cat.name"
              class="text-[16px] cursor-pointer font-normal"
          >
            {{ cat.name }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </FlexBox>

    <FlexBox v-if="isLoadingByCategory" direction="column" align="start" gap="15px">
      <Skeleton v-for="n in 4" :key="n" class="w-84 h-55 rounded-xl" />
    </FlexBox>

    <FlexBox v-else-if="restaurantsByCategory?.length" direction="column" align="start" gap="15px" class="px-20 w-full">
      <h1 class="text-2xl font-bold text-foreground">{{ selectedCategory }}</h1>

      <div class="grid w-full grid-cols-4 gap-3.5 ">
        <RestaurantBlock
            v-for="restaurant in restaurantsByCategory"
            :key="restaurant.id"
            :restaurant="restaurant"
            class="w-full"
        />
      </div>
    </FlexBox>

    <FlexBox v-else class="w-full h-40" direction="column">
      <h1 class="text-xl text-muted-foreground">No restaurants in this category</h1>
    </FlexBox>
  </FlexBox>
</template>