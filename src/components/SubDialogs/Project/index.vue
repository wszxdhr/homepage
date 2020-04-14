<template>
  <hp-dialog :visible.sync="visible"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             top="40px"
             :width="`${width}px`"
             ref="mainDialog"
             class="project-dialog"
             title="太棒啦">
    <div class="project-dialog_row">
      <hp-sub-dialog title="PROJECT LIST" class="project-dialog_column project-list">
        <hp-text-display size="very-small" :text="project.name" class="project-list-item" @click="active = project.name" background="transparent" :type="active === project.name ? 'primary' : 'white'" :key="project.name" v-for="project in $dataJson.projects"></hp-text-display>
      </hp-sub-dialog>
      <hp-sub-dialog title="PROJECT DETAIL" class="project-dialog_column project-detail">
        <hp-block class="project-detail_title">
          <div>
            <hp-text-display background="transparent" type="primary" size="large" :text="detail.name"></hp-text-display>
            <hp-text-display background="transparent" type="gray-very-light" size="small" :text="detail.desc"></hp-text-display>
            <hp-text-display background="transparent" type="gray-light" size="very-small" :text="detail.subDesc"></hp-text-display>
          </div>
        </hp-block>
        <hp-block class="project-detail_tag-list" transparent :has-dot="false">
          <hp-text-display class="project-detail_tag" :text="tag" v-for="tag in detail.tags" :key="tag" size="mini" type="gray" background="primary"></hp-text-display>
        </hp-block>
        <hp-block transparent :has-dot="false">
          <img class="project-detail_image" :src="detail.image" alt=""/>
        </hp-block>
        <hp-block transparent :has-dot="false">
          <hp-text-display background="transparent" type="white" size="small" :text="content" class="project-detail_content" :key="content" v-for="content in detail.content"></hp-text-display>
        </hp-block>
        <hp-block :has-dot="false" transparent>
          <span v-if="detail.link">
            <span class="text-color-primary">项目链接：</span><a target="_blank" v-if="detail.link" :href="detail.link"><hp-text-display class="project-detail_experience-link" size="mini" type="white" background="transparent" :text="detail.link"></hp-text-display></a>
          </span>
        </hp-block>
      </hp-sub-dialog>
    </div>
  </hp-dialog>
</template>

<script>
import Mixin from '../mixin'
export default {
  name: 'Project-dialog',
  mixins: [Mixin],
  data () {
    return {
      width: 800,
      active: this.$dataJson.projects[0].name
    }
  },
  computed: {
    dialogs () {
      return this.$refs ? [this.$refs.mainDialog] : []
    },
    detail () {
      return this.$dataJson.projects.find(item => item.name === this.active) || {}
    }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/base.scss';
  .project-dialog {
    .project-dialog_row {
      display: flex;
      .project-dialog_column + .project-dialog_column {
        margin-left: 20px;
      }
      .project-list {
        width: 200px;
        &-item {
          padding: 20px 0;
          & + .project-list-item {
            /*margin-top: 10px;*/
            border-top: 1px dashed $base-gray-light;
          }
          &:hover {
            background-color: $base-gray-light;
          }
        }
      }
      .project-detail {
        flex: 1;
        .hp-sub-dialog_content {
          max-height: calc(100vh - #{$dialog-header-line-height} - 200px);
        }
        &_tag-list {
          display: flex;
          .project-detail_tag {
            opacity: .9;
            & + .project-detail_tag {
              margin-left: 10px;
            }
            &:hover {
              opacity: 1;
            }
          }
        }
        &_image {
          width: 100%;
        }
        &_content {
          margin-top: 20px;
          span {
            line-height: 1.4;
          }
          & + .project_detail-content {
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
