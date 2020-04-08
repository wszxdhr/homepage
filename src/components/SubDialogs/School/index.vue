<template>
  <hp-dialog :visible.sync="visible"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             top="calc(50vh - 600px / 2)"
             :width="`${width}px`"
             ref="mainDialog"
             class="school-dialog"
             title="地大物博">
    <hp-sub-dialog title="SCHOOL INFO">
      <div class="school-dialog_row">
        <hp-image-display class="school-dialog_image" :src="$dataJson.school.image"></hp-image-display>
        <div class="school-dialog_info">
          <hp-text-display type="primary" background="transparent" size="common" :text="$dataJson.school.name"></hp-text-display>
          <hp-text-display type="white" background="transparent" size="small" :text="`${$dataJson.school.timeRange[0]} - ${$dataJson.school.timeRange[1]}`"></hp-text-display>
          <hp-text-display type="gray-very-light" background="transparent" size="small" :text="$dataJson.school.education"></hp-text-display>
          <hp-text-display type="gray-very-light" background="transparent" size="small" :text="$dataJson.school.major"></hp-text-display>
        </div>
      </div>
    </hp-sub-dialog>
  </hp-dialog>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'SchoolDialog',
  mixins: [Mixin],
  data () {
    return {
      width: 500
    }
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog] : []
    }
  }
}
</script>

<style lang="scss">
  .school-dialog {
    &_row {
      display: flex;
    }
    &_image {
    }
    &_info {
      margin-left: 10px;
      flex: 1;
    }
  }
</style>
