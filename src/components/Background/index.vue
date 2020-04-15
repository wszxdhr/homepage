<template>
  <div class="background">
    <img class="background-border left" src="~@/assets/images/BackgroundBorderLR.png"/>
    <img class="background-border right" src="~@/assets/images/BackgroundBorderLR.png"/>
    <div class="background-square" ref="square" :style="{ width, height }"></div>
  </div>
</template>

<script>
// 中间方块的宽度
const SQUARE_WIDTH = 60
export default {
  name: 'Background',
  data () {
    return {
      width: 0,
      height: 0,
      windowResizeHandler: null
    }
  },
  methods: {
    resetBackgroundSquareWidth () {
      this.width = parseInt(window.innerWidth / (SQUARE_WIDTH * 2)) * (SQUARE_WIDTH * 2) - 40 - SQUARE_WIDTH + 'px'
      this.height = parseInt(window.innerHeight / (SQUARE_WIDTH * 2)) * (SQUARE_WIDTH * 2) - 40 - SQUARE_WIDTH + 'px'
    }
  },
  mounted () {
    this.resetBackgroundSquareWidth()
    this.windowResizeHandler = () => {
      this.resetBackgroundSquareWidth()
    }
    window.addEventListener('resize', this.windowResizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  }
}
</script>

<style lang="scss">
  .background {
    &-border {
      position: fixed;
      top: 0;
      height: 100%;
      &.left {
        left: 4px;
      }
      &.right {
        right: 4px;
        transform: scaleX(-1);
      }
    }
    &-square {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 180px;
      height: 180px;
      background: {
        image: url(~@/assets/images/BackgroundRepeatSquare.png);
        position: center;
      };
    }
  }
</style>
