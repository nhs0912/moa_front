<template>
  <main class="flex min-h-screen items-center justify-center bg-zinc-50 p-6 font-sans antialiased" :style="{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import bgImage from '@/assets/invitation.png'
</script>