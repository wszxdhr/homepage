<template>
  <div class="skill-dialog-wrap">
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               closeable
               left="calc(50vw - 500px / 2)"
               top="calc(50vh - 600px / 2)"
               width="500px"
               ref="mainDialog"
               title="伟大复兴">
      <hp-sub-dialog title="MY SKILLS" class="skill-dialog-content">
        <hp-block>
          <hp-text-display text="个人技能" size="large" type="white" background="gray-dark"></hp-text-display>
        </hp-block>
        <hp-block>
          <hp-text-display text="SELECT A SKILL TO VIEW DETAILS" size="mini" type="white" background="gray-light"></hp-text-display>
        </hp-block>
        <hp-block :has-dot="false" transparent>
          123
        </hp-block>
        <hp-block>
          <hp-text-display text="SKILL DETAILS" size="mini" type="gray" background="primary"></hp-text-display>
        </hp-block>
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
  .skill-dialog-wrap {
    .skill-dialog-content {
      .hp-block + .hp-block {
        margin-top: 20px;
      }
    }
  }
</style>
