import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './utils/router'

import './index.css'

import App from './App.vue'

const store = createPinia();
store.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(store).use(router).mount('#app')
