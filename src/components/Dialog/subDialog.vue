<template>
  <div class="hp-sub-dialog">
    <div class="hp-sub-dialog_title">
      {{title}}
      <slot name="title"></slot>
    </div>
    <div class="hp-sub-dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HpSubDialog',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
