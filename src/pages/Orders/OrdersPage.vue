<script setup>
import {ref, computed} from 'vue';
import FlexBox from "@/components/ui/FlexBox.vue";
import {Button} from "@/components/ui/button/index.ts";
import {formatCurrency, formatDate} from "@/lib/utils.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const activeTab = ref('ACTIVE');

const mockOrders = ref([
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    customerId: "customer-999",
    restaurantId: "restaurant-evos",
    restaurantName: "Evos Premium",
    courierId: "courier-111",
    status: "CREATED",
    totalPrice: 15000,
    currency: "UZS",
    createdAt: "2026-07-01T10:20:25.100Z",
    updatedAt: "2026-07-01T10:20:25.100Z",
    items: [
      {
        id: "item-001",
        menuItemId: "menu-burger",
        name: "Evos Burger",
        qty: 1,
        price: 15000
      }
    ]
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afb7",
    customerId: "customer-999",
    restaurantId: "restaurant-evos",
    restaurantName: "Evos Premium",
    courierId: "courier-111",
    status: "PREPARING",
    totalPrice: 15000,
    currency: "UZS",
    createdAt: "2026-07-01T10:20:25.100Z",
    updatedAt: "2026-07-01T10:25:00.100Z",
    items: [
      {
        id: "item-001",
        menuItemId: "menu-burger",
        name: "Evos Burger",
        qty: 1,
        price: 15000
      }
    ]
  },
  {
    id: "3fa25f64-5717-4562-b3fc-2c963f66afc8",
    customerId: "customer-999",
    restaurantId: "restaurant-evos",
    restaurantName: "Evos Premium",
    courierId: "courier-111",
    status: "DELIVERED",
    totalPrice: 60000,
    currency: "UZS",
    createdAt: "2026-07-01T09:10:00.100Z",
    updatedAt: "2026-07-01T09:40:00.100Z",
    items: [
      {
        id: "item-002",
        menuItemId: "menu-lavash",
        name: "Lavash Standard",
        qty: 2,
        price: 30000
      }
    ]
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afd9",
    customerId: "customer-999",
    restaurantId: "restaurant-evos",
    restaurantName: "Evos Premium",
    courierId: "",
    status: "CANCELLED",
    totalPrice: 70000,
    currency: "UZS",
    createdAt: "2026-06-30T18:15:00.100Z",
    updatedAt: "2026-06-30T18:18:00.100Z",
    items: [
      {
        id: "item-003",
        menuItemId: "menu-combo",
        name: "Family Combo Box",
        qty: 1,
        price: 70000
      }
    ]
  }
]);

const filteredOrders = computed(() => {
  return mockOrders.value.filter(order => {
    if (activeTab.value === 'CANCELLED') {
      return order.status === 'CANCELLED';
    }
    if (activeTab.value === 'PAST') {
      return order.status === 'DELIVERED';
    }
    if (activeTab.value === 'ACTIVE') {
      return ['CREATED', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING'].includes(order.status);
    }
    return false;
  });
});

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'CREATED':
    case 'CONFIRMED':
      return 'bg-blue-600 text-white';
    case 'PREPARING':
    case 'READY':
      return 'bg-amber-500 text-white';
    case 'DELIVERING':
      return 'bg-indigo-600 text-white';
    case 'DELIVERED':
      return 'bg-green-600 text-white';
    case 'CANCELLED':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};


const viewOrderDetails = (orderId) => {
  router.push(`/orders/${orderId}`);
};
</script>

<template>
  <FlexBox gap="20px" align="start" justify="start" direction="column" class="w-full   text-slate-900 font-sans px-20 mt-30">
    <h1 class="text-3xl font-bold  text-slate-900">My Orders</h1>

    <FlexBox gap="5px">
      <Button
          @click="activeTab = 'ACTIVE'"
          :class="[
            'px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            activeTab === 'ACTIVE' ? 'bg-[#0f172a] text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
          ]"
      >
        Active Orders
      </Button>

      <Button
          @click="activeTab = 'PAST'"
          :class="[
            'px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            activeTab === 'PAST' ? 'bg-[#0f172a] text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
          ]"
      >
        Past Orders
      </Button>

      <Button
          @click="activeTab = 'CANCELLED'"
          :class="[
            'px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            activeTab === 'CANCELLED' ? 'bg-[#0f172a] text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
          ]"
      >
        Cancelled
      </Button>
    </FlexBox>

    <FlexBox direction="column" class="w-full bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-sm">
      <FlexBox v-if="filteredOrders.length === 0" class="p-12 text-center text-gray-500">
        No orders found in this category.
      </FlexBox>

      <FlexBox
          v-for="order in filteredOrders"
          :key="order.id"
          justify="space-between"

          class="w-full p-6 md:flex-row md:items-center gap-6 hover:bg-gray-50/50 transition-colors"
      >
        <FlexBox align="start" justify="start" gap="16px" class="w-full flex-1">
          <div
              class="w-16 h-16 bg-[#1e293b] rounded-xl flex items-center justify-center text-amber-400 font-black text-xs tracking-wider shrink-0 shadow-inner">
            <span>EVOS</span>
          </div>

          <FlexBox direction="column" align="start">
            <FlexBox gap="10px">
              <h3 class="font-bold text-lg text-slate-900">
                Order #{{ order.id.slice(0, 8) }}... / {{ order.restaurantName }}
              </h3>

              <span :class="getStatusBadgeClass(order.status)"
                    class="text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
                  Status: {{ order.status }}
                </span>
            </FlexBox>

            <p class="text-sm text-slate-600 font-medium">Restaurant: {{ order.restaurantName }}</p>

            <FlexBox class="pt-1 text-sm text-slate-500">
              <FlexBox gap="8px" v-for="item in order.items" :key="item.id" class="flex items-center">
                <span>- {{ item.name }} x{{ item.qty }}</span>
                <span class="text-gray-400">({{ formatCurrency(item.price, order.currency) }})</span>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox gap="40px">
          <FlexBox  direction="column" align="start" class="text-slate-600">
            <span class="block text-xs text-gray-400 font-medium uppercase tracking-wider">Created</span>
            <span class="font-medium">{{ formatDate(order.createdAt) }}</span>
          </FlexBox>

          <FlexBox direction="column" align="start" class="text-slate-900">
            <span class="block text-xs text-gray-400 font-medium uppercase tracking-wider">Total Price</span>
            <span class="font-bold text-base">{{ formatCurrency(order.totalPrice, order.currency) }}</span>
          </FlexBox>

          <FlexBox gap="20px">
              <span :class="getStatusBadgeClass(order.status)"
                    class="hidden md:inline-block text-xs font-bold px-3 py-1.5 rounded-md tracking-wide">
                Status: {{ order.status }}
              </span>
            <Button
                @click="viewOrderDetails(order.id)"
                class="bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Track Order
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  </FlexBox>
</template>
