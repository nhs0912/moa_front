<template>
  <!-- <main class="min-h-dvh w-full max-w-md md:max-w-xl p-6 sm:p-8 mx-auto bg-white rounded-2xl shadow-sm"> -->
  <main class="relative mx-auto flex min-h-100dvh w-full max-w-md flex-col justify-between overflow-hidden bg-white px-6 py-8
         sm:max-w-lg sm:px-8
         md:max-w-xl md:px-10 md:py-10
         lg:32px lg:shadow-2xl">

    <div v-if="currentMode !== 'production'"
      class="absolute top-6 left-6 z-50 flex items-center gap-1.5 font-mono text-[10px] font-bold select-none px-2 py-0.5 rounded-md bg-zinc-100/80 backdrop-blur-sm"
      :class="modeStyle.text">
      <span class="h-1 w-1 rounded-full animate-pulse" :class="modeStyle.dot"></span>
      <span>{{ modeStyle.label }} v0.0.1</span>
    </div>

    <div class="absolute top-6 right-6 z-50" ref="dropdownRef">
      <button @click="isDropdownOpen = !isDropdownOpen"
        class="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 cursor-pointer">
        <span>🌐</span>
        <span class="tracking-tight text-zinc-800">{{ currentLanguageLabel }}</span>
        <span class="text-[9px] text-zinc-400 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }">▼</span>
      </button>

      <Transition name="dropdown">
        <div v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-zinc-100 bg-white p-1.5 shadow-xl ring-1 ring-zinc-950/5">
          <button v-for="lang in supportLanguages" :key="lang.code" @click="changeLocale(lang.code)" :class="[
            'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors cursor-pointer gap-2',
            locale === lang.code ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-50'
          ]">
            <div class="flex items-center gap-1">
              <span v-if="locale === lang.code" class="text-xs">✓</span>
              <span :class="{ 'pl-3.5': locale !== lang.code }">{{ lang.label }}</span>
            </div>

            <span :class="[
              'text-[10px] font-mono font-bold tracking-wider rounded px-1 py-0.5',
              locale === lang.code ? 'text-zinc-400 bg-zinc-900' : 'text-zinc-400 bg-zinc-100'
            ]">
              {{ lang.native }}
            </span>
          </button>
        </div>
      </Transition>
    </div>

    <div class="mx-auto flex min-h-dvh max-w-md flex-col justify-center py-10">

      <div class="text-center ">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl">
          📸
        </div>
        <p class="mt-6 text-sm font-semibold tracking-[0.3em] text-zinc-400">{{ t('mainTitle') }}</p>
        <h1 class="mt-4 text-4xl font-bold leading-tight text-zinc-950 whitespace-pre-line">
          {{ t('title') }}
        </h1>
      </div>

      <div class="mt-2 min-h-h-105">
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

            <!-- <button class="login-btn bg-[#06C755] text-white">
              <span class="font-bold text-xs">LINE</span> {{ t('lineContinue') }}
            </button>

            <button class="login-btn bg-[#1877F2] text-white">
              <span class="font-bold">f</span> {{ t('facebookContinue') }}
            </button> -->
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
                <label :class="[
                  'pl-1 text-xs font-semibold transition-colors',
                  emailMode === 'signup' && isEmailAvailable === false ? 'text-red-500' :
                    emailMode === 'signup' && isEmailAvailable === true ? 'text-emerald-500' : 'text-zinc-500'
                ]">
                  {{ t('emailLabel') }}
                </label>

                <input type="email" v-model="emailInput" @blur="handleEmailBlur"
                  :placeholder="t('emailPlaceholder') || 'id@moa.com'" :class="[
                    'input-field transition-colors',
                    emailMode === 'signup' && isEmailAvailable === false ? '!border-red-500 !bg-red-50/50 !text-red-500 focus:!border-red-500' :
                      emailMode === 'signup' && isEmailAvailable === true ? '!border-emerald-500 !bg-emerald-50/50 !text-emerald-600 focus:!border-emerald-500' : '!text-zinc-950'
                  ]" required />

                <p v-if="emailMode === 'signup' && isEmailAvailable !== null"
                  :class="['pl-1 text-sm font-bold whitespace-pre-line', isEmailAvailable ? 'text-emerald-500' : 'text-red-500']">
                  {{ emailErrorMessage }}
                </p>
              </div>

              <!-- <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('emailLabel') }}</label>
                <input type="email" v-model="emailInput" :placeholder="t('emailPlaceholder')" class="input-field"
                  required />
              </div> -->
              <!-- <div class="flex flex-col gap-1.5">
                <button type="submit" :disabled="isPasswordMisMatch || isSubmitting" :class="[
                  'login-btn mt-4 transition-colors',
                  isPasswordMisMatch || isSubmitting
                    ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                    : 'bg-zinc-950 text-white'
                ]">
                  {{ isSubmitting ? 'Loading...' : emailMode === 'login' ? t('loginBtn') : t('signupBtn') }}
                </button>
              </div> -->

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('passwordLabel') }}</label>
                <input type="password" v-model="passwordInput" :placeholder="t('passwordPlaceholder')"
                  :class="['input-field', isPasswordMisMatch ? '!border-red-500 !text-red-500 !bg-red-50/50 !focus:border-red-500' : isPasswordMatch ? '!border-emerald-500 !text-emerald-500 !bg-emerald-50/50 !focus:border-emerald-500' : '!text-zinc-500']"
                  required />
              </div>

              <div v-if="emailMode === 'signup'" class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">{{ t('passwordConfirmLabel') }}</label>
                <input type="password" v-model="passwordConfirmInput" :placeholder="t('passwordConfirmPlaceholder')"
                  :class="['input-field', isPasswordMisMatch ? '!border-red-500 !text-red-500 !bg-red-50/50 !focus:border-red-500' : isPasswordMatch ? '!border-emerald-500 !text-emerald-500 !bg-emerald-50/50 !focus:border-emerald-500' : '!text-zinc-500']"
                  required />
              </div>
              <p v-if="isPasswordMisMatch" class="pl-1 text-sm font-bold text-red-500">
                {{ t('passwordMismatchError') }}
              </p>

              <button type="submit" :disabled="isPasswordMisMatch"
                :class="['login-btn mt-4 transition-colors', isPasswordMisMatch ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : 'bg-zinc-950 text-white']">
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
  <!-- <Transition name="toast">
    <div v-if="showToast"
      class="fixed bottom-10 left-1/2 z-100 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-2xl">
      <span>✨</span>
      <span>{{ toastMessage }}</span>
    </div>
  </Transition> -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { login, signup, checkEmailExists } from '@/api/auth'
