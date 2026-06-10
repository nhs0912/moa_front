import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import i18n from "./locales"; // 💡 src/locales/index.ts 모듈 로드

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n); // 💡 깔끔하게 플러그인 등록

app.mount("#app");
