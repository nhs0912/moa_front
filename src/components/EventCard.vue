<template>
  <article class="group cursor-pointer overflow-hidden rounded-2xl
           bg-white shadow-sm ring-1 ring-slate-100
           transition duration-200
           hover:-translate-y-1 hover:shadow-xl">
    <div class="relative h-48 overflow-hidden bg-slate-100">
      <img v-if="event.coverImageUrl" :src="event.coverImageUrl" :alt="event.eventName" class="h-full w-full object-cover transition duration-300
               group-hover:scale-105" />

      <div v-else class="flex h-full items-center justify-center
               bg-linear-to-br from-slate-100 to-slate-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-12 w-12 text-slate-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159
               a2.25 2.25 0 013.182 0l5.159 5.159
               m-1.5-1.5 1.409-1.409
               a2.25 2.25 0 013.182 0l2.909 2.909
               m-18 3.75h16.5
               a1.5 1.5 0 001.5-1.5V6
               a1.5 1.5 0 00-1.5-1.5H3.75
               A1.5 1.5 0 002.25 6v12
               a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
        </svg>
      </div>

      <div class="absolute left-3 top-3">
        <span :class="[
          'rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
          event.role === 'OWNER'
            ? 'bg-slate-900 text-white'
            : 'bg-white/90 text-slate-700 backdrop-blur',
        ]">
          {{ roleLabel }}
        </span>
      </div>
    </div>

    <div class="p-5">
      <h3 class="truncate text-lg font-bold text-slate-900
               transition group-hover:text-indigo-600">
        {{ event.eventName }}
      </h3>

      <p v-if="event.eventDate" class="mt-1 text-sm text-slate-500">
        {{ formattedEventDate }}
      </p>

      <div class="mt-5 flex items-center gap-4
               border-t border-slate-100 pt-4">
        <div class="flex items-center gap-1.5 text-sm text-slate-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m2.25 15.75 5.159-5.159
                 a2.25 2.25 0 013.182 0l5.159 5.159
                 m-1.5-1.5 1.409-1.409
                 a2.25 2.25 0 013.182 0l2.909 2.909
                 m-18 3.75h16.5" />
          </svg>

          <span>
            {{ event.photoCount ?? 0 }}장
          </span>
        </div>

        <div class="flex items-center gap-1.5 text-sm text-slate-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18 18.72a9.094 9.094 0 003.741-.479
                 3 3 0 00-4.682-2.72
                 m.94 3.198.001.031
                 c0 .225-.012.447-.037.666
                 A11.944 11.944 0 0112 21
                 c-2.17 0-4.203-.576-5.963-1.584
                 A6.062 6.062 0 016 18.719
                 m12 0a5.971 5.971 0 00-.941-3.197
                 m0 0A5.995 5.995 0 0012 12.75
                 a5.995 5.995 0 00-5.058 2.772
                 m0 0a3 3 0 00-4.681 2.72
                 8.986 8.986 0 003.74.477
                 m.94-3.197a5.971 5.971 0 00-.941
                 3.197M15 6.75a3 3 0 11-6 0
                 3 3 0 016 0zm6 3a2.25 2.25
                 0 11-4.5 0 2.25 2.25
                 0 014.5 0zm-13.5 0a2.25 2.25
                 0 11-4.5 0 2.25 2.25
                 0 014.5 0z" />
          </svg>

          <span>
            {{ event.participantCount ?? 0 }}명
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventSummary } from '@/api/eventApi'

const props = defineProps<{
  event: EventSummary
}>()

const roleLabel = computed(() => {
  return props.event.role === 'OWNER'
    ? '내가 만든 이벤트'
    : '참여 중'
})

const formattedEventDate = computed(() => {
  if (!props.event.eventDate) {
    return ''
  }

  const date = new Date(props.event.eventDate)

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
})
</script>