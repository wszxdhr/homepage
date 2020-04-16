<template>
  <hp-dialog class="page-loading"
             :top="`calc(50vh - ${this.height / 2}px)`"
             :left="`calc(50vw - ${this.width / 2}px)`"
             :height="height + 'px'"
             :width="width + 'px'"
             title="INIT"
             :visible.sync="visible"
             default-active
             :movable="false">
    <div class="page-loading_wrap">
      <div class="page-loading_bar">
        <div class="page-loading_bar-percent text-size-common">{{parseInt(percent)}}%</div>
        <div class="page-loading_bar-inner" :style="{width: `${percent}%`}">
          <div class="page-loading_bar-percent text-size-common darken">{{parseInt(percent)}}%</div>
        </div>
      </div>
      <div :class="['page-loading_loading-text', 'text-size-large', {blink: percent >= 100}]">
        <span v-show="percent < 100">LOADING</span>
        <span class="text-color-primary" v-show="percent >= 100 && !hasError">COMPLETE</span>
        <span class="text-color-danger" v-show="percent >= 100 && hasError">FAILED BUT FINISHED</span>
      </div>
    </div>
    <div v-for="(res, resIndex) of resources" class="hide" :key="`page-loading-wrap-${res.value}-${resIndex}`">
      <img :src="res.value" alt="" v-if="res.type === 'image'" :key="`page-loading-image-${res.value}-${resIndex}`" @load="loadComplete" @error="loadComplete(false)"/>
      <video :src="res.value" alt="" v-if="res.type === 'video'" :key="`page-loading-video-${res.value}-${resIndex}`" @canplaythrough="loadComplete" @error="loadComplete(false)"/>
    </div>
  </hp-dialog>
</template>

<script>
export default {
  name: 'PageLoading',
  data () {
    return {
      height: 200,
      width: 500,
      visible: true,
      percent: 0,
      resources: [],
      hasError: false
    }
  },
  created () {
    // const timer = setInterval(() => {
    //   this.percent += 10
    //   if (this.percent >= 100) {
    //     clearInterval(timer)
    //     setTimeout(() => {
    //       this.visible = false
    //       this.$emit('ready')
    //     }, 1000)
    //   }
    // }, 2000)
    this.getResourceList()
  },
  methods: {
    getResourceList () {
      // 遍历查找image和video字段
      const traverseFindResource = (item = []) => {
        if (item instanceof Array) {
          for (const sub of item) {
            traverseFindResource(sub)
          }
        } else if (typeof item === 'object') {
          for (const key in item) {
            if ((key === 'image' || key === 'video') && item[key]) {
              this.resources.push({
                type: key,
                value: item[key]
              })
            } else if (typeof item[key] === 'object') {
              traverseFindResource(item[key])
            }
          }
        }
      }
      traverseFindResource(this.$dataJson)
    },
    loadComplete (successed = true) {
      this.percent += 1 / (this.resources || []).length * 100
      this.percent = Math.min(this.percent, 100)
      if (!successed) {
        this.hasError = true
      }
    }
  },
  watch: {
    percent (val) {
      if (val >= 99) {
        this.percent = 100
        setTimeout(() => {
          this.visible = false
          this.$emit('ready')
        }, this.hasError ? 2000 : 500)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/base.scss';
  .page-loading {
    &_wrap {
      text-align: center;
    }
    &_bar {
      width: 360px;
      height: 30px;
      padding: 2px;
      display: inline-block;
      margin-bottom: 20px;
      margin-top: 10px;
      border: 1px solid $base-gray-light;
      position: relative;
      &-inner {
        height: 100%;
        background-color: $base-gray-light;
        transition: .3s all;
        overflow: hidden;
      }
      &-percent {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 26px;
        font-weight: bold;
        &.darken {
          color: $base-gray;
          position: static;
          width: 360px;
          height: 30px;
          line-height: 30px;
          transform: translate(0, 0);
        }
      }
    }
    &_loading-text {
      &.blink {
        animation: blink 2s infinite;
      }
      font-weight: bold;
    }
    .hide {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      pointer-events: none;
    }
  }
</style>
