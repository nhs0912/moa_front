<template>
  <div class="min-h-screen w-full bg-slate-50">
    <TopNavigation />

    <main class="min-h-screen w-full
             pt-16
             pb-[calc(4rem+env(safe-area-inset-bottom))]
             lg:pb-0">
      <RouterView />
    </main>

    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import TopNavigation from "@/components/layout/TopNavigation.vue";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
</script>