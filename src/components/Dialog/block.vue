<template>
  <div :class="['hp-block', {'is-transparent': transparent, 'has-dot': hasDot}]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HpBlock',
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    hasDot: {
      type: Boolean,
      default: true
    }
  }
}
</script>
