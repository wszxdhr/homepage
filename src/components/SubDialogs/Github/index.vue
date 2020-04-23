<template>
  <hp-dialog class="github-dialog"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             :top="`calc(50vh - ${height}px / 2)`"
             :width="`${width}px`"
             :height="`${height}px`"
             ref="mainDialog"
             title="MY GITHUB"
             :visible.sync="visible"></hp-dialog>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'GithubDialog',
  mixins: [Mixin],
  data () {
    return {
      width: 500,
      height: 300
    }
  }
}
</script>
