<template>
  <span class="time-display">
    <span class="hour">{{hour.padStart(2, '0')}}</span> : <span class="minute">{{minute.padStart(2, '0')}}</span> : <span class="second">{{second.padStart(2, '0')}}</span>
  </span>
</template>

<script>
export default {
  name: 'TimeDisplay',
  data () {
    return {
      hour: '0',
      minute: '0',
      second: '0',
      timer: null
    }
  },
  methods: {
    refreshTime () {
      const date = new Date()
      this.hour = date.getHours().toString()
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
    .hour, .minute {
      color: $base-white;
    }
    .second {
      color: $base-color;
    }
  }
</style>
