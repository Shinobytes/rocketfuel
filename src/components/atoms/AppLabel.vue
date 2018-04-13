<template lang="pug">
  label.c-label(:class="classes.label")
    slot
</template>

<script>
export default {
  name: 'AppLabel',
  computed: {
    classes() {
      return {
        label: 'label cursor-pointer'
      }
    }
  }
}
</script>
