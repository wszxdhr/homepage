<template>
  <hp-block class="hp-menu-item" transparent>
    <div class="hp-menu-item_icon">
      <i class="icon-github"></i>
    </div>
    <div class="hp-menu-item_inner">
      <slot></slot>
      <div class="hp-menu-item_title" v-if="($slots.title && $slots.title.length) || title">
        <hp-text-display :text="title" v-if="!($slots.title && $slots.title.length)"></hp-text-display>
        <slot name="title"></slot>
      </div>
      <p class="hp-menu-item_content" v-if="($slots.content && $slots.content.length) || content">
        <span v-if="!($slots.content && $slots.content.length)">{{content}}</span>
        <slot name="content"></slot>
      </p>
    </div>
  </hp-block>
</template>

<script>
export default {
  name: 'HpMenuItem',
  props: {
    title: {
      default: '',
      type: String
    },
    content: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/hpComponent/menu.scss';
</style>
