<template>
  <div class="skill-dialog-wrap">
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               closeable
               :left="`calc(50vw - ${width}px / 2)`"
               top="calc(50vh - 600px / 2)"
               :width="`${width}px`"
               ref="mainDialog"
               title="伟大复兴">
      <hp-sub-dialog title="MY SKILLS" class="skill-dialog-content">
        <hp-block>
          <hp-text-display text="个人技能" size="large" type="white" right-type="primary" right-text="SKILLS" background="gray-dark"></hp-text-display>
        </hp-block>
        <hp-block>
          <hp-text-display text="SELECT A SKILL TO VIEW DETAILS" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <hp-block :has-dot="false" transparent>
          <ul class="skill-list">
            <li :class="['skill-item', {active: activeSkill === $skillIndex}]" @click="activeSkill = $skillIndex" v-for="(skill, $skillIndex) in $dataJson.skills" :key="skill.name">
              <div class="skill-item_icon">
                <hp-image-display :src="skill.image" background-size="60%"></hp-image-display>
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
            <hp-text-display :text="skillDetail.label" size="mini" background="transparent" type="white"></hp-text-display>
          </li>
        </ul>
      </hp-sub-dialog>
    </hp-dialog>
  </div>
</template>

<script>
export default {
  name: 'SkillDialogWrap',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeSkill: null
    }
  },
  computed: {
    width () {
      // 一个图片100px，间隙20px，加上dialog外框4 * 20
      return (this.$dataJson.skills.length) * 100 + (this.$dataJson.skills.length) * 20 + 80
    }
  },
  watch: {
    visible (val) {
      if (val && this.$refs && this.$refs.mainDialog) {
        this.$refs.mainDialog.setActive(true)
      }
    }
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
        }
        &:hover, &.active {
          .skill-item_icon {
            filter: grayscale(0);
          }
          .skill-item_name-inner {
            background-color: $base-color;
          }
        }
      }
    }
  }
</style>
