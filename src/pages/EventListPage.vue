<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-6
           sm:px-6 sm:py-8
           lg:px-8 lg:py-10">
    <!-- Page Header -->
    <div class="mb-7 flex flex-col gap-4
             sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-1 text-xs font-semibold tracking-wider text-indigo-600">
          MY EVENTS
        </p>

        <h1 class="text-2xl font-bold tracking-tight text-slate-900
                 sm:text-3xl">
          내 이벤트
        </h1>

        <p class="mt-2 text-sm leading-6 text-slate-500">
          내가 만들거나 참여 중인 이벤트를 확인할 수 있어요.
        </p>
      </div>

      <button type="button" class="inline-flex h-11 shrink-0 items-center justify-center
               gap-2 rounded-xl bg-slate-900 px-5
               text-sm font-semibold text-white shadow-sm
               transition hover:bg-slate-800" @click="goToCreateEvent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        이벤트 만들기
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 gap-5
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-4">
      <div v-for="index in 4" :key="index" class="overflow-hidden rounded-2xl
               bg-white shadow-sm ring-1 ring-slate-100">
        <div class="h-48 animate-pulse bg-slate-200" />

        <div class="space-y-3 p-5">
          <div class="h-5 w-2/3 animate-pulse
                   rounded bg-slate-200" />

          <div class="h-4 w-1/2 animate-pulse
                   rounded bg-slate-100" />

          <div class="h-4 w-1/3 animate-pulse
                   rounded bg-slate-100" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="rounded-2xl border border-red-100
             bg-red-50 px-6 py-12 text-center">
      <div class="mx-auto flex h-12 w-12 items-center
               justify-center rounded-full bg-red-100">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-6 w-6 text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v3.75m9-.75
               a9 9 0 11-18 0
               9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>

      <p class="mt-4 font-semibold text-red-700">
        이벤트를 불러오지 못했어요.
      </p>

      <p class="mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </p>

      <button type="button" class="mt-5 rounded-xl bg-white
               px-4 py-2 text-sm font-medium
               text-red-700 shadow-sm ring-1
               ring-red-200 transition
               hover:bg-red-50" @click="loadEvents">
        다시 시도
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="events.length === 0" class="rounded-3xl border border-dashed
             border-slate-300 bg-white
             px-6 py-16 text-center
             sm:py-20">
      <div class="mx-auto flex h-16 w-16
               items-center justify-center
               rounded-full bg-slate-100">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-8 w-8 text-slate-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6.75 3v2.25
               M17.25 3v2.25
               M3.75 9h16.5
               M5.25 4.5h13.5
               a1.5 1.5 0 011.5 1.5v12.75
               a1.5 1.5 0 01-1.5 1.5H5.25
               a1.5 1.5 0 01-1.5-1.5V6
               a1.5 1.5 0 011.5-1.5z" />
        </svg>
      </div>

      <h2 class="mt-5 text-lg font-bold text-slate-900">
        아직 이벤트가 없어요
      </h2>

      <p class="mt-2 text-sm leading-6 text-slate-500">
        새로운 이벤트를 만들어 사진을 함께 모아보세요.
      </p>

      <button type="button" class="mt-6 inline-flex h-11
               items-center justify-center gap-2
               rounded-xl bg-slate-900 px-5
               text-sm font-semibold text-white
               transition hover:bg-slate-800" @click="goToCreateEvent">
        <span class="text-lg">+</span>
        첫 이벤트 만들기
      </button>
    </div>

    <!-- Events -->
    <div v-else class="grid grid-cols-1 gap-5
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-4">
      <!-- Create Event Card -->
      <button type="button" class="group min-h-[300px] overflow-hidden
               rounded-2xl border-2 border-dashed
               border-slate-200 bg-white p-6
               transition duration-200
               hover:-translate-y-1
               hover:border-slate-300
               hover:shadow-lg" @click="goToCreateEvent">
        <div class="flex h-full flex-col
                 items-center justify-center">
          <div class="flex h-14 w-14
                   items-center justify-center
                   rounded-full bg-slate-100
                   text-slate-400 transition
                   group-hover:bg-slate-900
                   group-hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-7 w-7">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>

          <p class="mt-5 text-base font-bold
                   text-slate-900">
            새 이벤트 만들기
          </p>

          <p class="mt-2 max-w-[220px]
                   text-center text-sm
                   leading-6 text-slate-500">
            사진을 함께 모을 새로운 공간을 만들어보세요.
          </p>
        </div>
      </button>

      <EventCard v-for="event in events" :key="event.eventId" :event="event" @click="goToEvent(event.eventId)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import EventCard from "@/components/EventCard.vue";

import {
  getMyEvents,
  type EventSummary,
} from "@/api/eventApi";

const router = useRouter();

const events = ref<EventSummary[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const loadEvents = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    events.value = await getMyEvents();
  } catch (error) {
    console.error("이벤트 조회 실패:", error);

    errorMessage.value =
      "잠시 후 다시 시도해주세요.";
  } finally {
    loading.value = false;
  }
};

const goToEvent = (eventId: number) => {
  router.push({
    name: "event-detail",
    params: {
      eventId,
    },
  });
};

const goToCreateEvent = () => {
  router.push({
    name: "event-create",
  });
};

onMounted(() => {
  loadEvents();
});
</script>