<script setup lang="ts">
import { ref } from "vue"
import FlexBox from "@/components/ui/FlexBox.vue"
import LoginForm from "@/components/auth/LoginForm.vue"
import SendOtpForm from "@/components/auth/SendOtpForm.vue"
import VerifyOtpForm from "@/components/auth/VerifyOtpForm.vue"
import RegisterForm from "@/components/auth/RegisterForm.vue"

const step = ref<'login' | 'send-otp' | 'verify-otp' | 'register'>('login')
const registeredEmail = ref('')
const registeredCode = ref('')
</script>

<template>
  <FlexBox class="w-full h-screen">
    <LoginForm
        v-if="step === 'login'"
        @create-account="step = 'send-otp'"
    />
    <SendOtpForm
        v-else-if="step === 'send-otp'"
        @success="(email: string) => { registeredEmail = email; step = 'verify-otp' }"
        @back="step = 'login'"
    />
    <VerifyOtpForm
        v-else-if="step === 'verify-otp'"
        :email="registeredEmail"
        :code="registeredCode"
        @success="(code: string) => { registeredCode = code; step = 'register' }"
        @back="step = 'send-otp'"
    />
    <RegisterForm
        v-else-if="step === 'register'"
        :email="registeredEmail"
        :code="registeredCode"
    />
  </FlexBox>
</template>