<template>
  <div class="home">
    <hp-dialog class="main-dialog" content-wrapper-class="main-dialog_content-wrapper" is-static width="calc(100vw - 40px)" height="calc(100vh - 40px)" title="张潇的个人主页">
      <div class="icp-info">
        <p>Copyright © 2020-{{new Date().getFullYear()}} 张潇</p>
        <p><a href="http://beian.miit.gov.cn/" target="_blank">黑ICP备17005381号-2</a> <a href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank">xxx</a></p>
      </div>
      <char-dance :rect="chars[charsIndex].map(item => item.split(''))"
                  :color="cssBase['base-font-color']"
                  @finish="changeCharsIndex"
                  :trans-char="['!', '@', '#', '$', '%']"
                  class="char-dance"
                  :width="600"
                  :height="600"
                  animate-on-init></char-dance>
      <hp-text-display text="哈呵吼呼" type="gray" size="small" class="title"></hp-text-display>
      <hp-text-display type="white" size="large" text="HAHAHEHEHOHO" class="sub-title" background="gray-dark"></hp-text-display>
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
    <hp-dialog class="menu-dialog" left="40px" top="164px" width="400px" title="MENU" header-min-width="80px" header-sub-block-width="50">
      <hp-sub-dialog title="CHOOSE A INTRO">
        <hp-menu>
          <hp-menu-item title="吃吃喝喝" content="" @click="$refs.introDialog.setActive()">
            <i class="iconfont icon-github" slot="icon"></i>
          </hp-menu-item>
          <hp-menu-item title="吃吃喝喝2" content="吃吃喝喝吃吃喝喝吃吃喝喝吃吃喝喝" @click="$refs.skillDialog.setActive()">
            <i class="iconfont icon-work" slot="icon"></i>
          </hp-menu-item>
          <hp-menu-item title="吃吃喝喝3" content="吃吃喝喝吃吃喝喝吃吃喝喝吃吃喝喝" @click="$refs.workDialog.setActive()">
            <i class="iconfont icon-github" slot="icon"></i>
          </hp-menu-item>
          <hp-menu-item title="吃吃喝喝4" content="吃吃喝喝吃吃喝喝吃吃喝喝吃吃喝喝" @click="$refs.schoolDialog.setActive()">
            <i class="iconfont icon-github" slot="icon"></i>
          </hp-menu-item>
          <hp-menu-item title="吃吃喝喝5" content="吃吃喝喝吃吃喝喝吃吃喝喝吃吃喝喝" @click="$refs.projectDialog.setActive()">
            <i class="iconfont icon-github" slot="icon"></i>
          </hp-menu-item>
          <hp-menu-item title="吃吃喝喝6" content="吃吃喝喝吃吃喝喝吃吃喝喝吃吃喝喝" @click="$refs.prizeDialog.setActive()">
            <i class="iconfont icon-github" slot="icon"></i>
          </hp-menu-item>
        </hp-menu>
      </hp-sub-dialog>
    </hp-dialog>
    <!--<hp-dialog>-->
    <!--</hp-dialog>-->
    <intro-dialog ref="introDialog"></intro-dialog>
    <skill-dialog ref="skillDialog"></skill-dialog>
    <work-dialog ref="workDialog"></work-dialog>
    <school-dialog ref="schoolDialog"></school-dialog>
    <project-dialog ref="projectDialog"></project-dialog>
    <prize-dialog ref="prizeDialog"></prize-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import cssBase from '@/assets/style/base.scss'
import CharDance from '@/components/CharDance/index'
import TimeDisplay from '@/components/Time/index'
import IntroDialog from '@/components/SubDialogs/Intro/index'
import SkillDialog from '@/components/SubDialogs/Skill/index'
import WorkDialog from '@/components/SubDialogs/Work/index'
import SchoolDialog from '@/components/SubDialogs/School/index'
import ProjectDialog from '@/components/SubDialogs/Project/index'
import PrizeDialog from '@/components/SubDialogs/Prize/index'
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
    TimeDisplay,
    IntroDialog,
    SkillDialog,
    WorkDialog,
    SchoolDialog,
    ProjectDialog,
    PrizeDialog
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
    .icp-info {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      text-align: center;
      font-size: 12px;
      color: $base-gray-light;
    }
  }
</style>
