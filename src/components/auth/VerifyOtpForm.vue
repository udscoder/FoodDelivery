<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from 'yup'
import { useVerifyOtp } from "@/hooks/useAuth.ts"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FlexBox from "@/components/ui/FlexBox.vue"

const props = defineProps<{ email: string }>()
const emit = defineEmits<{
  success: [code: string]
  back: []
}>()

const { handleSubmit } = useForm({
  initialValues: { code: '' },
  validationSchema: yup.object({
    code: yup.string().required("OTP code is required"),
  }),
})

const { mutate: verifyOtp, isPending } = useVerifyOtp()

const onSubmit = handleSubmit((values) => {
  verifyOtp({ email: props.email, code: values.code }, {
    onSuccess: (data) => emit('success', data.otpToken)
  })
})
</script>

<template>
  <form @submit="onSubmit">
    <FlexBox direction="column" gap="20px" class="p-6 w-125 rounded-2xl border-2 border-secondary">
      <h1 class="text-2xl font-bold">Verify Email</h1>
      <p class="text-sm text-muted-foreground">
        Code sent to <span class="font-medium text-foreground">{{ email }}</span>
      </p>

      <FormField v-slot="{ componentField }" name="code">
        <FormItem>
          <FormLabel>OTP Code</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Enter OTP code" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FlexBox direction="column" gap="10px" class="w-full">
        <Button type="submit" class="w-full" :disabled="isPending">
          {{ isPending ? 'Verifying...' : 'Verify Code' }}
        </Button>
        <Button type="button" variant="outline" class="w-full" @click="emit('back')">
          Back
        </Button>
      </FlexBox>
    </FlexBox>
  </form>
</template>