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
      <hp-sub-dialog title="MY SKILLS"></hp-sub-dialog>
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
