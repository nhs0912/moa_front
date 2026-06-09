import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n"; // 1. createI18n 가져오기
import router from "./router";
import App from "./App.vue";

// 2. 다국어 텍스트 정의 (이전 코드의 내용과 동일)
const messages = {
  ko: {
    mainTitle: "사진모아",
    title: "소중한 순간을\n함께 모아보세요",
    emailContinue: "이메일로 계속하기",
    googleContinue: "Google로 계속하기",
    appleContinue: "Apple로 계속하기",
    kakaoContinue: "카카오톡으로 계속하기",
    lineContinue: "LINE으로 계속하기",
    facebookContinue: "Facebook으로 계속하기",
    backToSns: "소셜 로그인으로 돌아가기",
    login: "로그인",
    signup: "회원가입",
    emailLabel: "이메일 주소",
    passwordLabel: "비밀번호",
    passwordConfirmLabel: "비밀번호 확인",
    passwordPlaceholder: "비밀번호를 입력해주세요",
    passwordConfirmPlaceholder: "비밀번호를 한 번 더 입력해주세요",
    loginBtn: "로그인하기",
    signupBtn: "회원가입 완료하기",
    footer:
      "이제 사진모아와 함께 소중한 순간들을 모아보세요!\n언제 어디서나 쉽게 사진을 업로드하고 공유할 수 있습니다. 지금 바로 시작해보세요!",
  },
  en: {
    mainTitle: "Sajin MoA",
    title: "Collect Precious\nMoments Together",
    emailContinue: "Continue with Email",
    googleContinue: "Continue with Google",
    appleContinue: "Continue with Apple",
    kakaoContinue: "Continue with Kakao",
    lineContinue: "Continue with LINE",
    facebookContinue: "Continue with Facebook",
    backToSns: "Back to Social Login",
    login: "Sign In",
    signup: "Sign Up",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    passwordConfirmLabel: "Confirm Password",
    passwordPlaceholder: "Enter your password",
    passwordConfirmPlaceholder: "Enter your password again",
    loginBtn: "Log In",
    signupBtn: "Complete Sign Up",
    footer:
      "Collect your precious moments with SajinMoa!\nUpload and share photos easily anytime, anywhere. \nGet started right now!",
  },
};

// 3. i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false, // Composition API 지정을 위해 false 필수
  locale: "ko", // 초기 언어 설정
  fallbackLocale: "en",
  messages,
});

// 4. 앱 생성 및 플러그인 연결 (i18n 추가)
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n); // 💡 이 부분에 i18n을 플러그인으로 등록합니다.

app.mount("#app");
