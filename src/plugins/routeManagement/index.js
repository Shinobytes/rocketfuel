import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/routes'

import { loadLanguageAsync } from '@/plugins/internationalization/'

Vue.use(Router)

const router = new Router({ routes })

// Guards
router.beforeEach((to, from, next) => {
  loadLanguageAsync(to.query.lang).then(() => next())
})

export default router
