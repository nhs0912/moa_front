<template>
  <main class="relative mx-auto flex min-h-100dvh w-full max-w-md flex-col justify-between overflow-hidden bg-white px-6 py-8
           sm:max-w-lg sm:px-8
           md:max-w-xl md:px-10 md:py-10
           lg:32px lg:shadow-2xl">

    <!-- 환경 표시 -->
    <div v-if="currentMode !== 'production'"
      class="absolute top-6 left-6 z-50 flex items-center gap-1.5 font-mono text-[10px] font-bold select-none px-2 py-0.5 rounded-md bg-zinc-100/80 backdrop-blur-sm"
      :class="modeStyle.text">
      <span class="h-1 w-1 rounded-full animate-pulse" :class="modeStyle.dot"></span>

      <span>
        {{ modeStyle.label }} v0.0.33
      </span>
    </div>

    <!-- 언어 선택 -->
    <div class="absolute top-6 right-6 z-50" ref="dropdownRef">
      <button @click="isDropdownOpen = !isDropdownOpen"
        class="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 cursor-pointer">
        <span>🌐</span>

        <span class="tracking-tight text-zinc-800">
          {{ currentLanguageLabel }}
        </span>

        <span class="text-[9px] text-zinc-400 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }">
          ▼
        </span>
      </button>

      <Transition name="dropdown">
        <div v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-zinc-100 bg-white p-1.5 shadow-xl ring-1 ring-zinc-950/5">
          <button v-for="lang in supportLanguages" :key="lang.code" @click="changeLocale(lang.code)" :class="[
            'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors cursor-pointer gap-2',
            locale === lang.code
              ? 'bg-zinc-950 text-white'
              : 'text-zinc-700 hover:bg-zinc-50'
          ]">
            <div class="flex items-center gap-1">
              <span v-if="locale === lang.code" class="text-xs">
                ✓
              </span>

              <span :class="{ 'pl-3.5': locale !== lang.code }">
                {{ lang.label }}
              </span>
            </div>

            <span :class="[
              'text-[10px] font-mono font-bold tracking-wider rounded px-1 py-0.5',
              locale === lang.code
                ? 'text-zinc-400 bg-zinc-900'
                : 'text-zinc-400 bg-zinc-100'
            ]">
              {{ lang.native }}
            </span>
          </button>
        </div>
      </Transition>
    </div>

    <!-- 메인 -->
    <div class="mx-auto flex min-h-dvh max-w-md flex-col justify-center py-10">

      <!-- 로고 / 제목 -->
      <div class="text-center">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl">
          📸
        </div>

        <p class="mt-6 text-sm font-semibold tracking-[0.3em] text-zinc-400">
          {{ t('mainTitle') }}
        </p>

        <h1 class="mt-4 text-4xl font-bold leading-tight text-zinc-950 whitespace-pre-line">
          {{ t('title') }}
        </h1>
      </div>

      <div class="mt-2 min-h-h-105">
        <Transition name="fade-slide" mode="out-in">

          <!-- SNS 로그인 -->
          <div v-if="currentView === 'sns'" key="sns" class="flex flex-col gap-3">
            <button @click="currentView = 'email'" class="login-btn bg-zinc-950 text-white">
              <span>✉️</span>
              {{ t('emailContinue') }}
            </button>

            <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
              <span class="font-bold text-red-500">
                G
              </span>

              {{ t('googleContinue') }}
            </button>

            <button class="login-btn border border-zinc-200 bg-white text-zinc-900">
              <span class="text-xl leading-none">
                
              </span>

              {{ t('appleContinue') }}
            </button>

            <button class="login-btn bg-[#FEE500] text-zinc-950">
              <span>💬</span>

              {{ t('kakaoContinue') }}
            </button>
          </div>

          <!-- 이메일 로그인 / 회원가입 -->
          <div v-else-if="currentView === 'email'" key="email" class="flex flex-col">

            <!-- 뒤로가기 -->
            <button @click="currentView = 'sns'"
              class="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-zinc-700 mb-6 self-start transition-colors">
              <span>←</span>

              {{ t('backToSns') }}
            </button>

            <!-- 로그인 / 회원가입 탭 -->
            <div class="flex border-b border-zinc-100 mb-6">
              <button @click="emailMode = 'login'" :class="[
                'flex-1 pb-3 text-center font-bold text-base transition-all',
                emailMode === 'login'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-400'
              ]">
                {{ t('login') }}
              </button>

              <button @click="emailMode = 'signup'" :class="[
                'flex-1 pb-3 text-center font-bold text-base transition-all',
                emailMode === 'signup'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-400'
              ]">
                {{ t('signup') }}
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

              <!-- 이메일 -->
              <div class="flex flex-col gap-1.5">
                <label :class="[
                  'pl-1 text-xs font-semibold transition-colors',

                  emailMode === 'signup' &&
                    isEmailAvailable === false
                    ? 'text-red-500'

                    : emailMode === 'signup' &&
                      isEmailAvailable === true
                      ? 'text-emerald-500'

                      : 'text-zinc-500'
                ]">
                  {{ t('emailLabel') }}
                </label>

                <input type="email" v-model="emailInput" :placeholder="t('emailPlaceholder') || 'id@moa.com'" :class="[
                  'input-field transition-colors',

                  emailMode === 'signup' &&
                    isEmailAvailable === false
                    ? '!border-red-500 !bg-red-50/50 !text-red-500 focus:!border-red-500'

                    : emailMode === 'signup' &&
                      isEmailAvailable === true
                      ? '!border-emerald-500 !bg-emerald-50/50 !text-emerald-600 focus:!border-emerald-500'

                      : '!text-zinc-950'
                ]" required />

                <!-- 검사 중 -->
                <p v-if="emailMode === 'signup' && isCheckingEmail" class="pl-1 text-sm font-medium text-zinc-400">
                  Checking...
                </p>

                <!-- 중복 검사 결과 -->
                <p v-else-if="
                  emailMode === 'signup' &&
                  isEmailAvailable !== null
                " :class="[
                  'pl-1 text-sm font-bold whitespace-pre-line',

                  isEmailAvailable
                    ? 'text-emerald-500'
                    : 'text-red-500'
                ]">
                  {{ emailErrorMessage }}
                </p>
              </div>

              <!-- 비밀번호 -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">
                  {{ t('passwordLabel') }}
                </label>

                <input type="password" v-model="passwordInput" :placeholder="t('passwordPlaceholder')" :class="[
                  'input-field',

                  isPasswordMisMatch
                    ? '!border-red-500 !text-red-500 !bg-red-50/50 focus:!border-red-500'

                    : isPasswordMatch
                      ? '!border-emerald-500 !text-emerald-500 !bg-emerald-50/50 focus:!border-emerald-500'

                      : '!text-zinc-500'
                ]" required />
              </div>

              <!-- 비밀번호 확인 -->
              <div v-if="emailMode === 'signup'" class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-500 pl-1">
                  {{ t('passwordConfirmLabel') }}
                </label>

                <input type="password" v-model="passwordConfirmInput" :placeholder="t('passwordConfirmPlaceholder')"
                  :class="[
                    'input-field',

                    isPasswordMisMatch
                      ? '!border-red-500 !text-red-500 !bg-red-50/50 focus:!border-red-500'

                      : isPasswordMatch
                        ? '!border-emerald-500 !text-emerald-500 !bg-emerald-50/50 focus:!border-emerald-500'

                        : '!text-zinc-500'
                  ]" required />
              </div>

              <!-- 비밀번호 불일치 -->
              <p v-if="isPasswordMisMatch" class="pl-1 text-sm font-bold text-red-500">
                {{ t('passwordMismatchError') }}
              </p>

              <!-- Submit -->
              <button type="submit" :disabled="isSignupDisabled" :class="[
                'login-btn mt-4 transition-colors',

                isSignupDisabled
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-950 text-white'
              ]">
                {{
                  isSubmitting
                    ? 'Loading...'
                    : emailMode === 'login'
                      ? t('loginBtn')
                      : t('signupBtn')
                }}
              </button>

            </form>
          </div>

        </Transition>
      </div>

      <!-- Footer -->
      <p class="mt-8 text-center text-xs leading-relaxed text-zinc-400 whitespace-pre-line">
        {{ t('footer') }}
      </p>

    </div>
  </main>
