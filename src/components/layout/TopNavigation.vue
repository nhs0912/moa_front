<template>
  <header class="fixed left-0 right-0 top-0 z-50
           border-b border-slate-200
           bg-white/95 backdrop-blur
           transition-transform duration-300" :class="{
            '-translate-y-full': !visible,
            'translate-y-0': visible,
          }">
    <div class="mx-auto flex h-16 max-w-7xl
             items-center justify-between
             px-5 sm:px-6 lg:px-8">
      <!-- Logo -->
      <button type="button" class="text-xl font-bold tracking-tight text-slate-900" @click="goHome">
        SajinMoa
      </button>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <!-- Search -->
        <button type="button" class="flex h-10 w-10 items-center justify-center
                 rounded-full text-slate-600 transition
                 hover:bg-slate-100 hover:text-slate-900" aria-label="검색" @click="goSearch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m21 21-4.35-4.35
                 m2.1-5.4
                 a7.5 7.5 0 11-15 0
                 a7.5 7.5 0 0115 0z" />
          </svg>
        </button>

        <!-- Account -->
        <button type="button" class="flex h-10 w-10 items-center justify-center
                 rounded-full text-slate-600 transition
                 hover:bg-slate-100 hover:text-slate-900" aria-label="내 계정" @click="goMyPage">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.75 6
                 a3.75 3.75 0 11-7.5 0
                 3.75 3.75 0 017.5 0z
                 M4.5 20.118
                 a7.5 7.5 0 0115 0
                 A17.933 17.933 0 0112 21.75
                 c-2.676 0-5.216-.584-7.5-1.632z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const visible = ref(true)

let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY

  // 화면 최상단에서는 항상 표시
  if (currentScrollY <= 10) {
    visible.value = true
    lastScrollY = currentScrollY
    return
  }

  // 아래로 내리는 중
  if (currentScrollY > lastScrollY) {
    visible.value = false
  }

  // 위로 올리는 중
  if (currentScrollY < lastScrollY) {
    visible.value = true
  }

  lastScrollY = currentScrollY
}

const goHome = () => {
  router.push({
    name: 'home',
  })
}

const goSearch = () => {
  router.push({
    name: 'search',
  })
}

const goMyPage = () => {
  router.push({
    name: 'mypage',
  })
}

onMounted(() => {
  lastScrollY = window.scrollY

  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true },
  )
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'scroll',
    handleScroll,
  )
})
</script>