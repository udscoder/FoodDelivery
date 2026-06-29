<script setup lang="ts">
import { useAds, useGeneralCategories, useRestaurants } from "@/hooks/useRestaurants.ts"
import FlexBox from "@/components/ui/FlexBox.vue"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RestaurantBlock from "@/components/RestaurantBlock.vue"
import emblaCarouselVue from "embla-carousel-vue"
import { StepForwardIcon, StepBackIcon } from "lucide-vue-next"
import {computed, nextTick, onMounted, ref, watch} from "vue"
import Autoplay from "embla-carousel-autoplay"
import { Skeleton } from "@/components/ui/skeleton"

const canPrev = ref(false)
const canNext = ref(false)

const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false })

const [adsEmblaRef, adsEmbla] = emblaCarouselVue(
    { loop: true, align: 'start' },
    [autoplayPlugin]
)

const [emblaRef, embla] = emblaCarouselVue({
  loop: false,
  align: 'start',
  slidesToScroll: 1,
})

const { data: restaurants, isLoading, error: isError } = useRestaurants()
const { data: categories } = useGeneralCategories()
const { data: ads, isLoading: isAdsLoading } = useAds()

function updateButtons() {
  canPrev.value = embla.value?.canScrollPrev() ?? false
  canNext.value = embla.value?.canScrollNext() ?? false
}

onMounted(() => {
  embla.value?.on('select', updateButtons)
  embla.value?.on('init', updateButtons)
  embla.value?.on('reInit', updateButtons)
})

watch(restaurants, () => {
  nextTick(() => {
    embla.value?.reInit()
    updateButtons()
  })
})

const filteredCategories = computed(() => [{ id: 0, name: "All" }, ...categories?.value ?? []])
</script>

<template>
  <FlexBox  direction="column" align="start" class="my-10 mx-20 mt-30" gap="20px">
    <div class="relative w-full">

      <div v-if="isAdsLoading" class="flex gap-3">
        <Skeleton v-for="n in 3" :key="n" class="flex-[0_0_calc(33.333%-8px)] h-40 rounded-xl" />
      </div>

      <div v-else ref="adsEmblaRef" class="overflow-hidden w-full">
        <div class="flex gap-3">
          <div
              v-for="ad in ads"
              :key="ad.id"
              class="flex-[0_0_calc(33.333%-8px)] relative rounded-xl overflow-hidden min-h-40"
          >
            <img :src="ad.image_ads" :alt="ad.promotion" class="w-full h-full object-cover" />
            <FlexBox gap="10px" class="absolute bottom-2 left-4">
              <div class="bg-amber-400 rounded-md px-1 text-white font-bold text-[24px] drop-shadow">
                {{ ad.promotion }}
              </div>
              <div class="text-primary bg-white px-1 font-bold text-[24px] rounded-md drop-shadow">
                {{ restaurants?.find((r) => r?.id === ad.restaurant)?.name }}
              </div>
            </FlexBox>
          </div>
        </div>
      </div>

      <template v-if="!isAdsLoading">
        <button
            @click="() => { autoplayPlugin.reset(); adsEmbla?.scrollPrev() }"
            class="absolute -left-5 top-1/2 -translate-y-1/2 bg-foreground p-3 rounded-full text-white cursor-pointer z-10"
        >
          <StepBackIcon />
        </button>
        <button
            @click="() => { autoplayPlugin.reset(); adsEmbla?.scrollNext() }"
            class="absolute -right-5 top-1/2 -translate-y-1/2 bg-foreground p-3 rounded-full text-white cursor-pointer z-10"
        >
          <StepForwardIcon />
        </button>
      </template>
    </div>

    <FlexBox align="center" class="w-full">
      <Tabs default-value="All">
        <TabsList class="w-full justify-start overflow-x-auto bg-foreground text-white p-3">
          <TabsTrigger
              v-for="cat in filteredCategories"
              :key="cat.id"
              :value="String(cat.id)"
              class="text-[16px] cursor-pointer font-normal"
          >
            {{ cat.name }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </FlexBox>

    <FlexBox direction="column" align="start" gap="15px">
      <h1 class="text-2xl font-bold text-foreground">Restaurants</h1>

      <div class="relative">
        <div ref="emblaRef" class="overflow-hidden">
          <div class="flex gap-3.5">
            <template v-if="isLoading">
              <Skeleton v-for="n in 4" :key="n" class="w-84 h-[220px]  rounded-xl" />
            </template>



              <RestaurantBlock
                  v-for="restaurant in restaurants"
                  :key="restaurant.id"
                  v-bind="restaurant"
                  :restaurant="restaurant"
                  class="flex-[0_0_calc(25%-11px)]"
              />

          </div>
        </div>

        <button v-if="canPrev" @click="embla?.scrollPrev()"
                class="cursor-pointer -left-15 absolute top-[30%] bg-foreground p-3 rounded-full text-white">
          <StepBackIcon />
        </button>
        <button v-if="canNext" @click="embla?.scrollNext()"
                class="cursor-pointer absolute -right-15 top-[30%] bg-foreground p-3 rounded-full text-white">
          <StepForwardIcon />
        </button>
      </div>
    </FlexBox>

  </FlexBox>

  <div v-if="isError">Error loading restaurants</div>
</template>