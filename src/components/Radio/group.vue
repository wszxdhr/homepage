<template>
  <div class="hp-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HpRadioGroup',
  props: {
    value: {}
  },
  data () {
    return {
      currentValue: null
    }
  },
  mounted () {
    this.currentValue = this.value
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>