</template>


<script setup lang="ts">

import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import { useI18n } from 'vue-i18n'

import {
  login,
  signup,
  checkEmailExists
} from '@/api/auth'

import {
  showToast
} from '@/utils/alert'


// ================================
// 환경
// ================================

const currentMode = import.meta.env.MODE

const modeStyle = computed(() => {

  if (currentMode === 'development') {
    return {
      label: 'DEV',
      text: 'text-amber-600',
      dot: 'bg-amber-500'
    }
  }

  return {
    label: 'STG',
    text: 'text-blue-600',
    dot: 'bg-blue-500'
  }
})


// ================================
// 다국어
// ================================

const { t, locale } = useI18n()

const supportLanguages = [
  {
    code: 'ko',
    label: '한국어',
    native: 'KO'
  },
  {
    code: 'en',
    label: 'English',
    native: 'EN'
  },
  {
    code: 'es',
    label: 'Español',
    native: 'ES'
  },
  {
    code: 'ja',
    label: '日本語',
    native: 'JA'
  },
  {
    code: 'zh',
    label: '中文',
    native: 'ZH'
  },
  {
    code: 'fr',
    label: 'Français',
    native: 'FR'
  },
  {
    code: 'it',
    label: 'Italiano',
    native: 'IT'
  },
  {
    code: 'th',
    label: 'ภาษาไทย',
    native: 'TH'
  },
  {
    code: 'vi',
    label: 'Tiếng Việt',
    native: 'VI'
  }
]

