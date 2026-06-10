import { createI18n } from "vue-i18n";

// 분리한 JSON 파일들을 import 합니다.
import ko from "./lang/ko/common.json";
import en from "./lang/en/common.json";
import ja from "./lang/ja/common.json";
import zh from "./lang/zh/common.json";
import es from "./lang/es/common.json";
import fr from "./lang/fr/common.json";
import it from "./lang/it/common.json";
import th from "./lang/th/common.json";
import vi from "./lang/vi/common.json";

// 지원 언어 리스트
const SUPPORT_LANGUAGES = ["ko", "en", "ja", "zh", "es", "fr", "it", "th", "vi"];

// 브라우저 언어 감지 로직
const getBrowserLocale = (): string => {
  const navigatorLocale = navigator.language || (navigator as any).userLanguage;
  if (!navigatorLocale) return "ko";

  const shortLang = navigatorLocale.split("-")[0];
  return SUPPORT_LANGUAGES.includes(shortLang) ? shortLang : "ko";
};

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(), // 자동 감지된 언어 주입
  fallbackLocale: "en",
  messages: { ko, en, ja, zh, es, fr, it, th, vi } as any,
});

export default i18n;
