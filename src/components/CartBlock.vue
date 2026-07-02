<script lang="ts" setup>
import FlexBox from "@/components/ui/FlexBox.vue";
import useCardStore from "@/stores/menu.js";
import {PlusIcon, Minus, FrownIcon} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils.ts";
import {onMounted} from "vue";

const menuStore = useCardStore()

onMounted(() => {
    menuStore.selectedMenus = JSON.parse(localStorage.getItem('selectedMenus') || '[]')
})

const emit = defineEmits<{ (e: 'send-order'): void }>()

</script>

<template>
  <FlexBox
      gap="20px"
      direction="column"
      class="fixed right-10  top-30 w-90 h-[calc(100%-140px)] min-h-145 bg-card-foreground rounded-4xl border border-border hover:shadow-md transition-shadow text-white p-5 overflow-scroll"
      align="start" justify="start"
  >
    <h1 class="text-2xl font-bold">Cart</h1>

    <FlexBox gap="20px" class="max-h-80  overflow-y-auto" direction="column" align="start" justify="start" >
      <FlexBox
          align="start"
          justify="start"
          gap="10px"
          v-for="(menu, idx) in menuStore.getSelectedMenus"
          :key="menu.id"
          :class="idx == menuStore.selectedMenus.length - 1 ? 'w-full  border-b-2 border-white/10 pb-4' : '' "
      >
        <img :src="menu.img_product" class="w-15 h-15 rounded-xl"/>

        <FlexBox
            align="start"
            justify="start"
            :class="idx !== menuStore.getSelectedMenus.length - 1 ? 'w-full border-b-2 border-white/10 pb-4' : '' "
        >
          <FlexBox direction="column" align="start" justify="space-between"
                   class="w-30">
            <h1 class="font-bold text-[16px]">{{ menu.name }}</h1>
            <h1 class="font-bold text-[14px] opacity-70">{{ formatPrice(menu.new_price) }} sum</h1>
          </FlexBox>

          <FlexBox justify="space-between" class="w-30 gap-1 rounded-full bg-white text-accent-foreground px-2 py-1">
            <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 rounded-full  hover:bg-white/10"
                :disabled="menu.quantity == 0"
                @click="menuStore.decrementQuantity(menu)"
            >
              <Minus class="h-4 w-4"/>
            </Button>

            <span class="min-w-[1.5rem] text-center text-sm font-bold ">
              {{ menu.quantity }}
            </span>

            <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 rounded-full  hover:bg-white/10"
                @click="menuStore.incrementQuantity(menu)"
            >
              <PlusIcon class="h-4 w-4"/>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>

    <FlexBox v-if='menuStore.getSelectedMenus.length > 0' justify="space-between" class="w-full">
      <h1 class="font-bold text-[16px]">Service Fee</h1>

      <h2 class="font-bold text-[16px]">5,100 sum</h2>
    </FlexBox>

    <Button v-if="menuStore.getSelectedMenus.length > 0" @click="emit('send-order')" class="flex absolute bottom-5 left-2 w-[calc(100%-20px)] justify-between  h-15  bg-primary text-white mt-25 rounded-2xl" :variant="null">
      <h1 class="text-[16px] font-medium">Next</h1>
      <h2 class="text-[18px] font-bold">180 000 sum</h2>
    </Button>

    <FlexBox v-else class="w-full h-full -mt-10" direction="column">
      <FrownIcon class="h-20 w-20 mx-auto text-white" color="white"/>
      <h1 class="text-[38px] font-bold text-center ">Your order is empty</h1>
    </FlexBox>
  </FlexBox>
</template>