<template>
  <div :class="['hp-radio', {active: currentValue === value}]" @click="onClick">
    <slot></slot>
    <span v-if="!($slots.default && $slots.default.length)">{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'HpRadio',
  props: {
    value: {},
    label: {
      default: ''
    }
  },
  data () {
    return {
      parentGroup: null,
      currentValue: this.value
    }
  },
  created () {
    if (this.$parent.$options.name === 'HpRadioGroup') {
      this.parentGroup = this.$parent
    } else if (this.$parent.$parent && this.$parent.$parent.$options.name === 'HpRadioGroup') {
      this.parentGroup = this.$parent.$parent
    }
    if (this.parentGroup) {
      this.parentGroup.$on('input', (value) => {
        if (this.currentValue !== value) {
          this.currentValue = value
        }
      })
    }
  },
  methods: {
    onClick (evt) {
      this.$emit('click', evt)
      this.currentValue = this.value
    }
  },
  watch: {
    currentValue (val) {
      if (this.parentGroup) {
        this.parentGroup.$emit('input', val)
      } else {
        this.$emit('input', val)
      }
    },
    value (val) {
      if (!this.parentGroup) {
        this.currentValue = val
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/hpComponent/radio.scss';
</style>
