<template lang="pug">
  .c-language-select
    app-label(for="LanguageSelect" v-text="label")
    app-select(
      id="LanguageSelect"
      name="language"
      v-if="ready"
      :selected="selectedLang"
      :options="languages"
      @change="onLanguageSelect")
</template>

<script>
import AppLabel from '@/components/atoms/AppLabel'
import AppSelect from '@/components/atoms/AppSelect'

export default {
  name: 'LanguageSelect',
  props: {
    label: {
      type: String,
      default: 'International'
    },
    languages: {
      type: Array,
      default: () => []
    },
    shouldReload: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route({ query }) {
      if (query.locale) this.$set(this, 'selectedLang', query.locale)
      this.$set(this, 'ready', true)
    }
  },
  data() {
    return {
      ready: false,
      selectedLang: this.languages.find(l => l.default).value
    }
  },
  methods: {
    getDefaultLanguage() {
      const lang = this.languages.find(l => l.default)
      return lang ? lang.value : this.languages[0].value
    },
    onLanguageSelect(locale) {
      this.$router.push({ query: { locale } })
      if (this.shouldReload) this.$router.go()
    }
  },
  components: {
    AppLabel,
    AppSelect
  }
}
</script>
