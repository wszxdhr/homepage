<template>
  <div class="skill-dialog-wrap">
    <hp-dialog :visible.sync="visible"
               closeable
               :left="`calc(50vw - ${width}px / 2)`"
               top="calc(50vh - 800px / 2)"
               :width="`${width}px`"
               ref="mainDialog"
               title="CODE FARMER SKILLS">
      <hp-sub-dialog title="MY SKILLS" class="skill-dialog-content">
        <hp-block>
          <hp-text-display text="打工技能" size="large" type="white" right-type="primary" right-text="SKILLS" background="gray-dark"></hp-text-display>
        </hp-block>
        <hp-block>
          <hp-text-display text="SELECT A SKILL TO VIEW DETAILS" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <hp-block :has-dot="false" transparent>
          <ul class="skill-list">
            <li :class="['skill-item', {active: activeSkill === $skillIndex}]" @click="activeSkill = $skillIndex" v-for="(skill, $skillIndex) in $dataJson.skills" :key="skill.name">
              <div class="skill-item_icon">
                <hp-image-display :src="$handleResource(skill.image)" background-size="60%"></hp-image-display>
              </div>
              <p class="skill-item_name">
                <hp-text-display class="skill-item_name-inner" :text="skill.name" size="mini" background="white" type="gray-dark"></hp-text-display>
              </p>
              <p class="skill-item_text">
                <hp-text-display :text="skill.text" size="mini" background="transparent" type="white"></hp-text-display>
              </p>
            </li>
          </ul>
        </hp-block>
        <hp-block v-show="activeSkill !== null">
          <hp-text-display text="SKILL DETAILS" size="mini" type="gray" background="primary"></hp-text-display>
        </hp-block>
        <ul class="skill-detail-list" v-if="activeSkill !== null">
          <li class="skill-detail-item" v-for="(skillDetail, $skillDetailIndex) in $dataJson.skills[activeSkill].list" :key="$skillDetailIndex">
            <hp-text-display class="skill-detail-item_counter" :text="`${String.fromCharCode($skillDetailIndex + 65)}:${($skillDetailIndex + 1 + '').padStart(2, '0')}`" size="mini" background="transparent" type="white"></hp-text-display>
            <hp-text-display class="skill-detail-item_label" :text="skillDetail.label" size="mini" background="transparent" type="white"></hp-text-display>
            <hp-text-display class="skill-detail-item_value" :text="`<${skillDetail.value}>`" size="mini" background="transparent" type="white" align="center"></hp-text-display>
          </li>
        </ul>
      </hp-sub-dialog>
    </hp-dialog>
  </div>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'SkillDialogWrap',
  mixins: [Mixin],
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      activeSkill: 0
    }
  },
  methods: {
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog] : []
    },
    width () {
      // 一个图片100px，间隙20px，加上dialog外框4 * 20
      return (this.$dataJson.skills.length) * 100 + (this.$dataJson.skills.length) * 20 + 80
    }
  },
  watch: {
    // visible (val) {
    // }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .skill-dialog-wrap {
    .skill-dialog-content {
      .hp-block + .hp-block {
        margin-top: 20px;
      }
    }
    .skill-list {
      display: flex;
      justify-content: space-between;
      .skill-item {
        flex: 1;
        max-width: 100px;
        position: relative;
        &_icon {
          filter: grayscale(0.76);
          transition: .3s all;
        }
        &_name {
          transform: scale(.9);
          transform-origin: left;
          display: inline-block;
          margin-top: 10px;
          &-inner {
            /*transition: .3s all;*/
          }
        }
        &_text {
          color: $base-gray-very-light;
          font-size: 12px;
          transform: scale(.7) translateX(-10px);
          transform-origin: left;
          & > div {
            width: 150px;
          }
        }
        &:before {
          content: '';
          display: block;
          border: 1px solid rgba($base-color, .6);
          width: 6px;
          height: 6px;
          position: absolute;
          top: 155px;
          right: 14px;
        }
        &:after {
          content: '';
          border: 1px solid rgba($base-gray-very-light, .6);
          width: 6px;
          height: 6px;
          position: absolute;
          top: 155px;
          right: 0;
          display: none;
        }
        &:hover {
          .skill-item_icon {
            filter: grayscale(0);
          }
          &:before {
            border: 1px solid rgba($base-color, 1);
          }
          &:after {
            display: block;
          }
        }
        &.active {
          .skill-item_icon {
            filter: grayscale(0);
          }
          .skill-item_name-inner {
            background-color: $base-color;
          }
        }
      }
    }
    .skill-detail-list {
      .skill-detail-item {
        display: flex;
        margin: 30px 0 30px 4px;
        align-items: center;
        &_label {
          flex: 1;
        }
        &_value {
          width: 180px;
          & > * {
            width: 100%;
          }
        }
        &:hover {
          * {
            color: $base-color;
          }
        }
      }
    }
  }
</style>
