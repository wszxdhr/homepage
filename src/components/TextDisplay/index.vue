<template>
  <div :class="['hp-text-display', `text-display_background-${background}`, `text-display_size-${size}`]" :style="{textAlign: align}">
    <p :class="['hp-text-display_text', 'hp-text-display_left', type ? `text-display_color-${type}` : '']"
       v-if="text || ($slots.default && $slots.default.length)">
      <slot></slot>
      <span v-if="!($slots.default && $slots.default.length)">{{text}}</span>
    </p>
    <p :class="['hp-text-display_text', 'hp-text-display_right', rightType ? `text-display_color-${rightType}` : '']"
       v-if="rightText || ($slots.right && $slots.right.length)">
      <slot name="right"></slot>
      <span v-if="!($slots.right && $slots.right.length)">{{rightText}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HpTextDisplay',
  props: {
    background: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'white'
    },
    rightType: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/hpComponent/textDisplay.scss';
</style>
