<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <char-dance :rect="[[' ', ' ', '3', ' ', ' ', ' ', ' ', ' ', ' '], [' ', '6', '7', '8', 'a', 'b', 'c', 'd', 'e'], [' ', '0', '1', '2', 'a', 'b', 'c', 'd', 'e'], [' ', ' ', '5', ' ', ' ', ' ', ' ', ' ', ' ']]"
                :trans-char="['!', '@', '#', '$', '%']"
                animate-on-init></char-dance>
  </div>
</template>

<script>
// @ is an alias to /src
import CharDance from '@/components/CharDance/Index'

export default {
  name: 'Home',
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
