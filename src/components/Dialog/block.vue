<template>
  <div :class="['hp-block', {'is-transparent': transparent}]">
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
    }
  }
}
</script>
