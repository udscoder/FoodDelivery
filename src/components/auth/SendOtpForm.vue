<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from 'yup'
import { useSendOtp } from "@/hooks/useAuth"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlexBox from "@/components/ui/FlexBox.vue"

const emit = defineEmits<{
  success: [email: string]
  back: []
}>()

const { handleSubmit } = useForm({
  initialValues: { email: '' },
  validationSchema: yup.object({
    email: yup.string().email().required("Email is required"),
  }),
})

const { mutate: sendOtp, isPending } = useSendOtp()

const onSubmit = handleSubmit((values) => {
  sendOtp(values.email, {
    onSuccess: () => emit('success', values.email)
  })
})
</script>

<template>
  <form @submit="onSubmit">
    <FlexBox direction="column" gap="20px" class="p-6 w-125 rounded-2xl border-2 border-secondary">
      <h1 class="text-2xl font-bold">Create Account</h1>
      <p class="text-sm text-muted-foreground">Enter your email to receive a verification code</p>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FlexBox direction="column" gap="10px" class="w-full">
        <Button type="submit" class="w-full" :disabled="isPending">
          {{ isPending ? 'Sending...' : 'Send OTP Code' }}
        </Button>
        <Button type="button" variant="outline" class="w-full" @click="emit('back')">
          Back to Login
        </Button>
      </FlexBox>
    </FlexBox>
  </form>
</template>