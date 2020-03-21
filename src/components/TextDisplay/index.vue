<template>
  <div :class="['hp-text-display', `text-display_${type}`, `text-display_size-${size}`]">
    <slot></slot>
    <span v-if="!($slots.default && $slots.default.length)">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'HpTextDisplay',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/hpComponent/textDisplay.scss';
</style>
