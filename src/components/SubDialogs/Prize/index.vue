<template>
  <hp-dialog :visible.sync="visible"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             top="calc(50vh - 600px / 2)"
             :width="`${width}px`"
             ref="mainDialog"
             class="prize-dialog"
             title="PRICES">
    <ul class="prize-dialog-list">
      <li class="prize-dialog-item" v-for="prize in $dataJson.prize" :key="prize.name">
        <img :src="prize.image" alt="" class="prize-image"/>
        <div class="prize-dialog-item_info">
          <hp-text-display class="prize-name" type="primary" background="transparent" :text="prize.name" size="common"></hp-text-display>
          <hp-text-display class="prize-desc" type="white" background="transparent" :text="prize.desc" size="small"></hp-text-display>
          <hp-text-display class="prize-time" type="gray-very-light" background="transparent" :text="prize.time" size="small"></hp-text-display>
        </div>
      </li>
    </ul>
  </hp-dialog>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'PrizeDialog',
  mixins: [Mixin],
  data () {
    return {
      width: 600
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
  @import '~@/assets/style/hpComponent/base.scss';
  .prize-dialog {
    &-list {
    }
    &-item {
      display: flex;
      padding: 10px 0;
      &_info {
        margin-left: 10px;
      }
      & + .prize-dialog-item {
        margin-top: 20px;
        position: relative;
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px dashed $base-gray-very-light;
        }
      }
      .prize-image {
        width: 120px;
        height: 120px;
        max-width: 120px;
        max-height: 120px;
        flex: 1;
        filter: grayscale(0.6);
        transition: .3s all;
      }
      .prize-name {
        text-align: left;
      }
      .prize-desc {
        text-align: left;
      }
      .prize-time {
        text-align: left;
      }
      &:hover {
        .prize-image {
          filter: grayscale(0);
        }
      }
    }
  }
</style>
