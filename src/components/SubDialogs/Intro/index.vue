<template>
  <div class="intro-dialog-wrap">
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               ref="mainDialog"
               closeable
               class="intro-dialog"
               :left="`calc(50vw - (${mainDialogWidth}px + ${detailDialogWidth}px) / 2)`" top="calc((50vh - 160px) / 2)" :width="`${mainDialogWidth}px`"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        <div class="intro-dialog-inner">
          <p class="text-color-primary text-size-common tac">
            张  潇
          </p>
          <img src="@/assets/images/Person.jpg" alt="" class="person-image"/>
          <p class="gender-and-age">
            <span class="text-color-gray-very-light text-size-common">男</span>
            <span class="text-color-gray-very-light text-size-small age">26岁</span>
          </p>
          <p class="text-color-gray-very-light text-size-small">本科统招（网络工程）</p>
          <p class="text-color-gray-very-light text-size-small">4年工作经验</p>
          <p class="text-color-gray-very-light text-size-small">EMAIL ADDRESS</p>
          <img src="@/assets/images/NameBarcode.png" alt="" class="name-barcode-image"/>
          <p class="text-color-gray-very-light text-size-small tac">
            <a href="mailto:jobs@anymelon.com">job@anymelon.com</a>
          </p>
        </div>
      </hp-sub-dialog>
    </hp-dialog>
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               @close="$emit('update:visible', false)"
               ref="detailDialog"
               class="intro-dialog-detail"
               closeable
               :left="`calc(50vw - (${mainDialogWidth}px + ${detailDialogWidth}px) / 2 + ${mainDialogWidth}px + 20px)`" top="calc((50vh - 160px) / 2)" :width="`${detailDialogWidth}px`"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        <h2 class="text-size-common text-color-primary intro-detail-title">
          技能
        </h2>
        <p class="text-size-small text-color-gray-very-light intro-detail-content">
          划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水，划水划水划水划水划水划水划水划水划水划水划水划水划水。划水划水划水划水划水划水划水划水划水。
        </p>
        <h2 class="text-size-common text-color-primary intro-detail-title">
          技能
        </h2>
        <p class="text-size-small text-color-gray-very-light intro-detail-content">
          划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水，划水划水划水划水，划水划水划水划水，划水划水划水划水，划水划水划水划水划水划水划水划水划水划水划水划水划水。划水划水划水划水划水划水划水划水划水。
        </p>
        <h2 class="text-size-common text-color-primary intro-detail-title">
          技能
        </h2>
        <p class="text-size-small text-color-gray-very-light intro-detail-content">
          划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水，划水划水水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水，划水划水水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水划水，划水划水划水划水划水划水划水划水划水划水划水划水划水。划水划水划水划水划水划水划水划水划水。
        </p>
      </hp-sub-dialog>
    </hp-dialog>
  </div>
</template>

<script>
export default {
  name: 'IntroDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mainDialogWidth: 360,
      detailDialogWidth: 600
    }
  },
  watch: {
    visible (val) {
      if (val && this.$refs && this.$refs.mainDialog && this.$refs.detailDialog) {
        this.$refs.detailDialog.setActive(true)
        this.$refs.mainDialog.setActive(true)
      }
    }
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
