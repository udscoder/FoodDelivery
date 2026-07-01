<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import useAuthStore from "@/stores/auth.ts";
import {onMounted} from "vue";

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script >

<template>

  <Navbar v-if="authStore.isLoggedIn"/>

  <RouterView/>
</template>

<style>
</style>
