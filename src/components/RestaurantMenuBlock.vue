<script lang="ts" setup>
import type {IMenu} from "@/types/menu.ts";
import FlexBox from "@/components/ui/FlexBox.vue";
import {formatPrice} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button";
import {PlusIcon, Minus,} from "lucide-vue-next";
import useMenuStore from "@/stores/menu.ts";

const {menu} = defineProps<{ menu: IMenu }>()

const menuStore = useMenuStore()

const emit = defineEmits<{ (e: 'add-menu', menu: IMenu): void }>()

</script>

<template>
  <FlexBox gap="10px" direction="column" align="start" justify="start"
           class="w-full p-3 bg-foreground rounded-4xl overflow-hidden border border-border hover:shadow-md transition-shadow">
    <img :src="menu.img_product" alt="menu image" class="w-full h-40 rounded-2xl "/>

    <FlexBox direction="column" align="start" justify="start" class="text-white">
      <h1 class="text-[24px] text-[#FA6A3C] font-medium">
        {{ formatPrice(menu.new_price) }} sum
      </h1>

      <h3 class="text-[18px] -mt-2 font-medium opacity-40 line-through">
        {{ formatPrice(menu.price) }} sum
      </h3>

      <h2 class="text-[16px] font-medium">
        {{ menu.name }}
      </h2>

      <p class="mt-8 font-extralight opacity-70 text-[14px]">{{ menu.description }}</p>

      <Button v-if="!menu.quantity" class="h-10 mt-2 w-full" variant="secondary" @click="emit('add-menu', menu)">
        <PlusIcon/>
        Add to cart
      </Button>


      <FlexBox justify="space-between" v-else class="w-full gap-1 rounded-full bg-secondary text-foreground px-2 py-1 mt-2 h-10">
        <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 rounded-full hover:bg-white/10"
            :disabled="menu.quantity == 0"
            @click="menuStore.decrementQuantity(menu)"
        >
          <Minus class="h-4 w-4"/>
        </Button>

        <span class="min-w-[1.5rem] text-center text-sm font-medium ">
      {{ menu.quantity }}
    </span>

        <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 rounded-full  hover:bg-white/10"
            @click="emit('add-menu', menu)"
        >
          <PlusIcon class="h-4 w-4"/>
        </Button>
      </FlexBox>

    </FlexBox>

  </FlexBox>
</template>