import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import EntryPage from "../pages/EntryPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: EntryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
