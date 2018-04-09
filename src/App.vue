<template lang="pug">
  #app
    #nav
      router-link(to="/" v-text="$t('message.hello')")
    router-view
</template>

<style lang="scss">
@import './assets/scss/index';
</style>
