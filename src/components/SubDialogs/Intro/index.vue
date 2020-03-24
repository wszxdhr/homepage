<template>
  <hp-dialog :visible="visible"
             @update:visible="$emit('update:visible', $event)"
             class="intro-dialog"
             left="460px" top="calc((100vh - 500px) / 2)" width="360px"
             title="吃喝拉撒">
    <hp-sub-dialog title="PERSONAL INFORMATION">
      <div class="intro-dialog-inner">
        <img src="@/assets/images/NameBarcode.png" alt="" class="name-barcode-image"/>
        <p class="text-color-primary text-size-common">
          张  潇
        </p>
        <img src="@/assets/images/Person.jpg" alt="" class="person-image"/>
        <p>
          <span class="text-color-gray-light text-size-common">男</span>
          <span class="text-color-gray-light text-size-small">26岁</span>
        </p>
        <p class="text-color-gray-light text-size-tiny">EMAIL ADDRESS</p>
        <p class="text-color-white text-size-tiny">wszxdhr@126.com</p>
      </div>
    </hp-sub-dialog>
  </hp-dialog>
</template>

<script>
export default {
  name: 'IntroDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .intro-dialog {
    .intro-dialog-inner {
      text-align: center;
      & > * {
        margin-top: 10px;
        line-height: 1;
      }
      .name-barcode-image {
        width: 100%;
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
    }
  }
</style>
