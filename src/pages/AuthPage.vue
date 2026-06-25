<script setup lang="ts">
import FlexBox from '@/components/ui/FlexBox.vue'
import {Button} from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from "@/components/ui/input";
import * as yup from 'yup'
import {useField, useForm} from "vee-validate"
import {useLogin} from "@/hooks/useAuth.ts";

const initialValues = {
  email: '',
  password: ''
}

const schema = yup.object(
  {
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
  }
)

const {errors, handleSubmit} = useForm(({
  initialValues,
  validationSchema: schema
}))

const { mutate: login, isPending } = useLogin()

const onSubmit = handleSubmit((values) => {
  login(values)
})

</script>

<template>
  <FlexBox class="w-full h-screen ">
    <form @submit="onSubmit">
      <FlexBox direction="column" gap="20px" class="p-4 w-125 rounded-2xl border-2 border-secondary">

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
          <Button type="submit" variant="default" class="w-full" :disabled="isPending">Login</Button>
          <Button type="button" variant="outline" class="w-full">Create Account</Button>
        </FlexBox>

      </FlexBox>
    </form>
  </FlexBox>
</template>