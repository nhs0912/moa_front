<template>
  <section class="w-full px-4 py-6
           sm:px-6
           md:px-8
           lg:px-10 lg:py-10
           xl:px-14
           2xl:px-20">
    <div class="mb-8 flex flex-col gap-4
             sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold tracking-wider text-indigo-600">
          MY EVENTS
        </p>

        <h1 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          내 이벤트
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          내가 만들거나 참여 중인 이벤트를 확인할 수 있어요.
        </p>
      </div>

      <button type="button" class="inline-flex h-11 items-center justify-center gap-2
               rounded-xl bg-slate-900 px-5
               text-sm font-semibold text-white
               shadow-sm transition hover:bg-slate-800" @click="goToCreateEvent">
        <span class="text-xl">+</span>
        이벤트 만들기
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 gap-5
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-4
             2xl:grid-cols-5">
      <div v-for="index in 5" :key="index" class="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div class="h-48 animate-pulse bg-slate-200" />

        <div class="space-y-3 p-5">
          <div class="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div class="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="errorMessage" class="rounded-2xl border border-red-200
             bg-red-50 px-6 py-16 text-center">
      <p class="font-semibold text-red-600">
        이벤트를 불러오지 못했어요.
      </p>

      <p class="mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </p>

      <button type="button" class="mt-5 rounded-xl bg-white px-5 py-2.5
               text-sm font-semibold text-red-600
               ring-1 ring-red-200" @click="loadEvents">
        다시 시도
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="events.length === 0" class="rounded-2xl border border-dashed
             border-slate-300 bg-white
             px-6 py-20 text-center">
      <div class="mx-auto flex h-16 w-16
               items-center justify-center
               rounded-full bg-slate-100
               text-3xl text-slate-400">
        +
      </div>

      <h2 class="mt-5 text-lg font-bold text-slate-900">
        아직 이벤트가 없어요
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        새로운 이벤트를 만들어 사진을 함께 모아보세요.
      </p>

      <button type="button" class="mt-6 rounded-xl bg-slate-900
               px-5 py-3 text-sm font-semibold text-white" @click="goToCreateEvent">
        첫 이벤트 만들기
      </button>
    </div>

    <!-- Events -->
    <div v-else class="grid grid-cols-1 gap-5
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-4
             2xl:grid-cols-5">
      <!-- 새 이벤트 -->
      <button type="button" class="group min-h-[300px]
               rounded-2xl border-2 border-dashed
               border-slate-200 bg-white p-6
               transition
               hover:-translate-y-1
               hover:border-slate-300
               hover:shadow-lg" @click="goToCreateEvent">
        <div class="flex h-full flex-col
                 items-center justify-center">
          <div class="flex h-14 w-14 items-center
                   justify-center rounded-full
                   bg-slate-100 text-3xl
                   text-slate-400 transition
                   group-hover:bg-slate-900
                   group-hover:text-white">
            +
          </div>

          <p class="mt-5 font-bold text-slate-900">
            새 이벤트 만들기
          </p>

          <p class="mt-2 text-sm text-slate-500">
            사진을 함께 모을 새로운 공간
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
    errorMessage.value = "잠시 후 다시 시도해주세요.";
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