import Vue from 'vue'
import App from './App.vue'
import { router, store, i18n } from '@/plugins'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({ store, router, i18n, render: h => h(App) }).$mount('#app')
