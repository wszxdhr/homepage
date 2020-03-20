<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <char-dance :rect="chars[charsIndex].map(item => item.split(''))"
                @finish="changeCharsIndex"
                :trans-char="['!', '@', '#', '$', '%']"
                animate-on-init></char-dance>
    <hp-dialog default-active header-position="left" top="20px" left="40%" width="calc(50vw - 40px)" height="calc(100vh - 40px)" title="啊啊啊啊啊"></hp-dialog>
    <hp-dialog top="20px" left="20px" width="calc(50vw - 40px)" height="calc(100vh - 40px)" title="啊啊啊啊啊"></hp-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import CharDance from '@/components/CharDance/Index'
import chars from '@/assets/chars.json'

export default {
  name: 'Home',
  data () {
    return {
      chars,
      charsIndex: 0
    }
  },
  methods: {
    changeCharsIndex () {
      if (this.charsIndex + 1 >= this.chars.length) {
        this.charsIndex = 0
      } else {
        this.charsIndex++
      }
    }
  },
  components: {
    CharDance
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
  }
</style>
