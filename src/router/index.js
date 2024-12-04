import { createRouter, createWebHistory } from 'vue-router';

// Import views to routes
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
//admin
import Dashboard from '@/views/auth/Dashboard.vue';
import Leader from '@/views/auth/Leader.vue';

// Define routes
const routes = [
    { path: '/', component: Home},
    { path: '/administra', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/leader', component: Leader },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;