<template>
  <hp-dialog :visible.sync="visible"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             top="40px"
             :width="`${width}px`"
             ref="mainDialog"
             class="work-dialog"
             title="WORKS">
    <div class="work-dialog_row">
      <hp-sub-dialog title="MY WORK EXPERIENCES" class="work-dialog_column work-list">
      <!--左侧菜单-->
        <hp-block transparent>
          <div class="work-list-item work-list-item_list-header">
            <hp-text-display class="work-list-item_company" size="mini" background="white" text="BRAND" type="gray-dark"></hp-text-display>
            <div class="work-list-item_split-dot" style="opacity: 0;"></div>
            <hp-text-display class="work-list-item_detail" size="mini" background="gray-light" text="DETAIL" type="gray-dark"></hp-text-display>
          </div>
          <!--公司列表-->
          <div :class="['work-list-item', {active: active === workItem.company}]" v-for="workItem in $dataJson.works" :key="workItem.company" @click="active = workItem.company">
            <hp-text-display size="small" :text="workItem.company" class="work-list-item_company" background="transparent" :type="active === workItem.company ? 'primary' : 'white'"></hp-text-display>
            <div class="work-list-item_split-dot"></div>
            <div class="work-list-item_detail">
              <hp-text-display background="transparent" :type="active === workItem.company ? 'primary' : 'white'" :text="workItem.companyName" size="mini" class="work-list-item_company-real-name"></hp-text-display>
              <hp-text-display background="transparent" type="white" :text="workItem.timeRange.join(' ~ ')" size="ultra-mini" class="work-list-item_time"></hp-text-display>
              <hp-text-display background="transparent" type="white" :text="workItem.job" size="ultra-mini" class="work-list-item_title"></hp-text-display>
            </div>
          </div>
        </hp-block>
      </hp-sub-dialog>
      <!--详情-->
      <hp-sub-dialog title="WORK DETAIL" class="work-dialog_column work-detail">
        <!--详情标题-->
        <hp-block class="work-detail_title">
          <div>
            <hp-text-display background="transparent" type="primary" :text="detail.company" size="large"></hp-text-display>
            <hp-text-display background="transparent" type="gray-very-light" :text="detail.companyName" size="very-small"></hp-text-display>
          </div>
          <hp-text-display background="transparent" type="gray-very-light" size="common" :text="detail.timeRange.join(' - ')"></hp-text-display>
        </hp-block>
        <hp-block>
          <hp-text-display text="ADDRESS" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <!--动画地址-->
        <hp-block class="work-detail_address">
          <video :src="detail.address.video" ref="workAddressVideo" alt="" @canplaythrough="playWorkAddress" @ended="showAddressInfo = true"/>
          <div class="work-detail_address-info">
            <div class="address-info_marker marker-animation-common" :style="detail.address.markerStyle" v-show="showAddressInfo">
              <div class="marker-corner marker-top-left"></div>
              <div class="marker-corner marker-top-right"></div>
              <div class="marker-corner marker-bottom-left"></div>
              <div class="marker-corner marker-bottom-right"></div>
            </div>
            <div class="address-into-marker-text marker-text" :style="detail.address.markerStyle" v-show="showAddressInfo">
              <hp-text-display size="small" type="gray-dark" background="primary" :text="detail.address.title"></hp-text-display>
              <hp-text-display size="mini" type="white" background="gray-dark" :text="detail.address.desc"></hp-text-display>
            </div>
          </div>
        </hp-block>
