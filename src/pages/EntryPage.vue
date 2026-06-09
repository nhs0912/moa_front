<template>
  <main class="min-h-screen bg-white px-6 relative">

    <div class="absolute top-6 right-6 flex gap-2 z-50">
      <button @click="changeLocale('ko')"
        :class="['text-xs font-bold px-2.5 py-1 rounded-md transition-all', locale === 'ko' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-400']">
        KR
      </button>
      <button @click="changeLocale('en')"
        :class="['text-xs font-bold px-2.5 py-1 rounded-md transition-all', locale === 'en' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-400']">
        EN
      </button>
    </div>

    <div class="mx-auto flex min-h-dvh max-w-md flex-col justify-center py-10">

      <div class="text-center">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl">
          📸
        </div>
        <p class="mt-6 text-sm font-semibold tracking-[0.3em] text-zinc-400">{{ t('mainTitle') }}</p>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-zinc-950 whitespace-pre-line">
          {{ t('title') }}
        </h1>
      </div>

      <div class="mt-12 min-h-h-105">
        <Transition name="fade-slide" mode="out-in">

          <div v-if="currentView === 'sns'" key="sns" class="flex flex-col gap-3">
            <button @click="currentView = 'email'" class="login-btn bg-zinc-950 text-white">
              <span>✉️</span> {{ t('emailContinue') }}
            </button>

            <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
              <span class="font-bold text-red-500">G</span> {{ t('googleContinue') }}
            </button>

            <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
              <span class="text-xl leading-none"></span> {{ t('appleContinue') }}
            </button>

            <button class="login-btn bg-[#FEE500] text-zinc-950">
              <span>💬</span> {{ t('kakaoContinue') }}
            </button>

            <button class="login-btn bg-[#06C755] text-white">
              <span class="font-bold text-xs">LINE</span> {{ t('lineContinue') }}
            </button>

            <button class="login-btn bg-[#1877F2] text-white">
              <span class="font-bold">f</span> {{ t('facebookContinue') }}
            </button>
          </div>

          <div v-else-if="currentView === 'email'" key="email" class="flex flex-col">
            <button @click="currentView = 'sns'"
              class="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-zinc-700 mb-6 self-start transition-colors">
              <span>←</span> {{ t('backToSns') }}
            </button>

            <div class="flex border-b border-zinc-100 mb-6">
              <button @click="emailMode = 'login'"
                :class="['flex-1 pb-3 text-center font-bold text-base transition-all', emailMode === 'login' ? 'text-zinc-950 border-b-2 border-zinc-950' : 'text-zinc-400']">
                {{ t('login') }}
              </button>
              <button @click="emailMode = 'signup'"
                :class="['flex-1 pb-3 text-center font-bold text-base transition-all', emailMode === 'signup' ? 'text-zinc-950 border-b-2 border-zinc-950' : 'text-zinc-400']">
                {{ t('signup') }}
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('emailLabel') }}</label>
                <input type="email" placeholder="example@moa.com" class="input-field" required />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('passwordLabel') }}</label>
                <input type="password" :placeholder="t('passwordPlaceholder')" class="input-field" required />
              </div>

              <div v-if="emailMode === 'signup'" class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('passwordConfirmLabel') }}</label>
                <input type="password" :placeholder="t('passwordConfirmPlaceholder')" class="input-field" required />
              </div>

              <button type="submit" class="login-btn bg-zinc-950 text-white mt-4">
                {{ emailMode === 'login' ? t('loginBtn') : t('signupBtn') }}
              </button>
            </form>
          </div>

        </Transition>
      </div>

      <p class="mt-8 text-center text-xs leading-relaxed text-zinc-400 whitespace-pre-line">
        {{ t('footer') }}
      </p>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// useI18n에서 t 함수와 locale 상태를 받아옵니다.
const { t, locale } = useI18n()

const currentView = ref<'sns' | 'email'>('sns')
const emailMode = ref<'login' | 'signup'>('login')

const changeLocale = (lang: 'ko' | 'en') => {
  locale.value = lang
}

const handleSubmit = () => {
  if (emailMode.value === 'login') {
    alert(t('loginBtn'))
  } else {
    alert(t('signupBtn'))
  }
}
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
  box-shadow: 0 10px 24px rgba(24, 24, 27, 0.04);
  transition: all 0.2s ease;
  cursor: pointer;
}

.login-btn:active {
  transform: scale(0.98);
}

.input-field {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #e4e4e7;
  background-color: rgba(244, 244, 245, 0.5);
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #18181b;
  transition: all 0.2s;
}

.input-field:focus {
  border-color: #09090b;
  background-color: #ffffff;
  outline: none;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>