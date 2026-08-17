import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/LoginPageView.vue";
import uploadPage from "../pages/UploadPage.vue";
import AccessPage from "../pages/AccessPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import EventListPage from "../pages/EventListPage.vue";
import EventCreateView from "../pages/EventCreateView.vue";
import EventDetailView from "../pages/EventDetailView.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import ChatPage from "@/pages/ChatPageView.vue";
import NotificationPage from "@/pages/NotificationPageView.vue";
import HomePage from "@/pages/HomePageView.vue";
import MyPage from "@/pages/MyPageView.vue";
import SearchPage from "@/pages/SearchPageView.vue";

const routes: RouteRecordRaw[] = [
  // 로그인
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },

  // 로그인 후 영역
  {
    path: "/",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
      },
      {
        path: "notifications",
        name: "notifications",
        component: NotificationPage,
      },
      {
        path: "chat",
        name: "chat",
        component: ChatPage,
      },
      {
        path: "events",
        name: "events",
        component: EventListPage,
      },
      {
        path: "events/create",
        name: "event-create",
        component: EventCreateView,
      },
      {
        path: "events/:eventId",
        name: "event-detail",
        component: EventDetailView,
        props: true,
      },
      {
        path: "mypage",
        name: "mypage",
        component: MyPage,
      },
      {
        path: "search",
        name: "search",
        component: SearchPage,
      },
    ],
  },
  // {
  //   path: "/",
  //   redirect: "/e/simple-event",
  // },
  // {
  //   path: "/e/:eventCode",
  //   name: "entry",
  //   component: LoginPage,
  // },
  // {
  //   path: "/e/:eventCode/upload",
  //   name: "upload",
  //   component: uploadPage,
  // },
  // {
  //   path: "/e/:eventCode/access",
  //   name: "access",
  //   component: AccessPage,
  // },
  // {
  //   path: "/e/:eventCode/gallery",
  //   name: "gallery",
  //   component: GalleryPage,
  // },
  // {
  //   path: "/events",
  //   name: "events",
  //   component: EventListPage,
  // },
  // {
  //   path: "/events/create",
  //   name: "event-create",
  //   component: EventCreateView,
  // },
  // {
  //   path: "/events/:eventId",
  //   name: "event-detail",
  //   component: EventDetailView,
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

router.beforeEach((to) => {
  const accessToken = localStorage.getItem("accessToken");

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 로그인 필요한 페이지인데 토큰이 없음
  if (requiresAuth && !accessToken) {
    return {
      name: "login",
    };
  }

  // 이미 로그인했는데 로그인 페이지 접근
  if (to.name === "login" && accessToken) {
    return {
      name: "home",
    };
  }
});

// localStorage.setItem("accessToken", response.data.accessToken);

// router.replace({
//   name: "home",
// });

export default router;
