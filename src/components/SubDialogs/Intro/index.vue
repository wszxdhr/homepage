<template>
  <div class="intro-dialog-wrap">
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               class="intro-dialog"
               left="460px" top="calc((100vh - 500px) / 2)" width="360px"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        <div class="intro-dialog-inner">
          <p class="text-color-primary text-size-common tac">
            张  潇
          </p>
          <img src="@/assets/images/Person.jpg" alt="" class="person-image"/>
          <p class="gender-and-age">
            <span class="text-color-gray-light text-size-common">男</span>
            <span class="text-color-gray-light text-size-small age">26岁</span>
          </p>
          <p class="text-color-gray-light text-size-small">本科统招（网络工程）</p>
          <p class="text-color-gray-light text-size-small">4年工作经验</p>
          <p class="text-color-gray-light text-size-small">EMAIL ADDRESS</p>
          <img src="@/assets/images/NameBarcode.png" alt="" class="name-barcode-image"/>
          <p class="text-color-gray-light text-size-small tac">
            <a href="mailto:jobs@anymelon.com">jobs@anymelon.com</a>
          </p>
        </div>
      </hp-sub-dialog>
    </hp-dialog>
    <hp-dialog :visible="visible"
               @update:visible="$emit('update:visible', $event)"
               class="intro-dialog-detail"
               left="840px" top="calc((100vh - 500px) / 2)" width="500px"
               title="爱我中华">
      <hp-sub-dialog title="PERSONAL INFORMATION">
        123
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
</style>