import { showToast, showConfirm, showAlert } from '@/utils/alert'
// // script 영역에 추가
// const showToast = ref(false)
// const toastMessage = ref('')

// // 알림창을 3초간 띄워주는 함수
// const triggerToast = (message: string) => {
//   toastMessage.value = message
//   showToast.value = true
//   setTimeout(() => {
//     showToast.value = false
//   }, 3000)
// }

// 1. 빌드 환경 분기 스크립트 로직
const currentMode = import.meta.env.MODE
const modeStyle = computed(() => {
  if (currentMode === 'development') {
    return { label: 'DEV', text: 'text-amber-600', dot: 'bg-amber-500' }
  }
  return { label: 'STG', text: 'text-blue-600', dot: 'bg-blue-500' }
})

// 2. 다국어 제어 Hooks 호출
const { t, locale } = useI18n()

// 3. 지구본 토글 및 다국어 서포트 모델 관리
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
// 이메일 로그인/회원가입 폼 제어 상태 변수
const emailInput = ref('')
const passwordInput = ref('')
const passwordConfirmInput = ref('')

// 비밀번호 불일치 여부를 실시간으로 계산하는 computed 속성
const isPasswordMisMatch = computed(() => {
  if (emailMode.value !== 'signup' || !passwordConfirmInput.value) {
    return false; // 회원가입 모드가 아닐 때는 불일치 여부 계산 안 함
  }
  return passwordInput.value !== passwordConfirmInput.value
})