const currentLanguageLabel = computed(() => {

  const current =
    supportLanguages.find(
      lang => lang.code === locale.value
    )

  return current
    ? current.label
    : locale.value
})


// ================================
// 언어 Dropdown
// ================================

const isDropdownOpen = ref(false)

const dropdownRef =
  ref<HTMLElement | null>(null)

const changeLocale = (lang: string) => {

  locale.value = lang

  isDropdownOpen.value = false
}

const handleClickOutside = (
  event: MouseEvent
) => {

  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(
      event.target as Node
    )
  ) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {

  window.addEventListener(
    'click',
    handleClickOutside
  )
})

onUnmounted(() => {

  window.removeEventListener(
    'click',
    handleClickOutside
  )

  // debounce timer 정리
  if (emailCheckTimeout) {
    clearTimeout(emailCheckTimeout)
  }
})


// ================================
// 화면 상태
// ================================

const currentView =
  ref<'sns' | 'email'>('sns')

const emailMode =
  ref<'login' | 'signup'>('login')


// ================================
// Form
// ================================

const emailInput =
  ref('')

const passwordInput =
  ref('')

const passwordConfirmInput =
  ref('')

const isSubmitting =
  ref(false)


// ================================
// Password 검사
// ================================

const isPasswordMisMatch =
  computed(() => {

    if (
      emailMode.value !== 'signup' ||
      !passwordConfirmInput.value
    ) {
      return false
    }

    return (
      passwordInput.value !==
      passwordConfirmInput.value
    )
  })


const isPasswordMatch =
  computed(() => {

    if (
      emailMode.value !== 'signup' ||
      !passwordInput.value ||
      !passwordConfirmInput.value
    ) {
      return false
    }

    return (
      passwordInput.value ===
      passwordConfirmInput.value
    )
  })


