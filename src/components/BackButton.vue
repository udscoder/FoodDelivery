<script lang="ts" setup>

import FlexBox from "@/components/ui/FlexBox.vue";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-vue-next"

interface IProps {
  title: string
}

defineProps<IProps>()
const emit = defineEmits<{click: []}>()

</script>

<template>
  <FlexBox class="bg-foreground text-white rounded-md cursor-pointer pl-2" @click="emit('click')">
    <ArrowLeft :size="20"/>

    <Button :variant="null" >
      {{title}}
    </Button>
  </FlexBox>
</template>