<script setup lang="ts">
import { computed } from 'vue'
import FlexBox from "@/components/ui/FlexBox.vue"
import { useRoute, useRouter } from "vue-router"
import { formatCurrency, formatDate } from "@/lib/utils.ts"
import BackButton from "@/components/BackButton.vue"
import { useOrdersById } from "@/hooks/useOrders.ts"

const router = useRouter()
const route = useRoute()
const id = route.params.id as string

const { data: orderData, isLoading } = useOrdersById(id)

const statusSteps = ['CREATED', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'DELIVERED']

const currentStatusIndex = computed(() => {
  if (!orderData.value) return -1
  return statusSteps.indexOf(orderData.value.status)
})

const statusDescription = computed(() => {
  if (!orderData.value) return ''  // ← null check
  const map: Record<string, string> = {
    CREATED: 'Order received. Waiting for restaurant confirmation.',
    CONFIRMED: 'Restaurant accepted your order!',
    PREPARING: 'The kitchen is preparing your meal.',
    READY: 'Food is ready! Waiting for courier.',
    DELIVERING: 'Your courier is on their way!',
    DELIVERED: 'Enjoy your meal!',
    CANCELLED: 'This order was cancelled.',
  }
  return map[orderData.value.status] ?? ''
})

const getStatusBadgeClass = (status: string): string => {
  const map: Record<string, string> = {
    CREATED: 'bg-blue-600 text-white',
    CONFIRMED: 'bg-blue-600 text-white',
    PREPARING: 'bg-amber-500 text-white',
    READY: 'bg-amber-500 text-white',
    DELIVERING: 'bg-indigo-600 text-white',
    DELIVERED: 'bg-green-600 text-white',
    CANCELLED: 'bg-red-600 text-white',
  }
  return map[status] ?? 'bg-gray-500 text-white'
}

const goBackToOrders = () => {
  router.push('/orders')
}
</script>

<template>
  <FlexBox gap="24px" align="start" justify="start" direction="column" class="w-full text-slate-900 font-sans px-20 mt-30">
    <BackButton title="Back To My Orders" @click="goBackToOrders" />

    <div v-if="isLoading" class="w-full text-center py-20 text-gray-400">
      Loading order details...
    </div>

    <template v-else-if="orderData">

      <FlexBox justify="space-between" align="center" class="w-full border-b border-gray-100 pb-4">
        <FlexBox direction="column" align="start" gap="4px">
          <h1 class="text-3xl font-bold text-slate-900">
            Order Details / #{{ orderData.id.slice(0, 8) }}...
          </h1>
          <p class="text-sm text-gray-500 font-medium">Placed on: {{ formatDate(orderData.createdAt) }}</p>
        </FlexBox>
        <span :class="getStatusBadgeClass(orderData.status)" class="text-sm font-bold px-4 py-2 rounded-lg uppercase">
          {{ orderData.status }}
        </span>
      </FlexBox>

      <FlexBox v-if="orderData.status !== 'CANCELLED'" direction="column" gap="24px" class="w-full bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
        <div class="relative w-full flex justify-between items-center px-4 mt-4">
          <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
          <div
              class="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0"
              :style="{ width: `calc(${(currentStatusIndex / (statusSteps.length - 1)) * 100}% - 24px)` }"
          ></div>

          <FlexBox
              v-for="(step, idx) in statusSteps"
              :key="step"
              direction="column"
              align="center"
              class="relative z-10 shrink-0"
          >
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all',
              idx <= currentStatusIndex ? 'bg-blue-600 border-blue-200 text-white' : 'bg-white border-gray-200 text-gray-400'
            ]">
              <span v-if="idx <= currentStatusIndex">✓</span>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span :class="['text-xs font-bold mt-2 uppercase', idx <= currentStatusIndex ? 'text-blue-600' : 'text-gray-400']">
              {{ step }}
            </span>
          </FlexBox>
        </div>

        <div class="w-full text-center font-semibold text-lg text-slate-800 pt-4 border-t border-gray-50">
          {{ statusDescription }}
        </div>
      </FlexBox>

      <FlexBox v-else class="w-full bg-red-50 text-red-800 p-6 rounded-xl border border-red-200 font-semibold text-lg">
        ✕ This order was cancelled.
      </FlexBox>

      <FlexBox align="start" gap="24px" class="w-full mb-10">

        <FlexBox direction="column" align="start" class="flex-[1.8] w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div class="p-5 border-b border-gray-100 w-full bg-gray-50/50">
            <h2 class="font-bold text-lg text-slate-900">Your Receipt</h2>
          </div>

          <FlexBox direction="column" class="w-full divide-y divide-gray-100 p-6">
            <FlexBox
                v-for="item in orderData.items"
                :key="item.id"
                justify="space-between"
                align="center"
                class="w-full py-4 first:pt-0 last:pb-0"
            >
              <FlexBox direction="column" align="start" gap="4px">
                <span class="font-bold text-slate-900">{{ item.name }}</span>
                <span class="text-sm text-gray-400">Unit: {{ formatCurrency(item.price.toString(), orderData.currency) }}</span>
              </FlexBox>
              <span class="text-slate-600 font-semibold text-sm">x{{ item.qty }}</span>
              <span class="font-bold text-slate-900">{{ formatCurrency((item.price * item.qty).toString(), orderData.currency) }}</span>
            </FlexBox>
          </FlexBox>

          <FlexBox justify="space-between" class="w-full p-6 bg-gray-50 border-t border-gray-100">
            <span class="text-lg font-bold text-slate-900">Total</span>
            <span class="text-xl font-black text-slate-900">{{ formatCurrency(orderData.totalPrice.toString(), orderData.currency) }}</span>
          </FlexBox>
        </FlexBox>

        <FlexBox direction="column" gap="20px" class="flex-1 w-full">
          <FlexBox direction="column" align="start" gap="12px" class="w-full bg-[#1e293b] text-white p-6 rounded-xl">
            <h3 class="font-bold uppercase text-amber-400">Delivery Details</h3>
            <FlexBox direction="column" align="start" gap="4px" class="text-sm text-slate-200">
              <span class="font-bold text-white">Address:</span>
              <span>Mock Delivery Street, Build 13</span>
              <span>Tashkent, Uzbekistan</span>
            </FlexBox>
          </FlexBox>

          <FlexBox direction="column" align="start" gap="8px" class="w-full bg-white border border-gray-200 p-6 rounded-xl">
            <span class="text-xs font-bold text-gray-400 uppercase">Restaurant Info</span>
            <h4 class="font-bold text-lg text-slate-900">{{ orderData.restaurantName }}</h4>
            <p class="text-sm text-slate-500">Id: {{ orderData.restaurantId }}</p>
          </FlexBox>
        </FlexBox>

      </FlexBox>
    </template>

  </FlexBox>
</template>