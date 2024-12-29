import { createRouter, createWebHistory } from "vue-router";

// Import views to routes
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
//admin
import Dashboard from "@/views/auth/Dashboard.vue";
import Leader from "@/views/auth/Leader.vue";
import Room from "@/views/auth/Room.vue";
import Building from "@/views/auth/Building.vue";
import Admin from "@/views/auth/Admin.vue";
import Meeting from "@/views/auth/Meeting.vue";
import History from "@/views/auth/History.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import axios from "axios";

// Define routes
const routes = [
  { path: "/", component: Home },
  {
    path: "/administra",
    component: Login,
    name: "signin",
    meta: { requiresSignin: true },
  },
  {
    path: "/dashboard",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Dashboard, name: "admin.dashboard" },
      { path: "leader", component: Leader, name: "admin.leader" },
      { path: "room", component: Room, name: "admin.room" },
      { path: "building", component: Building, name: "admin.building" },
      { path: "admin", component: Admin, name: "admin.admin" },
      { path: "meeting", component: Meeting, name: "admin.meeting" },
      { path: "history", component: History, name: "admin.history" },
    ],
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuthentication();
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "signin" });
  } else if (to.meta.requiresSignin && isAuthenticated) {
    next({ name: "admin.dashboard" });
  } else {
    next();
  }
});

const checkAuthentication = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    // const authed = await axios.get("http://localhost:4000/v1/auth/check-auth", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const authed = await axios.get(
      "/api/v1/auth/check-auth",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return await authed.data.success;
  } catch (error) {
    return false;
  }
};

export default router;
