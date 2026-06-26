<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from 'yup'
import { useLogin } from "@/hooks/useAuth"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlexBox from "@/components/ui/FlexBox.vue"

const emit = defineEmits<{
  'create-account': []
}>()

const { handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validationSchema: yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
})

const { mutate: login, isPending } = useLogin()

const onSubmit = handleSubmit((values) => {
  login(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <FlexBox direction="column" gap="20px" class="p-6 w-125 rounded-2xl border-2 border-secondary">
      <h1 class="text-2xl font-bold">Login</h1>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FlexBox direction="column" gap="10px" class="w-full">
        <Button type="submit" class="w-full" :disabled="isPending">
          {{ isPending ? 'Logging in...' : 'Login' }}
        </Button>
        <Button type="button" variant="outline" class="w-full" @click="emit('create-account')">
          Create Account
        </Button>
      </FlexBox>
    </FlexBox>
  </form>
</template>