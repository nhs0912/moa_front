<template>
  <div
    class="relative flex w-full max-w-[400px] flex-col items-center overflow-hidden rounded-[40px] bg-white p-12 shadow-2xl shadow-zinc-200/50">

    <p class="text-sm font-medium tracking-wide text-zinc-600/80">
      사진모아
    </p>

    <div class="mt-8 flex flex-col items-center">
      <div class="text-4xl text-zinc-900">📸</div>
    </div>

    <h1 class="mt-8 font-serif text-[28px] font-medium leading-snug tracking-normal text-zinc-950">
      노희석 ❤️ 이지은
    </h1>

    <p class="mt-4 text-base font-semibold text-zinc-800">
      2026.04.25 Wedding
    </p>

    <p class="mt-7 text-center text-base leading-relaxed text-zinc-700/90">
      오늘의 소중한 순간을 함께 남겨주세요.
      <br />
      사진 업로드와 사진 보기를 쉽게 이용할 수 있어요.
    </p>

    <div class="relative z-10 mt-12 flex w-full flex-col gap-4">
      <RouterLink v-slot="{ navigate }" :to="`/e/${eventCode}/upload`" custom>
        <button type="button"
          class="w-full rounded-2xl bg-zinc-950 py-5 text-xl font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98]"
          @click="navigate">
          사진 올리기
        </button>
      </RouterLink>

      <RouterLink v-slot="{ navigate }" :to="`/e/${eventCode}/access`" custom>
        <button type="button"
          class="w-full rounded-2xl border-2 border-zinc-200 bg-white py-5 text-xl font-bold tracking-wide text-zinc-950 shadow-lg transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
          @click="navigate">
          사진 보기
        </button>
      </RouterLink>
    </div>

    <div class="relative z-10 mt-10 w-full text-center">
      <p class="text-sm font-semibold tracking-wide text-zinc-800">이용 안내</p>
      <ul class="mt-2.5 space-y-1.5 text-sm font-medium leading-relaxed text-zinc-600/90">
        <li>사진 업로드는 로그인 없이 가능합니다.</li>
        <li>사진 보기는 비밀번호 입력 후 이용할 수 있습니다.</li>
        <li>여러 장의 사진도 한 번에 업로드할 수 있습니다.</li>
      </ul>
    </div>

  </div>
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