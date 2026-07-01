<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRestaurant} from "@/hooks/useRestaurants.ts";
import BackButton from "@/components/BackButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useChooseMenu, useMenus} from "@/hooks/useMenus.ts";
import RestaurantMenuBlock from "@/components/RestaurantMenuBlock.vue";
import CartBlock from "@/components/CartBlock.vue";
import type {IMenu} from "@/types/menu.ts";
import useCardStore from "@/stores/menu.js";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {nextTick, onMounted, ref, watch} from "vue";

const router = useRouter();

const route = useRoute()
const id = route.params.id as string

const cardStore = useCardStore()

const menuRefs = ref<Record<string, HTMLElement>>({})
const activeTab = ref<string>('')
let isClickScrolling = false //

const {data: restaurant,} = useRestaurant(id)
const {data: menus} = useMenus(id)

const {mutate: chooseMenu} = useChooseMenu()

function filteredMenus(list: IMenu[]) {
  return (list ?? []).map((menu: IMenu) => ({
    ...menu,
    quantity: cardStore.selectedMenus.find(m => m.id === menu.id)?.quantity ?? 0
  }))
}

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

    localStorage.setItem('selectedMenus', JSON.stringify(cardStore.selectedMenus))

    chooseMenu({
      res_id: restaurant?.value?.id || '',
      menu_id: menu.id.toString(),
      qty: cardStore?.getSelectedMenus?.find(m => m.id === menu.id)?.quantity ?? 0
    }, {
      onSuccess: () => {
        console.log("Menu added successfully")
      }
    })
  } else {
    cardStore.selectedMenus.push({...menu, quantity: 1})
    localStorage.setItem('selectedMenus', JSON.stringify(cardStore.selectedMenus))
    // chooseMenu(restaurant?.value?.id, menu.id, selectedMenu.quantity)
  }
}

function updateActiveTabFromScroll() {
  const anchorY = window.innerHeight * 0.5 // 30% down the viewport
  let current: string | null = null
  let closestDistance = -Infinity

  for (const menu of menus.value ?? []) {
    const el = menuRefs.value[menu.id]
    if (!el) continue

    const top = el.getBoundingClientRect().top
    if (top <= anchorY && top > closestDistance) {
      closestDistance = top
      current = menu.name
    }
  }

  if (current && current !== activeTab.value) {
    activeTab.value = current
  }
}

function setMenuRef(el: any, id: string | number) {
  if (!el) return
  const domEl = el.$el ?? el
  menuRefs.value[id] = domEl as HTMLElement
}

function scrollToMenu(id: string | number) {
  const el = menuRefs.value[id]
  if (!el) return

  isClickScrolling = true
  const offset = 110
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })

  window.clearTimeout((scrollToMenu as any)._t)
  ;(scrollToMenu as any)._t = window.setTimeout(() => {
    isClickScrolling = false
  }, 600)
}

function onCategoryChange(val: string) {
  activeTab.value = val
  const target = menus.value?.find((m) => m.name === val)
  if (!target) return
  scrollToMenu(target.id)
}

function setupScrollSpy() {
  window.removeEventListener('scroll', onScroll)
  window.addEventListener('scroll', onScroll, { passive: true })
}

function onScroll() {
  if (isClickScrolling) return
  updateActiveTabFromScroll()
}

watch(menus, () => {
  nextTick(() => {
    if (menus.value?.length && !activeTab.value) {
      activeTab.value = menus.value[0].name
    }
    setupScrollSpy()
    updateActiveTabFromScroll()
  })
}, { immediate: true })

onMounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <FlexBox v-if="menus" align="start" justify="start" gap="30px" class="rounded-md px-5 py-5 mt-26">
    <FlexBox class="fixed left-10 z-99 w-50" align="start" justify="start" direction="column">
      <BackButton title="All Restaurants" @click="handleClick"/>

      <FlexBox align="center" direction="column" class="mt-10">
        <Tabs
            class="flex flex-row gap-4"
              orientation="vertical"
              :model-value="activeTab"
              @update:model-value="onCategoryChange(String($event))"
        >
          <TabsList class="flex flex-col w-48 justify-start overflow-x-auto bg-foreground text-white p-3">
            <TabsTrigger
                v-for="cat in menus"
                :key="cat.id"
                :value="cat.name"
                class="text-[16px] cursor-pointer font-normal"
            >
              {{ cat.name }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </FlexBox>
    </FlexBox>

    <FlexBox direction="column" class="w-full mr-100 ml-70" gap="50px" justify="start" align="start">
      <FlexBox align="start" justify="start" gap="20px" class="w-full h-full bg-foreground rounded-4xl p-5 text-white">
        <img :src="restaurant?.restaurant_img" class="w-40 rounded-4xl h-40 object-fit"/>

        <FlexBox direction="column" align="start" justify="space-between" class="h-full w-[50%]" gap="20px">
          <h1 class="font-bold text-[32px]">{{ restaurant?.name }}</h1>
          <p>{{ restaurant?.description }}</p>
        </FlexBox>
      </FlexBox>

      <FlexBox
          direction="column"
          gap="10px"
          align="start"
          justify="start"
          class=" w-full rounded-2xl"
          v-for="menu in menus"
          :key="menu.id"
          :ref="el => setMenuRef(el, menu.id)"
      >
        <h1 class="text-2xl font-bold text-foreground">{{ menu.name }}</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RestaurantMenuBlock v-for="item in filteredMenus(menu.items)" :menu="item" :key="item.id"
                               @add-menu="handleAddMenu"/>
        </div>
      </FlexBox>
    </FlexBox>

    <CartBlock/>
  </FlexBox>
</template>