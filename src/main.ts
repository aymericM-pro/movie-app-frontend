import { createApp } from 'vue';
import '@/style.css';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.component.vue';
import router from './router';
import { i18n } from '@/core/i18n';
import { createPinia } from 'pinia';

const pinia = createPinia();

const app = createApp(App).use(router).use(i18n).use(pinia);

router.isReady().then(() => {
    app.mount('#app');
});
