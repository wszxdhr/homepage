<template>
  <div id="app">
    <router-view :class="{'page-is-lock': !isReady}"/>
    <div :class="['page-loading-mask', {hide: isReady}]" :style="{zIndex: maxZIndex + 2}"></div>
    <page-loading @ready="isReady = true"></page-loading>
  </div>
</template>

<script>
import PageLoading from '@/components/PageLoading'
import activeManage from '@/components/Dialog/activeManage'
export default {
  name: 'App',
  data () {
    return {
      isReady: false,
      maxZIndex: activeManage.maxZIndex
    }
  },
  components: {
    PageLoading
  }
}
</script>

<style lang="scss">
</style>
