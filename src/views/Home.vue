<template>
  <div class="home">
    <hp-dialog class="main-dialog" content-wrapper-class="main-dialog_content-wrapper" is-static width="calc(100vw - 40px)" height="calc(100vh - 40px)" title="张潇的个人主页">
      <char-dance :rect="chars[charsIndex].map(item => item.split(''))"
                  :color="cssBase['base-font-color']"
                  @finish="changeCharsIndex"
                  :trans-char="['!', '@', '#', '$', '%']"
                  class="char-dance"
                  :width="600"
                  :height="600"
                  animate-on-init></char-dance>
      <hp-text-display text="哈呵吼呼" type="primary" size="small" class="title"></hp-text-display>
      <hp-text-display type="black" size="large" text="HAHAHEHEHOHO" class="sub-title"></hp-text-display>
    </hp-dialog>
    <hp-dialog class="time-dialog" content-class="time-dialog_content" left="calc(100vw - 400px - 40px)" top="70px" width="400px" title="TIME" header-min-width="80px" header-sub-block-width="50">
      <hp-sub-dialog title="TIME IN CURRENT TIME ZONE">
        <hp-block transparent>
          <hp-radio-group v-model="timeType">
            <hp-radio value="24">24 HOURS DISPLAY</hp-radio>
            <hp-radio value="12">12 HOURS DISPLAY</hp-radio>
          </hp-radio-group>
        </hp-block>
        <hp-block class="time-display-block">
          <time-display :time-type="timeType"></time-display>
        </hp-block>
        <p class="time-display-desc"><span class="time-display-desc_label">CURRENT TIME ZONE: </span><span class="time-display-desc_value">{{Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Unknown'}}</span></p>
      </hp-sub-dialog>
    </hp-dialog>
    <hp-dialog class="menu-dialog" left="40px" top="160px" width="400px" title="MENU" header-min-width="80px" header-sub-block-width="50">
      <hp-sub-dialog title="CHOOSE A INTRO">
        <hp-menu>
          <hp-menu-item title="吃喝拉撒" content="吃喝拉撒吃喝拉撒"></hp-menu-item>
          <hp-menu-item title="吃喝嫖赌" content="吃喝嫖赌吃喝嫖赌吃喝嫖赌"></hp-menu-item>
          <hp-menu-item title="喝西北风" content="喝西北风喝西北风喝西北风"></hp-menu-item>
          <hp-menu-item title="玩物丧志" content="玩物丧志玩物丧志玩物丧志"></hp-menu-item>
        </hp-menu>
      </hp-sub-dialog>
    </hp-dialog>
    <!--<hp-dialog>-->
    <!--</hp-dialog>-->
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
      charsIndex: 0,
      timeType: '24'
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
    .title {
      position: fixed;
      top: 77px;
      left: 40px;
    }
    .sub-title {
      position: fixed;
      top: 101px;
      left: 40px;
    }
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
