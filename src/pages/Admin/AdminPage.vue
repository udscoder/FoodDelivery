<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {ref} from "vue";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useUsers} from "@/hooks/useUsers.ts";
import {DataTable, type DataTableColumn} from "@/components/ui/table";
import type {IUsers} from "@/types/users.ts";

const activePage = ref("Profile")

const profilePages = [
  {
    id: 2,
    name: "Users",
  },
  {
    id: 3,
    name: "Roles",
  },
  {
    id: 4,
    name: "Admins",
  },
  {
    id: 5,
    name: "Couriers",
  },
  {
    id: 6,
    name: "Restaurant-Owners",
  }
]

const userColumns: DataTableColumn<IUsers>[] = [
  {key: "id", header: "ID", width: "80px"},
  {key: "email", header: "Email"},
  {key: "role", header: "Role"},
  {key: "is_active", header: "Status"},
  {key: "SUPERADMIN.name", header: "Name"},
  {key: "SUPERADMIN.phone_number", header: "Phone"},
  {
    key: "created_at",
    header: "Created At",
    align: "right",
    format: (value: string) => new Date(value).toLocaleDateString(),
  },
]

const {data: users, isLoading: isLoadingUsers} = useUsers()

function changeActivePage(value: string) {
  activePage.value = value
}
</script>

<template>
  <FlexBox gap="20px" direction="column" class="mt-30 gap-6 px-10">
    <FlexBox align="center" class="w-full">
      <Tabs default-value="Profile" @update:model-value="changeActivePage(String($event))">
        <TabsList class="w-full justify-start overflow-x-auto bg-foreground text-white p-3">
          <TabsTrigger
              v-for="page in profilePages"
              :key="page.id"
              :value="page.name"
              class="text-[16px] cursor-pointer font-normal"
          >
            {{ page.name }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </FlexBox>

    <DataTable
        :columns="userColumns"
        :data="users"
        :loading="isLoadingUsers"
        caption="A list of registered users."
        empty-text="No users found."
        loading-text="Loading users…"
        class="w-full"
    >
      <template #cell-is_active="{ value }">
        <span
            :class="[
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              value
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
            ]"
        >
          {{ value ? "Active" : "Inactive" }}
        </span>
      </template>
    </DataTable>
  </FlexBox>
</template>
