<template>
  <hp-dialog :visible.sync="visible"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             top="calc(50vh - 600px / 2)"
             :width="`${width}px`"
             ref="mainDialog"
             class="work-dialog"
             title="振兴中华">
    <div class="work-dialog_row">
      <hp-sub-dialog title="MY WORK EXPERIENCES" class="work-dialog_column work-list">
        <hp-block>123</hp-block>
      </hp-sub-dialog>
      <hp-sub-dialog title="WORK DETAIL" class="work-dialog_column work-detail">
        <hp-block>456</hp-block>
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
      width: 800
    }
  },
  methods: {
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog] : []
    }
  }
}
</script>

<style lang="scss">
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
      width: 220px;
    }
    .work-detail {
      flex: 1;
    }
  }
</style>
