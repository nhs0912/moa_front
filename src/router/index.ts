import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import EntryPage from "../pages/EntryPage.vue";
import uploadPage from "../pages/UploadPage.vue";
import AccessPage from "../pages/AccessPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/e/simple-event",
  },
  {
    path: "/e/:eventCode",
    name: "entry",
    component: EntryPage,
  },
  {
    path: "/e/:eventCode/upload",
    name: "upload",
    component: uploadPage,
  },
  {
    path: "/e/:eventCode/access",
    name: "access",
    component: AccessPage,
  },
  {
    path: "/e/:eventCode/gallery",
    name: "gallery",
    component: GalleryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
