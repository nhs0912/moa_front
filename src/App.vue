<template>
  <div class="flex min-h-dvh w-full items-center justify-center bg-zinc-100 font-sans antialiased">

    <main class="relative flex h-dvh w-full max-w-112.5 flex-col bg-white shadow-2xl overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

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