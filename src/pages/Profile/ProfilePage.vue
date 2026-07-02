<script setup lang="ts">
import FlexBox from "@/components/ui/FlexBox.vue";
import {ref} from "vue";
import ProfileUsersTab from "@/components/profile/ProfileUsersTab.vue";
import useAuthStore from "@/stores/auth.ts";
import {Avatar} from "@/components/ui/avatar";
import {useRole} from "@/hooks/useRoles.ts";
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter()
const authStore = useAuthStore()
const { isAdmin,  } = useRole()

const activePage = ref("Profile")

function handleLogout() {
  authStore.logOut()
  router.push('/login')
}
</script>

<template>
  <FlexBox gap="30px" align="start" justify="start" direction="column" class="w-full mt-30 px-10">
    <FlexBox direction="column" justify="start" v-if="activePage === 'Profile'" align="start"  class="w-full bg-foreground rounded-2xl text-white p-5">
      <FlexBox class="w-full " justify="space-between" align="start">
        <FlexBox align="start"  gap="20px" >
          <Avatar :src="authStore.user?.avatar" class="w-[120px] h-[120px]  " />

          <FlexBox justify="space-between" direction="column" align="start" class="h-full">
            <FlexBox class="bg-primary rounded-full px-3 font-bold text-[14px]">
              {{authStore.user?.role}}
            </FlexBox>

            <FlexBox direction="column" align="start">
              <h1 class="font-bold text-[42px]">{{authStore.user?.name}}</h1>
              <h2 class="font-extra-light text-white/70 text-[18px]">{{authStore.user?.email}}</h2>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <Button
            variant="destructive"
            @click="handleLogout()"
        >
          Log Out
        </Button>
      </FlexBox>


      <FlexBox gap="40px" align="start" justify="start" class="mt-15 w-full">
        <FlexBox align="start" direction="column" class="border border-white/20 rounded-2xl px-5 py-1 w-full h-15">
          <p class="text-white/50 text-[14px] font-medium">Name</p>

          <h1 class="font-bold text-[18px]"> {{authStore.user?.name}}</h1>
        </FlexBox>

        <FlexBox align="start" direction="column" class="border border-white/20 rounded-2xl px-5 py-1 w-full h-15">
          <p class="text-white/50 text-[14px] font-medium">Email</p>

          <h1 class="font-bold text-[18px]"> {{authStore.user?.email}}</h1>
        </FlexBox>

        <FlexBox align="start" direction="column" class="border border-white/20 rounded-2xl px-5 py-1 w-full h-15">
          <p class="text-white/50 text-[14px] font-medium">Number</p>

          <h1 class="font-bold text-[18px]"> {{authStore.user?.number || '-'}}</h1>
        </FlexBox>

        <FlexBox align="start" direction="column" class="border border-white/20 rounded-2xl px-5 py-1 w-full h-15">
          <p class="text-white/50 text-[14px] font-medium">Role</p>

          <h1 class="font-bold text-[18px]"> {{authStore.user?.role}}</h1>
        </FlexBox>
      </FlexBox>
    </FlexBox>

    <FlexBox v-if="isAdmin">
      <ProfileUsersTab v-if="activePage === 'Users'" />
    </FlexBox>
  </FlexBox>
</template>