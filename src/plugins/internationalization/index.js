import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import messages from '@/lang'

Vue.use(VueI18n)

/* eslint-disable no-undef */
export default (Vue.i18n = new VueI18n({
  locale: process.env.VUE_APP_DEFAULT_LOCALE,
  fallbackLocale: process.env.VUE_APP_FALLBACK_LOCALE,
  messages
}))

function setLanguage(lang) {
  if (!process.env.VUE_APP_AVAILABLE_LOCALES.split(',').includes(lang)) {
    lang = process.env.VUE_APP_DEFAULT_LOCALE
  }
  Vue.i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  if (Vue.i18n.locale !== lang) return Promise.resolve(setLanguage(lang))
  return Promise.resolve(lang)
}
