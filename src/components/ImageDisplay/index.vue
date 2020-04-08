<template>
  <div class="hp-image-display" :style="{backgroundImage: `url(${src})`, backgroundSize, width, height}">
<!--    <img :src="src" alt="" v-if="src"/>-->
    <div class="empty" v-if="!src"></div>
    <ul class="corner-list">
      <li class="corner top-left"></li>
      <li class="corner top-right"></li>
      <li class="corner bottom-left"></li>
      <li class="corner bottom-right"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HpImageDisplay',
  props: {
    src: {
      type: String,
      default: ''
    },
    backgroundSize: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/hpComponent/imageDisplay.scss";
</style>
