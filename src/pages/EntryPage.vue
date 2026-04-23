<template>
  <section class="flex min-h-screen items-center py-8">
    <div class="w-full rounded-3xl bg-white p-6 shadow-sm">
      <p class="text-center text-sm font-medium text-gray-500">
        사진모아
      </p>

      <div class="mt-6 flex justify-center">
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
          📸
        </div>
      </div>

      <h1 class="mt-6 text-center text-2xl font-bold text-gray-900">
        노희석 ❤️ 이지은
      </h1>

      <p class="mt-2 text-center text-sm text-gray-500">
        2026.04.25 Wedding
      </p>

      <p class="mt-6 text-center text-base leading-7 text-gray-700">
        오늘의 소중한 순간을 함께 남겨주세요.
        <br />
        사진 업로드와 사진 보기를 쉽게 이용할 수 있어요.
      </p>

      <div class="mt-8 space-y-3">
        <RouterLink :to="`/e/${eventCode}/upload`"
          class="block w-full rounded-2xl bg-gray-900 px-4 py-4 text-center text-base font-semibold text-white transition active:scale-[0.99]">
          사진 올리기
        </RouterLink>

        <RouterLink :to="`/e/${eventCode}/access`"
          class="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-center text-base font-semibold text-gray-900 transition active:scale-[0.99]">
          사진 보기
        </RouterLink>
      </div>

      <div class="mt-8 rounded-2xl bg-gray-50 p-4">
        <p class="text-sm font-semibold text-gray-800">
          이용 안내
        </p>
        <ul class="mt-2 space-y-1 text-sm leading-6 text-gray-600">
          <li>사진 업로드는 로그인 없이 가능합니다.</li>
          <li>사진 보기는 비밀번호 입력 후 이용할 수 있습니다.</li>
          <li>여러 장의 사진도 한 번에 업로드할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const eventCode = computed(() => {
  const value = route.params.eventCode
  return typeof value === 'string' ? value : 'sample-event'
})
</script>