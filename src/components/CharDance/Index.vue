<template>
  <div class="char-dance">
    <div class="char-dance-row" v-for="(row, rowIndex) in rectDisplay" :key="rowIndex">
      <pre class="char-dance-item" v-for="(char, charIndex) in row" :key="charIndex">{{char}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharDance',
  props: {
    rect: {
      default: () => ([]),
      type: Array
    },
    animateOnInit: {
      default: false,
      type: Boolean
    },
    transChar: {
      default: '+',
      type: [String, Array]
    }
  },
  methods: {
    getRandomInt () {},
    play () {},
    stop () {}
  },
  computed: {
    rectDisplay () {
      return this.rect
    }
  }
}
</script>

<style lang="scss">
  .char-dance {
    line-height: 1;
    &-row {
      text-align: left;
      display: flex;
    }
    &-item {
      margin: 0;
    }
  }
</style>
