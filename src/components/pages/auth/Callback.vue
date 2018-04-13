<template>
  <div class="callback">Callback</div>
</template>

<script>
export default {
  name: 'AuthCallbackPage',
  mounted() {
    this.$auth.handleAuthentication().then(() => {
      this.$router.push({ name: 'home' })
    })
  }
}
</script>