// ================================
// Email 중복 검사 상태
// ================================

const isEmailAvailable =
  ref<boolean | null>(null)

const emailErrorMessage =
  ref('')

const isCheckingEmail =
  ref(false)


// debounce timer
let emailCheckTimeout:
  ReturnType<typeof setTimeout> | null = null


// ================================
// Email 입력 debounce
// ================================

watch(
  emailInput,

  (newEmail) => {

    // 입력이 변경되는 순간
    // 이전 검사 결과 초기화
    isEmailAvailable.value = null

    emailErrorMessage.value = ''

    // 기존 timer가 있다면 취소
    if (emailCheckTimeout) {

      clearTimeout(
        emailCheckTimeout
      )

      emailCheckTimeout = null
    }

    // 회원가입에서만 검사
    if (
      emailMode.value !== 'signup'
    ) {
      return
    }

    const email =
      newEmail.trim().toLowerCase()

    // 빈값이면 검사 안함
    if (!email) {
      return
    }

    // =========================
    // Debounce 500ms
    // =========================

    emailCheckTimeout =
      setTimeout(() => {

        checkEmailAvailability(email)

      }, 500)
  }
)


// ================================
// Login → Signup 탭 변경
// ================================

watch(
  emailMode,

  (mode) => {

    // 기존 debounce 취소
    if (emailCheckTimeout) {

      clearTimeout(
        emailCheckTimeout
      )

      emailCheckTimeout = null
    }

    // Login으로 돌아가면
    // 이메일 검사 상태 초기화
    if (mode === 'login') {

      isEmailAvailable.value = null

      emailErrorMessage.value = ''

      isCheckingEmail.value = false

      return
    }

    // Signup으로 전환했는데
    // 이미 이메일이 입력되어 있는 경우
    const email =
      emailInput.value
        .trim()
        .toLowerCase()

    if (!email) {
      return
    }

    // 탭을 바꿨을 때도 바로 하지 않고
    // 동일하게 debounce 적용
    emailCheckTimeout =
      setTimeout(() => {

        checkEmailAvailability(email)

      }, 500)
  }
)
import { useRouter } from 'vue-router'
//Router
const router = useRouter()


// ================================
// Email 중복 검사
// ================================

const checkEmailAvailability =
  async (
    email: string
  ): Promise<boolean> => {

    if (
      emailMode.value !== 'signup'
    ) {
      return false
    }

    // 이메일 정규식
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // 형식 오류
    if (
      !emailRegex.test(email)
    ) {

      // 현재 입력값이 해당 email일 때만 적용
      if (
        emailInput.value
          .trim()
          .toLowerCase() === email
      ) {

        isEmailAvailable.value = false

        emailErrorMessage.value =
          t('invalidEmailError')
      }

      return false
    }

    try {

      isCheckingEmail.value = true

      // ========================
      // Axios API
      // ========================

      const response =
        await checkEmailExists(email)

      // ========================
      // 요청 중 사용자가
      // 다른 이메일을 입력했다면
      // 이전 응답은 무시
      // ========================

      const currentEmail =
        emailInput.value
          .trim()
          .toLowerCase()

      if (
        currentEmail !== email
      ) {
        return false
      }

      // ========================
      // 중복 이메일
      // ========================

      if (
        response.isExistEmail
      ) {

        isEmailAvailable.value =
          false

        emailErrorMessage.value =
          t('emailExistsError')

        return false
      }

      // ========================
      // 사용 가능한 이메일
      // ========================

      isEmailAvailable.value =
        true

      emailErrorMessage.value =
        t('emailExistsSuccess')

      return true

    } catch (error) {

      const currentEmail =
        emailInput.value
          .trim()
          .toLowerCase()

      // 이미 다른 이메일로 바뀌었다면
      // 이전 요청 에러도 무시
      if (
        currentEmail !== email
      ) {
        return false
      }

      console.error(
        'Error checking email:',
        error
      )

      isEmailAvailable.value =
        false

      emailErrorMessage.value =
        t('emailCheckError')

      return false

    } finally {

      /*
       * 현재 요청했던 이메일과
       * 화면의 이메일이 같을 때만
       * checking 종료
       */
      if (
        emailInput.value
          .trim()
          .toLowerCase() === email
      ) {

        isCheckingEmail.value =
          false
      }
    }
  }


