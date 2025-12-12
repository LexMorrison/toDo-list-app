import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      title: "Home - Vue 3 Starter",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/index.vue"),
    meta: {
      title: "Login Vue 3 toDo List app",
      layout: "auth",
    },
  },
  {
    path: "/registration",
    name: "Registation",
    component: () => import("@/pages/Registration/index.vue"),
    meta: {
      title: "Registation Vue 3 toDo List app",
      layout: "auth",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "404 - Сторінку не знайдено",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
