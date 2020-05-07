<template>
  <hp-dialog class="github-dialog"
             closeable
             :left="`calc(50vw - ${width}px / 2)`"
             :top="`calc(50vh - ${height}px / 2)`"
             :width="`${width}px`"
             :height="`${height}px`"
             ref="mainDialog"
             title="MY GITHUB"
             :visible.sync="visible">
    <hp-sub-dialog title="GITHUB USER INFO" v-if="githubInfo">
      <hp-block class="github-info">
        <img :src="githubInfo.avatar_url" alt="" class="github-info_avatar"/>
        <div class="github-info_content">
          <hp-text-display :text="githubInfo.name" size="large" type="primary" background="transparent"></hp-text-display>
          <hp-text-display size="small" type="white" background="transparent">
            <span>
              <i class="iconfont icon-star-empty"></i>
              <span>
                {{starCount}}
              </span>
            </span>
            <span style="margin-left: 20px;">
              <i class="iconfont icon-follower"></i>
              <span>
                {{githubInfo.followers}}
              </span>
            </span>
          </hp-text-display>
        </div>
      </hp-block>
    </hp-sub-dialog>
    <hp-sub-dialog title="GITHUB REPOSITORIES"></hp-sub-dialog>
    <hp-sub-dialog title="GITHUB CONTRIBUTION" class="contribution-block">
      <div class="github-calendar"></div>
    </hp-sub-dialog>
  </hp-dialog>
</template>

<script>
import Mixin from '../mixin'
import cssVariables from '@/assets/style/hpComponent/base.scss'
import githubCalendar from 'github-calendar'

export default {
  name: 'GithubDialog',
  mixins: [Mixin],
  data () {
    return {
      width: 580,
      height: 600,
      githubInfo: null,
      repoList: [],
      cssVariables
    }
  },
  created () {
    // 获取Github信息
    this.$apiList.github.getProfileInfo().then(data => {
      if (data) {
        this.githubInfo = data
        // 获取仓库列表
        this.$apiList.github.getRepoInfo(data.repos_url).then(repoData => {
          if (repoData) {
            this.repoList = repoData || []
            console.log(this.repoList)
          }
        })
      }
    })
  },
  mounted () {
    // 获取Github首页页面
    githubCalendar('.github-calendar', 'wszxdhr')
  },
  computed: {
    starCount () {
      return this.repoList.reduce((accu, cur = {}) => {
        return accu + (cur.stargazers_count || 0)
      }, 0)
    }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/style/hpComponent/base.scss';
  .github-dialog {
    .github-info {
      display: flex;
      padding: 4px;
      &_avatar {
        height: 80px;
        width: 80px;
        min-height: 80px;
        min-width: 80px;
        filter: grayscale(0.8);
        transition: .3s all;
      }
      &:hover {
        .github-info_avatar {
          filter: grayscale(0);
        }
      }
      &_content {
        flex: 1;
        margin-left: 10px;
      }
    }
    .contribution-block {
      .hp-sub-dialog_content {
        overflow: hidden;
      }
    }
    .github-calendar {
      width: 480px;
      height: 80px;
      .contrib-footer, .contrib-column {
        display: none;
      }
      .js-calendar-graph-svg {
        margin-left: -4px;
        transform: scale(.6);
        transform-origin: left top;
        .month, .wday {
          fill: $base-white;
          font-size: 16px;
        }
        .wday {
          font-size: 12px;
          /*display: none;*/
        }
        .day {
          height: 8px;
          width: 8px;
          transform: translate(0, 0);
          fill: $base-color;
          &[data-count='0'] {
            fill: $base-gray-very-light;
            height: 8px;
            width: 8px;
            transform: translate(0, 0);
            opacity: .14;
          }
          &[data-count='1'] {
            fill: $base-white;
            height: 4px;
            width: 4px;
            transform: translate(3px, 3px);
          }
          &[data-count='2'] {
            height: 5px;
            width: 5px;
            transform: translate(1px, 1px);
            fill: lighten($base-color, 30%);
          }
          &[data-count='3'] {
            height: 6px;
            width: 6px;
            transform: translate(1px, 1px);
            fill: lighten($base-color, 20%);
          }
          &[data-count='4'] {
            height: 8px;
            width: 8px;
            transform: translate(0, 0);
            fill: $base-color;
          }
        }
      }
    }
  }
</style>
