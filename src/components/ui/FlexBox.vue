<!-- FlexBox.vue -->
<template>
  <div :style="flexStyles" :class="['flex-e', customClass]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    validator: (v) => ['row', 'row-reverse', 'column', 'column-reverse'].includes(v)
  },
  justify: {
    type: String,
    default: 'center',
    validator: (v) => ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].includes(v)
  },
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].includes(v)
  },
  wrap: {
    type: String,
    default: 'nowrap',
    validator: (v) => ['nowrap', 'wrap', 'wrap-reverse'].includes(v)
  },
  gap: {
    type: String,
    default: '0'
  },
  inline: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})

const flexStyles = computed(() => ({
  display: props.inline ? 'inline-flex' : 'flex',
  flexDirection: props.direction,
  justifyContent: props.justify,
  alignItems: props.align,
  flexWrap: props.wrap,
  gap: props.gap
}))
</script>
