import { createRouter, createWebHistory } from 'vue-router';

// Import views to routes
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
//admin
import Dashboard from '@/views/auth/Dashboard.vue';
import Leader from '@/views/auth/Leader.vue';
import Room from '@/views/auth/Room.vue';
import Building from '@/views/auth/Building.vue';
import Admin from '@/views/auth/Admin.vue';
import Meeting from '@/views/auth/Meeting.vue';
import History from '@/views/auth/History.vue';

// Define routes
const routes = [
    { path: '/', component: Home},
    { path: '/administra', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/leader', component: Leader },
    { path: '/room', component: Room },
    { path: '/building', component: Building },
    { path: '/admin', component: Admin },
    { path: '/meeting', component: Meeting },
    { path: '/history', component: History },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;