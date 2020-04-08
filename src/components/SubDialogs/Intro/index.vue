<template>
  <div class="intro-dialog-wrap">
    <hp-dialog :visible.sync="visible"
               ref="mainDialog"
               closeable
               class="intro-dialog"
               :left="`calc(50vw - (${mainDialogWidth}px + ${detailDialogWidth}px) / 2)`" top="calc((50vh - 160px) / 2)" :width="`${mainDialogWidth}px`"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        <div class="intro-dialog-inner">
          <p class="text-color-primary text-size-common tac">
            {{$dataJson.self.name}}
          </p>
          <img src="@/assets/images/Person.jpg" alt="" class="person-image"/>
          <p class="gender-and-age">
            <span class="text-color-gray-very-light text-size-common">{{$dataJson.self.gender}}</span>
            <span class="text-color-gray-very-light text-size-small age">{{new Date().getFullYear() - $dataJson.self.bornYear}}岁</span>
          </p>
          <p class="text-color-gray-very-light text-size-small">{{$dataJson.self.school}}</p>
          <p class="text-color-gray-very-light text-size-small">{{$moment().format('YYYY') - $moment($dataJson.self.workStart, 'YYYY.MM').format('YYYY')}}年工作经验</p>
          <p class="text-color-gray-very-light text-size-small">EMAIL ADDRESS</p>
          <img src="@/assets/images/NameBarcode.png" alt="" class="name-barcode-image"/>
          <p class="text-color-gray-very-light text-size-small tac">
            <a :href="`mailto:${$dataJson.self.email}`">{{$dataJson.self.email}}</a>
          </p>
        </div>
      </hp-sub-dialog>
    </hp-dialog>
    <hp-dialog :visible.sync="visible"
               ref="detailDialog"
               class="intro-dialog-detail"
               closeable
               :left="`calc(50vw - (${mainDialogWidth}px + ${detailDialogWidth}px) / 2 + ${mainDialogWidth}px + 20px)`" top="calc((50vh - 160px) / 2)" :width="`${detailDialogWidth}px`"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        <template v-for="info in $dataJson.self.info">
          <h2 class="text-size-common text-color-primary intro-detail-title" :key="`detail-title-${info.title}`">
            {{info.title}}
          </h2>
          <p class="text-size-small text-color-gray-very-light intro-detail-content" :key="`detail-content-${info.title}`">
            {{info.content}}
          </p>
        </template>
      </hp-sub-dialog>
    </hp-dialog>
  </div>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'IntroDialog',
  mixins: [Mixin],
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      mainDialogWidth: 360,
      detailDialogWidth: 600
    }
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog, this.$refs.detailDialog] : []
    }
  },
  methods: {
  },
  watch: {
    // visible (val) {
    //   if (val) {
    //     this.setActive()
    //   }
    // }
  }
}
</script>

<style lang="scss">
  .intro-dialog {
    .intro-dialog-inner {
      /*text-align: center;*/
      & > * {
        margin-top: 10px;
        line-height: 1;
      }
      .name-barcode-image {
        width: 200px;
        margin: 10px auto 4px;
        display: block;
      }
      .name-title {
        display: flex;
        justify-content: space-between;
        width: 200px;
        margin: 0 auto;
      }
      .person-image {
        display: block;
        width: 200px;
        margin-left: auto;
        margin-right: auto;
      }
      .gender-and-age {
        .age {
          margin-left: 14px;
        }
      }
      & > p {
        width: 200px;
        margin: 10px auto 0;
        & + p {
          margin-top: 14px;
        }
      }
    }
  }
  .intro-dialog-detail {
    .intro-detail-title {
      & + .intro-detail-content {
        margin-top: 4px;
      }
    }
    .intro-detail-content {
      & + .intro-detail-title {
        margin-top: 20px;
      }
    }
  }
</style>
