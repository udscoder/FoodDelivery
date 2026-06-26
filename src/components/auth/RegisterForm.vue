<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from 'yup'
import { useRegister } from "@/hooks/useAuth.ts"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlexBox from "@/components/ui/FlexBox.vue"

const props = defineProps<{ email: string, code: string }>()

const { handleSubmit } = useForm({
  initialValues: { name: '', password: '' },
  validationSchema: yup.object({
    name: yup.string().required("Name is required"),
    password: yup.string().min(6).required("Password is required"),
  }),
})

const { mutate: register, isPending } = useRegister()

const onSubmit = handleSubmit((values) => {
  register({ ...values, email: props.email, role_id: 0, otpToken: props.code }, {
    onSuccess: () => location.reload()
  })
})
</script>

<template>
  <form @submit="onSubmit">
    <FlexBox direction="column" gap="20px" class="p-6 w-125 rounded-2xl border-2 border-secondary">
      <h1 class="text-2xl font-bold">Almost there!</h1>
      <p class="text-sm text-muted-foreground">Complete your profile</p>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Full name" v-bind="componentField" />
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

      <Button type="submit" class="w-full" :disabled="isPending">
        {{ isPending ? 'Creating account...' : 'Create Account' }}
      </Button>
    </FlexBox>
  </form>
</template>