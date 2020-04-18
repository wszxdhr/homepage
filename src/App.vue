<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    document.addEventListener('visibilitychange', evt => {
      if (document.visibilityState === 'hidden') {
        this.$bus.$emit('windowBlur')
      } else if (document.visibilityState === 'visible') {
        this.$bus.$emit('windowActive')
      }
    })
  },
  components: {
  }
}
</script>

<style lang="scss">
</style>
