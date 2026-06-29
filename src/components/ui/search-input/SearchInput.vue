<script setup lang="ts">
import { ref } from 'vue'
import { Search, X } from 'lucide-vue-next'

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Search in Eats'
})

const emit = defineEmits<{
  search: [value: string]
}>()

const query = ref('')
</script>


<template>
  <div class="flex items-center gap-2.5 bg-[#1a1a1a] rounded-full px-4 py-2.5 ">
    <Search class="h-4 w-4 text-neutral-400 shrink-0" />

    <input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-neutral-500"
        @keydown.enter="emit('search', query)"
    />

    <button
        v-if="query"
        type="button"
        class="text-neutral-400 hover:text-white transition-colors"
        aria-label="Clear"
        @click="query = ''"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>