import Vue from 'vue'
import Vuex from 'vuex'
import modules from '@/state'

Vue.use(Vuex)

export default (Vue.store = new Vuex.Store({
  strict: true,
  modules
}))
