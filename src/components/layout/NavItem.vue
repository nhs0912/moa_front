<template>
  <button type="button" class="flex min-w-0 flex-col
           items-center justify-center gap-1
           transition-colors" :class="active
            ? 'text-slate-900'
            : 'text-slate-400 hover:text-slate-600'
            ">
    <div class="relative">
      <slot name="icon" />
    </div>

    <span class="truncate text-[11px]" :class="active ? 'font-semibold' : 'font-medium'">
      {{ label }}
    </span>

    <!-- 선택된 탭 표시 -->
    <div class="absolute bottom-0 h-0.5 w-8
             rounded-full bg-slate-900
             transition-opacity" :class="active ? 'opacity-100' : 'opacity-0'" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  routeName: string
  active: boolean
}>()
</script>