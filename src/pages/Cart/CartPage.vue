<script lang="ts" setup>
import CartBlock from "@/components/CartBlock.vue";
import BackButton from "@/components/BackButton.vue";
import FlexBox from "@/components/ui/FlexBox.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const handleClick = () => {
  router.push('/restaurants')
}


</script>

<template>
  <FlexBox align="start" justify="start" gap="30px" class="rounded-md px-5 py-5 mt-26">
    <FlexBox class="fixed left-10 z-99 w-80" align="start" justify="start" direction="column">
      <BackButton title="All Restaurants" @click="handleClick"/>
    </FlexBox>

    <CartBlock class="absolute left-[50%] translate-x-[-50%]"/>
  </FlexBox>
</template>