<!--        主要工作-->
        <hp-block>
          <hp-text-display text="MAIN WORK" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <!--标签-->
        <hp-block class="work-detail_tag-list" transparent :has-dot="false">
          <hp-text-display class="work-detail_tag" :text="tag" v-for="tag in detail.tags" :key="tag" size="mini" type="gray" background="primary"></hp-text-display>
        </hp-block>
        <hp-block transparent :has-dot="false">
          <hp-text-display class="work-content-text" v-for="(mainWorkRow, mainWorkIndex) in detail.mainWork" :key="`main-work-${mainWorkRow}-${mainWorkIndex}`" :text="mainWorkRow" type="white" background="transparent" size="very-small"></hp-text-display>
        </hp-block>
        <!--工作内容-->
        <hp-block>
          <hp-text-display text="MAIN PROJECT" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <hp-block transparent :has-dot="false">
          <hp-radio-group v-model="activeExperience">
            <hp-radio :value="$index" :key="$index" v-for="(experience, $index) in detail.experience">{{experience.name}}</hp-radio>
          </hp-radio-group>
        </hp-block>
        <hp-block :has-dot="false" transparent>
          <hp-text-display class="work-detail_experience-content work-content-text" size="very-small" type="white" background="transparent" :text="experienceDetail.content"></hp-text-display>
          <span v-if="experienceDetail.link">
            <span class="text-color-primary">项目链接：</span><a target="_blank" v-if="experienceDetail.link" :href="experienceDetail.link"><hp-text-display class="work-detail_experience-link" size="mini" type="white" background="transparent" :text="experienceDetail.link"></hp-text-display></a>
          </span>
        </hp-block>
      </hp-sub-dialog>
    </div>
  </hp-dialog>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'WorkDialog',
  mixins: [Mixin],
  data () {
    return {
      width: 1060,
      active: this.$dataJson.works[0].company,
      showAddressInfo: false,
      activeExperience: 0
    }
  },
  methods: {
    playWorkAddress () {
      if (this.visible && this.$refs.workAddressVideo) {
        this.showAddressInfo = false
        this.$refs.workAddressVideo.play()
      }
    }
  },
  mounted () {
    // this.playWorkAddress()
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog] : []
    },
    detail () {
      return this.$dataJson.works.find(item => item.company === this.active) || {}
    },
    experienceDetail () {
      return this.detail.experience[this.activeExperience]
    }
  },
  watch: {
    detail () {
      this.activeExperience = 0
      this.playWorkAddress()
    },
    visible (val) {
      if (val) {
        this.playWorkAddress()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .work-dialog {
    &_row {
      display: flex;
    }
    &_column {
      & + .work-dialog_column {
        margin-left: 20px;
      }
    }
    .work-list {
      width: 370px;
      &-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        &_company {
          width: 70px;
        }
        &_split-dot {
          flex: 1;
          padding-left: 16px;
          &:after {
            content: '';
            display: inline-block;
            width: 2px;
            height: 2px;
            background-color: $base-white;
          }
        }
        &_detail {
          width: 230px;
        }
        &_company-real-name {}
        &_time {
          opacity: .66;
        }
        &_title {
          opacity: .66;
        }
        &_list-header {
          padding-top: 0;
          padding-bottom: 0;
        }
        &:not(.work-list-item_list-header) + .work-list-item {
          border-top: 1px dashed $base-gray-light;
        }
        &:last-of-type {
          // margin-bottom: -10px;
        }
        &:not(.work-list-item_list-header):hover {
          background-color: rgba($base-gray-light, .8);
        }
        &.active {
          .work-list-item_split-dot {
            &:after {
              background-color: $base-color;
            }
          }
        }
      }
    }
    .work-detail {
      flex: 1;
      .hp-sub-dialog_content {
        max-height: calc(100vh - #{$dialog-header-line-height} - 200px);
      }
      .work-inner-block-title {
        margin: 10px 0 4px;
      }
      &_title {
        padding: 4px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &_tag-list {
        display: flex;
        .work-detail_tag {
          opacity: .9;
          & + .work-detail_tag {
            margin-left: 10px;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
      &_address {
        position: relative;
        video {
          width: 100%;
          display: block;
          filter: grayscale(1);
        }
        &:before {
          content: '';
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          background: {
            image: url(~@/assets/images/WorkAddressFrame.png);
            size: cover;
          }
        }
        &-info {
          .address-info_marker {
            position: absolute;
            width: 30px;
            height: 30px;
            margin-left: -15px;
            margin-top: -15px;
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -1px;
              margin-top: -1px;
              width: 2px;
              height: 2px;
              background-color: $base-white;
              display: block;
            }
            .marker-corner {
              position: absolute;
              height: 4px;
              width: 4px;
            }
            .marker-top-left {
              top: 0;
              left: 0;
              border-top: 2px solid $base-white;
              border-left: 2px solid $base-white;
            }
            .marker-top-right {
              top: 0;
              right: 0;
              border-top: 2px solid $base-white;
              border-right: 2px solid $base-white;
            }
            .marker-bottom-left {
              bottom: 0;
              left: 0;
              border-bottom: 2px solid $base-white;
              border-left: 2px solid $base-white;
            }
            .marker-bottom-right {
              bottom: 0;
              right: 0;
              border-bottom: 2px solid $base-white;
              border-right: 2px solid $base-white;
            }
          }
          .address-into-marker-text {
            position: absolute;
            margin-top: -15px;
            margin-left: 30px;
          }
        }
      }
      .work-content-text {
        & + .work-content-text {
          margin-top: 12px;
        }
        .hp-text-display_text {
          line-height: 1.6;
        }
      }
    }
  }
</style>
