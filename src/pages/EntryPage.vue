<template>
  <main class="min-h-screen bg-white px-6">
    <div class="mx-auto flex min-h-screen max-w-md flex-col justify-center">

      <div class="text-center">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl">
          📸
        </div>

        <p class="mt-6 text-sm font-semibold tracking-[0.3em] text-zinc-400">
          사진모아
        </p>

        <h1 class="mt-4 text-4xl font-bold leading-tight text-zinc-950">
          소중한 순간을<br />
          함께 모아보세요
        </h1>

        <p class="mt-5 text-base leading-relaxed text-zinc-600">
          사진을 올리고, 함께 보고,<br />
          추억을 하나의 앨범으로 간직하세요.
        </p>
      </div>

      <div class="mt-14 flex flex-col gap-3">
        <button class="login-btn bg-zinc-950 text-white">
          <span>✉️</span>
          이메일로 계속하기
        </button>

        <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
          <span class="font-bold text-red-500">G</span>
          Google로 계속하기
        </button>

        <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
          <span class="text-xl"></span>
          Apple로 계속하기
        </button>

        <button class="login-btn bg-[#FEE500] text-zinc-950">
          <span>💬</span>
          카카오톡으로 계속하기
        </button>

        <button class="login-btn bg-[#06C755] text-white">
          <span class="font-bold">LINE</span>
          LINE으로 계속하기
        </button>

        <button class="login-btn bg-[#1877F2] text-white">
          <span class="font-bold">f</span>
          Facebook으로 계속하기
        </button>
      </div>

      <p class="mt-8 text-center text-xs leading-relaxed text-zinc-400">
        로그인하면 사진 업로드와 앨범 보기를 더 편하게 이용할 수 있어요.
      </p>

    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 18px;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(24, 24, 27, 0.06);
  transition: all 0.2s ease;
}

.login-btn:active {
  transform: scale(0.98);
}
</style>