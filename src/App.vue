<template lang="pug">
  #app
    #nav
      router-link(to="/" v-text="$t('ui.message.hello')")
      
      div.max-width-1.p2
        language-select(:languages="languages" :label="$t('languageSelect.label')")
      
      button(@click="onAuthBtnClick") Auth

    router-view
</template>

<script>
import LanguageSelect from '@/components/molecules/LanguageSelect'

export default {
  name: 'App',
  computed: {
    languages() {
      const languages = [
        {
          value: 'ja',
          label: 'Japanese',
          default: false
        },
        {
          value: 'en',
          label: 'English',
          default: true
        }
      ]
      return languages
    }
  },
  methods: {
    onAuthBtnClick() {
      this.$router.app.$auth.login()
    }
  },
  mounted() {
    console.log(this.$auth)
  },
  components: {
    LanguageSelect
  }
}
</script>


<style lang="scss">
@import './assets/scss/index';
</style>