const isPasswordMatch = computed(() => {
  //가입모드가 아니거나, 둘 중 하나라도 비어있으면 초록색을 띄우지 않음
  if (emailMode.value !== 'signup' || !passwordInput.value || !passwordConfirmInput.value) {
    return false
  }
  //두 값이 동일하면 true(초록색))
  return passwordInput.value === passwordConfirmInput.value
})


const supportLanguages = [
  { code: 'ko', label: '한국어', native: 'KO' },
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'es', label: 'Español', native: 'ES' },
  { code: 'ja', label: '日本語', native: 'JA' },
  { code: 'zh', label: '中文', native: 'ZH' },
  { code: 'fr', label: 'Français', native: 'FR' }, // 프랑스어 추가
  { code: 'it', label: 'Italiano', native: 'IT' }, // 이탈리아어 추가
  { code: 'th', label: 'ภาษาไทย', native: 'TH' },  // 태국어 추가
  { code: 'vi', label: 'Tiếng Việt', native: 'VI' } // 베트남어 추가

]

// 💡 현재 선택된 locale 코드(예: 'ko')에 대응하는 풀 네임(예: '한국어')을 실시간으로 가져오는 computed 속성
const currentLanguageLabel = computed(() => {
  const current = supportLanguages.find(lang => lang.code === locale.value)
  return current ? current.label : locale.value
})

const changeLocale = (lang: string) => {
  locale.value = lang
  isDropdownOpen.value = false
}

// 빈 바탕화면 클릭 처리 바인딩 핸들러
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => window.addEventListener('click', handleClickOutside))
onUnmounted(() => window.removeEventListener('click', handleClickOutside))

// 4. 컴포넌트 폼 내부 반응형 구조체 상태 변수
const currentView = ref<'sns' | 'email'>('sns')
const emailMode = ref<'login' | 'signup'>('login')

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (emailMode.value === 'signup' && isPasswordMisMatch.value) {
    showToast(t('passwordMismatchError'), 'error')
    return
  }

  try {
    isSubmitting.value = true
    if (emailMode.value === 'login') {
      const result = await login({
        loginId: emailInput.value,
        password: passwordInput.value
      })
      console.log('Login successful:', result)
      showToast(t('loginSuccess'), 'success')
      //TODO : save token to localStorage or cookie
    } else {
      const result = await signup({
        loginId: emailInput.value,
        password: passwordInput.value
      })
      console.log('Signup successful', result)
      // alert(t('signupSuccess'));
      showToast(t('signupSuccess'), 'success')
      emailMode.value = 'login'
      passwordInput.value = ''
      passwordConfirmInput.value = ''
      //TODO :
    }
  } catch (error) {
    console.error('Authentication error:', error)
    showToast(t('authError'), 'error')
    return
  } finally {
    isSubmitting.value = false
  }
}

const isEmailAvailable = ref<boolean | null>(null) // null: 아직 체크 안 함, true: 사용 가능, false: 이미 존재
const emailErrorMessage = ref('')

watch(emailInput, () => {
  isEmailAvailable.value = null
})

const handleEmailBlur = async () => {
  if (emailMode.value !== 'signup' || !emailInput.value) {
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailInput.value)) {
    isEmailAvailable.value = false
    emailErrorMessage.value = t('invalidEmailError')
    return
  }

  try {
    const response = await checkEmailExists(emailInput.value)
    const isDuplicate = response.data.data.isExistEmail
    if (isDuplicate) {
      isEmailAvailable.value = false
      emailErrorMessage.value = t('emailExistsError')
    } else {
      isEmailAvailable.value = true
      emailErrorMessage.value = ''
    }
  } catch (error) {
    console.error('Error checking email:', error)
    isEmailAvailable.value = false
    emailErrorMessage.value = t('emailCheckError')
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

/* 폼 스위칭 인터랙션 효과 */
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

/* 지구본 드롭다운 패널 인터랙션 효과 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

/* 토스트 팝업 애니메이션 */
/*.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}*/
</style>