// ================================
// Submit 버튼 활성화 여부
// ================================

const isSignupDisabled =
  computed(() => {

    // 로그인
    if (
      emailMode.value !== 'signup'
    ) {

      return isSubmitting.value
    }

    // 회원가입
    return (

      isSubmitting.value ||

      isCheckingEmail.value ||

      isPasswordMisMatch.value ||

      // 반드시 중복 검사를 통과해야 함
      isEmailAvailable.value !== true
    )
  })


// ================================
// Login / Signup
// ================================

const handleSubmit =
  async () => {

    // ========================
    // 회원가입 검증
    // ========================

    if (
      emailMode.value === 'signup'
    ) {

      if (
        isPasswordMisMatch.value
      ) {

        showToast(
          t('passwordMismatchError'),
          'error'
        )

        return
      }

      if (
        isEmailAvailable.value !== true
      ) {

        showToast(
          t('emailCheckError'),
          'error'
        )

        return
      }
    }

    try {

      isSubmitting.value = true

      // ========================
      // Login
      // ========================

      if (
        emailMode.value === 'login'
      ) {

        const result =
          await login({

            loginId:
              emailInput.value
                .trim()
                .toLowerCase(),

            password:
              passwordInput.value
          })

        console.log(
          'Login successful:',
          result
        )

        showToast(
          t('loginSuccess'),
          'success'
        )
        localStorage.setItem('accessToken', result.data.accessToken)

        await router.push({
          name: 'events'
        })

        // TODO:
        // JWT 저장
        // localStorage / Cookie 등
      }

      // ========================
      // Signup
      // ========================

      else {

        const result =
          await signup({

            loginId:
              emailInput.value
                .trim()
                .toLowerCase(),

            password:
              passwordInput.value
          })

        console.log(
          'Signup successful:',
          result
        )

        showToast(
          t('signupSuccess'),
          'success'
        )

        // 로그인 화면으로 변경
        emailMode.value = 'login'

        passwordInput.value = ''

        passwordConfirmInput.value = ''

        isEmailAvailable.value = null

        emailErrorMessage.value = ''
      }

    } catch (error) {

      console.error(
        'Authentication error:',
        error
      )

      showToast(
        t('authError'),
        'error'
      )

    } finally {

      isSubmitting.value = false
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

  box-shadow:
    0 10px 24px rgba(24, 24, 27, 0.04);

  transition: all 0.2s ease;

  cursor: pointer;
}

.login-btn:active {
  transform: scale(0.98);
}


.input-field {
  width: 100%;

  border-radius: 14px;

  border:
    1px solid #e4e4e7;

  background-color:
    rgba(244,
      244,
      245,
      0.5);

  padding: 16px;

  font-size: 16px;
  font-weight: 500;

  color: #18181b;

  transition: all 0.2s;
}


.input-field:focus {
  border-color: #09090b;

  background-color:
    #ffffff;

  outline: none;
}


/* ============================= */
/* Form 화면 전환 */
/* ============================= */

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;

  transform:
    translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;

  transform:
    translateY(-10px);
}


/* ============================= */
/* Language Dropdown */
/* ============================= */

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    all 0.15s cubic-bezier(0.16,
      1,
      0.3,
      1);
}

.dropdown-enter-from {
  opacity: 0;

  transform:
    scale(0.95) translateY(-5px);
}

.dropdown-leave-to {
  opacity: 0;

  transform:
    scale(0.95) translateY(-5px);
}
</style>