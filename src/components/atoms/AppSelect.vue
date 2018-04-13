<template lang="pug">
  select.c-select(
    ref="select" 
    :class="classes.select"
    v-model="selectedValue"
    @change="$emit('change', selectedValue)")
    option.c-select__option(
      v-for="(option, optionIndex) of options"
      :key="optionIndex"
      :value="option.value"
      v-text="option.label")
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String,
      default: null
    }
  },
  watch: {
    required(required) {
      this.$el.required = required
    },
    disabled(disabled) {
      this.$el.disabled = disabled
    },
    autofocus(autofocus) {
      this.$el.autofocus = autofocus
    }
  },
  data() {
    return {
      selectedValue: this.selected
    }
  },
  computed: {
    classes() {
      return {
        select: `select`
      }
    }
  },
  mounted() {
    this.$el.required = this.required
    this.$el.disabled = this.disabled
    this.$el.autofocus = this.autofocus
  }
}
</script>
