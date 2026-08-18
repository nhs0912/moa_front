<template>
  <header class="fixed left-0 right-0 top-0 z-50
           border-b border-slate-200
           bg-white/95 backdrop-blur
           transition-transform duration-300" :class="{
            '-translate-y-full': !visible,
            'translate-y-0': visible,
          }">
    <div class="flex h-16 w-full items-center
             px-4
             sm:px-6
             md:px-8
             lg:px-10
             xl:px-14
             2xl:px-20">
      <!-- Logo -->
      <button type="button" class="shrink-0 text-xl font-bold
               tracking-tight text-slate-900" @click="moveTo('home')">
        SajinMoa
      </button>

      <!-- PC Navigation -->
      <nav class="ml-12 hidden items-center gap-2 lg:flex">
        <button v-for="item in desktopMenus" :key="item.name" type="button" class="relative rounded-lg px-4 py-2
                 text-sm font-medium transition" :class="isActive(item.name)
                  ? 'text-slate-950'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  " @click="moveTo(item.name)">
          {{ item.label }}

          <span v-if="isActive(item.name)" class="absolute -bottom-[13px]
                   left-1/2 h-0.5 w-6
                   -translate-x-1/2
                   rounded-full bg-slate-900" />
        </button>
      </nav>

      <!-- Right Actions -->
      <div class="ml-auto flex items-center gap-1">
        <!-- Search -->
        <button type="button" class="flex h-10 w-10 items-center
                 justify-center rounded-full
                 text-slate-600 transition
                 hover:bg-slate-100
                 hover:text-slate-900" aria-label="검색" @click="moveTo('search')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m21 21-4.35-4.35
                 m2.1-5.4
                 a7.5 7.5 0 11-15 0
                 a7.5 7.5 0 0115 0z" />
          </svg>
        </button>

        <!-- Account -->
        <button type="button" class="flex h-10 w-10 items-center
                 justify-center rounded-full
                 text-slate-600 transition
                 hover:bg-slate-100
                 hover:text-slate-900" aria-label="내 정보" @click="moveTo('mypage')">
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
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

import {
  useRoute,
  useRouter,
} from "vue-router";

const router = useRouter();
const route = useRoute();

const visible = ref(true);

let lastScrollY = 0;

const desktopMenus = [
  {
    label: "홈",
    name: "home",
  },
  {
    label: "알림",
    name: "notifications",
  },
  {
    label: "채팅",
    name: "chat",
  },
  {
    label: "이벤트",
    name: "events",
  },
];

const moveTo = (name: string) => {
  if (route.name === name) {
    return;
  }

  router.push({
    name,
  });
};

const isActive = (name: string) => {
  /*
   * 이벤트 상세/생성에서도
   * 이벤트 메뉴가 활성화되도록 처리
   */
  if (
    name === "events" &&
    (
      route.name === "event-detail" ||
      route.name === "event-create"
    )
  ) {
    return true;
  }

  return route.name === name;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // 최상단에서는 항상 표시
  if (currentScrollY <= 10) {
    visible.value = true;
    lastScrollY = currentScrollY;
    return;
  }

  // 아래로 스크롤
  if (currentScrollY > lastScrollY) {
    visible.value = false;
  }

  // 위로 스크롤
  if (currentScrollY < lastScrollY) {
    visible.value = true;
  }

  lastScrollY = currentScrollY;
};

onMounted(() => {
  lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    },
  );
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "scroll",
    handleScroll,
  );
});
</script>