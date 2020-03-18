<template>
  <div class="hp-dialog" :style="{top, left, width, height, position: (isStatic ? 'static' : 'fixed')}">
    <canvas class="hp-dialog_background" ref="background"></canvas>
    <div class="hp-dialog_header">
      <slot name="title"></slot>
    </div>
    <div class="hp-dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import cssVariables from '@/assets/style/hpComponent/dialog.scss'
import resizeDetector from 'element-resize-detector'
export default {
  name: 'HpDialog',
  props: {
    top: {
      type: [String, Number],
      default: ''
    },
    left: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isStatic: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cssVariables,
      backgroundCtx: null
    }
  },
  methods: {
    initBackground () {
      const canvas = this.$refs.background
      this.backgroundCtx = canvas.getContext('2d')
      const erd = resizeDetector()
      console.log(erd, canvas)
      erd.listenTo(this.$el, (el) => {
        this.refreshBackground()
      })
      this.refreshBackground()
    },
    refreshBackground () {
      const canvas = this.$refs.background
      const ctx = this.backgroundCtx
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const width = canvas.width
      const height = canvas.height
      const ratio = parseInt(this.cssVariables['header-stand-out-height']) / (parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2)
      const lineHeader = () => {
        ctx.lineTo(width, parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-outer-min-width']) + parseInt(this.cssVariables['header-stand-out-offset-x']), parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-outer-min-width']) + parseInt(this.cssVariables['header-stand-out-offset-x']) - parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, 0)
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, 0)
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']), parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(0, parseInt(this.cssVariables['header-stand-out-height']))
      }
      ctx.clearRect(0, 0, width, height)
      // const borderWidth = 1
      // const borderRadius = this.cssVariables['border-radius']
      ctx.save()
      ctx.fillStyle = this.cssVariables['header-stand-out-sub-block-background-color-active']
      ctx.beginPath()
      ctx.moveTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, parseInt(this.cssVariables['header-stand-out-height']) - parseInt(this.cssVariables['header-stand-out-sub-block-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, parseInt(this.cssVariables['header-stand-out-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-min-width']) + parseInt(this.cssVariables['header-stand-out-sub-block-width']), parseInt(this.cssVariables['header-stand-out-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-min-width']) + parseInt(this.cssVariables['header-stand-out-sub-block-width']) - (parseInt(this.cssVariables['header-stand-out-sub-block-height']) / ratio), parseInt(this.cssVariables['header-stand-out-height']) - parseInt(this.cssVariables['header-stand-out-sub-block-height']))
      ctx.closePath()
      ctx.fill()
      ctx.restore()
      ctx.save()
      ctx.strokeStyle = this.cssVariables['border-color']
      ctx.fillStyle = this.cssVariables['content-background-color']
      ctx.beginPath()
      // 从左下角开始画
      ctx.moveTo(0, height)
      ctx.lineTo(width, height)
      lineHeader()
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.restore()
    }
  },
  mounted () {
    this.initBackground()
  }
}
</script>
