<template>
  <div class="skill-dialog-wrap">
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               closeable
               title="伟大复兴"></hp-dialog>
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               closeable
               title="伟大复兴"></hp-dialog>
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
  }
}
</script>
