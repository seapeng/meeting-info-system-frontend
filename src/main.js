import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n';
import pinia from '@/store/index.js'

// import 'jquery/dist/jquery.min.js'
// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import SB-Admin CSS and JS
import '@/assets/auth/css/sb-admin-2.min.css';
// import '@/assets/auth/js/sb-admin-2.min.js';

// Import Custom CSS and JS
import '@/assets/css/custom.css';
import '@/assets/js/custom.js';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(pinia);
app.mount('#app');
