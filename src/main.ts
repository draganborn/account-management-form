import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { useAccountsStore } from './stores/accounts';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
