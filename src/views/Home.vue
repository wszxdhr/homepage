<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <hp-dialog class="main-dialog" content-wrapper-class="main-dialog_content-wrapper" is-static width="calc(100vw - 40px)" height="calc(100vh - 40px)" title="张潇的个人主页">
      <char-dance :rect="chars[charsIndex].map(item => item.split(''))"
                  :color="cssBase['base-font-color']"
                  @finish="changeCharsIndex"
                  :trans-char="['!', '@', '#', '$', '%']"
                  class="char-dance"
                  animate-on-init></char-dance>
    </hp-dialog>
    <hp-dialog class="time-dialog" content-class="time-dialog_content" :left="`${window.innerWidth - 400 - 40}px`" top="70px" width="400px" title="TIME" header-min-width="80px" header-sub-block-width="50">
      <hp-sub-dialog title="TIME IN CURRENT TIME ZONE">
        <hp-block transparent>
          123
        </hp-block>
        <hp-block class="time-display-block">
          <time-display></time-display>
        </hp-block>
        <p class="time-display-desc"><span class="time-display-desc_label">CURRENT TIME ZONE: </span><span class="time-display-desc_value">{{Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Unknown'}}</span></p>
      </hp-sub-dialog>
    </hp-dialog>
<!--    <hp-dialog default-active header-position="right" top="20px" left="40%" width="calc(50vw - 40px)" height="calc(100vh - 40px)" title="啊啊啊啊啊">-->
<!--      <p v-for="(a, $index) in new Array(100)" :key="$index">{{$index}}</p>-->
<!--    </hp-dialog>-->
  </div>
</template>

<script>
// @ is an alias to /src
import cssBase from '@/assets/style/base.scss'
import CharDance from '@/components/CharDance/index'
import TimeDisplay from '@/components/Time/index'
import chars from '@/assets/chars.json'

export default {
  name: 'Home',
  data () {
    return {
      cssBase,
      chars,
      window,
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
    CharDance,
    TimeDisplay
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/hpComponent/base.scss';
  .home {
    display: flex;
    justify-content: center;
    .main-dialog {
      margin: 20px;
      min-width: 800px;
      .main-dialog_content-wrapper {
        position: relative;
        height: 100%;
      }
      .char-dance {
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .time-dialog {
      .time-dialog_content {
        padding: 12px 16px;
      }
      .time-display-block {
        text-align: center;
      }
      .time-display-desc {
        text-align: left;
        line-height: 1;
        margin-top: 10px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        .time-display-desc_value {
          color: $base-white;
        }
      }
    }
  }
</style>
