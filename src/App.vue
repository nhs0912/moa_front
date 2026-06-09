<template>
  <main class="flex min-h-[100dvh] w-full items-center justify-center bg-zinc-50 p-4 sm:p-8 font-sans antialiased">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
// 사용하지 않는 bgImage와 스타일은 깔끔하게 삭제했습니다!
</script>

<!-- <template> -->
<!-- <main class="flex min-h-screen items-center justify-center bg-zinc-50 p-6 font-sans antialiased" :style="{ -->
// backgroundImage: `url(${bgImage})`,
// backgroundSize: 'cover',
// backgroundPosition: 'center',
<!-- }">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import bgImage from '@/assets/sajin_moa_home.png'
</script> -->