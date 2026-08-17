<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50
           border-t border-slate-200
           bg-white/95
           pb-[env(safe-area-inset-bottom)]
           backdrop-blur">
    <div class="mx-auto grid h-16 max-w-lg grid-cols-5">
      <NavItem label="홈" route-name="home" :active="isActive('home')" @click="moveTo('home')">
        <template #icon>
          <svg viewBox="0 0 24 24" class="h-6 w-6">
            <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M3 11.25 12 3l9 8.25
                 V21h-6v-6H9v6H3z" />
          </svg>
        </template>
      </NavItem>

      <NavItem label="알림" route-name="notifications" :active="isActive('notifications')"
        @click="moveTo('notifications')">
        <template #icon>
          <div class="relative">
            <svg viewBox="0 0 24 24" class="h-6 w-6">
              <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                d="M18 8a6 6 0 10-12 0
                   c0 7-3 7-3 9h18
                   c0-2-3-2-3-9
                   M10 21h4" />
            </svg>

            <!-- 나중에 실제 unread count와 연결 -->
            <span v-if="notificationCount > 0" class="absolute -right-2 -top-1
                     flex min-w-4 items-center justify-center
                     rounded-full bg-red-500 px-1
                     text-[10px] font-bold text-white">
              {{ notificationText }}
            </span>
          </div>
        </template>
      </NavItem>

      <NavItem label="채팅" route-name="chat" :active="isActive('chat')" @click="moveTo('chat')">
        <template #icon>
          <svg viewBox="0 0 24 24" class="h-6 w-6">
            <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M21 15
                 a4 4 0 01-4 4H8l-5 3V7
                 a4 4 0 014-4h10
                 a4 4 0 014 4z" />
          </svg>
        </template>
      </NavItem>

      <NavItem label="이벤트" route-name="events" :active="isActive('events')" @click="moveTo('events')">
        <template #icon>
          <svg viewBox="0 0 24 24" class="h-6 w-6">
            <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M6 2v4
                 M18 2v4
                 M3 9h18
                 M5 4h14
                 a2 2 0 012 2v14
                 a2 2 0 01-2 2H5
                 a2 2 0 01-2-2V6
                 a2 2 0 012-2z" />
          </svg>
        </template>
      </NavItem>

      <NavItem label="내 정보" route-name="mypage" :active="isActive('mypage')" @click="moveTo('mypage')">
        <template #icon>
          <svg viewBox="0 0 24 24" class="h-6 w-6">
            <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20 21
                 a8 8 0 00-16 0
                 M12 13
                 a5 5 0 100-10
                 a5 5 0 000 10z" />
          </svg>
        </template>
      </NavItem>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavItem from './NavItem.vue'

const route = useRoute()
const router = useRouter()

// 임시값
const notificationCount = 3

const notificationText = computed(() => {
  return notificationCount > 99
    ? '99+'
    : String(notificationCount)
})

const moveTo = (name: string) => {
  if (route.name === name) {
    return
  }

  router.push({
    name,
  })
}

const isActive = (name: string) => {
  return route.name === name
}
</script>