<template>
  <span class="time-display">
    <span class="time-category" v-if="parseInt(timeType) === 12">{{timeCategory}}</span>
    <span class="hour">{{hour.padStart(2, '0')}}</span> : <span class="minute">{{minute.padStart(2, '0')}}</span> : <span class="second">{{second.padStart(2, '0')}}</span>
  </span>
</template>

<script>
export default {
  name: 'TimeDisplay',
  props: {
    timeType: {
      type: [String, Number],
      default: '24'
    }
  },
  data () {
    return {
      hour: '0',
      minute: '0',
      second: '0',
      timeCategory: 'AM',
      timer: null
    }
  },
  methods: {
    refreshTime () {
      const date = new Date()
      const hour = date.getHours()
      this.hour = (parseInt(this.timeType) === 24 ? hour : hour % 12).toString()
      this.timeCategory = hour > 12 ? 'PM' : 'AM'
      this.minute = date.getMinutes().toString()
      this.second = date.getSeconds().toString()
    }
  },
  created () {
    this.refreshTime()
    this.timer = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/hpComponent/base.scss';
  .time-display {
    font-size: 50px;
    color: $base-white;
    line-height: 1.4;
    position: relative;
    .hour, .minute {
      color: $base-white;
    }
    .second {
      color: $base-color;
    }
    .time-category {
      position: absolute;
      right: calc(100% + 10px);
      top: 10px;
      font-size: 12px;
      color: $base-color;
    }
  }
</style>
