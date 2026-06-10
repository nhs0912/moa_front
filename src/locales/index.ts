import { createI18n } from "vue-i18n";

// 분리한 JSON 파일들을 import 합니다.
import ko from "./lang/ko.json";
import en from "./lang/en.json";
import ja from "./lang/ja.json";
import zh from "./lang/zh.json";
import es from "./lang/es.json";
import fr from "./lang/fr.json";
import it from "./lang/it.json";
import th from "./lang/th.json";
import vi from "./lang/vi.json";

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
