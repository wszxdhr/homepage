<template>
  <div class="hp-menu" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HpMenu'
}
</script>
