<template>
  <div :class="['hp-dialog', `header-position-${headerPosition}`]" v-show="visible" :style="{
    top: moveInfo && typeof moveInfo.y === 'number' ? moveInfo.y + 'px' : top,
    left: moveInfo && typeof moveInfo.x === 'number' ? moveInfo.x + 'px' : left,
    width, height,
    position: (isStatic ? 'static' : 'fixed'), zIndex
  }" @mousedown="setActive(true, $event)" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mousemove="onMouseMove">
    <canvas class="hp-dialog_background" ref="background"></canvas>
    <div class="hp-dialog_header-wrapper" ref="header" :style="{width: headerWidth, minWidth: headerMinWidth, paddingRight: this.headerSubBlockWidth ? parseInt(headerSubBlockWidth) + parseInt(cssVariables['header-stand-out-outer-and-inner-subtract']) / 2 + 'px' : ''}">
      <div class="hp-dialog_header">
        <h2>{{title}}{{isCloseBtnHover}}</h2>
        <slot name="title"></slot>
      </div>
    </div>
    <div :class="['hp-dialog_content-wrapper', contentWrapperClass]" :style="{}">
      <div :class="['hp-dialog_content', contentClass]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import cssVariables from '@/assets/style/hpComponent/dialog.scss'
import resizeDetector from 'element-resize-detector'
import pointInPolygon from './pointInPolygon'
import activeManage from './activeManage'
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
    },
    movable: {
      type: Boolean,
      default: true
    },
    defaultActive: {
      type: Boolean,
      default: false
    },
    headerPosition: {
      type: String,
      default: 'top'
    },
    contentClass: {
      type: String,
      default: ''
    },
    contentWrapperClass: {
      type: String,
      default: ''
    },
    headerWidth: {
      type: String,
      default: ''
    },
    headerMinWidth: {
      type: String,
      default: ''
    },
    headerSubBlockWidth: {
      type: [String, Number],
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cssVariables,
      backgroundCtx: null,
      isActive: this.defaultActive,
      zIndex: ++activeManage.maxZIndex,
      moveInfo: null,
      isHover: false,
      isCloseBtnHover: false,
      callbackOnResize: null
    }
  },
  methods: {
    initBackground () {
      const canvas = this.$refs.background
      this.backgroundCtx = canvas.getContext('2d')
      const erd = resizeDetector()
      erd.listenTo(this.$el, (el) => {
        this.refreshBackground()
      })
      erd.listenTo(this.$refs.header, (el) => {
        this.refreshBackground()
      })
    },
    refreshBackground () {
      const canvas = this.$refs.background
      const ctx = this.backgroundCtx
      const width = this.headerPosition === 'top' || this.headerPosition === 'bottom' ? this.$el.offsetWidth : this.$el.offsetHeight
      const height = this.headerPosition === 'top' || this.headerPosition === 'bottom' ? this.$el.offsetHeight : this.$el.offsetWidth
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.width = width
      canvas.height = height
      const titleWidth = this.$refs.header.offsetWidth
      const headerStandOutRealWidth = titleWidth - parseInt(this.cssVariables['header-stand-out-offset-x']) - (parseInt(this.headerSubBlockWidth) || parseInt(this.cssVariables['header-stand-out-sub-block-width']))
      const ratio = parseInt(this.cssVariables['header-stand-out-height']) / (parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2)
      const lineHeader = () => {
        ctx.lineTo(width, parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(headerStandOutRealWidth + parseInt(this.cssVariables['header-stand-out-offset-x']), parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(headerStandOutRealWidth + parseInt(this.cssVariables['header-stand-out-offset-x']) - parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, 0)
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, 0)
        ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']), parseInt(this.cssVariables['header-stand-out-height']))
        ctx.lineTo(0, parseInt(this.cssVariables['header-stand-out-height']))
      }
      const lineDialog = () => {
        ctx.beginPath()
        // 从左下角开始画
        ctx.moveTo(0, height)
        ctx.lineTo(width, height)
        lineHeader()
        ctx.lineTo(0, height)
        ctx.closePath()
      }
      ctx.clearRect(0, 0, width, height)
      // const borderWidth = 1
      // const borderRadius = this.cssVariables['border-radius']
      // 最后面的黄色装饰
      ctx.save()
      ctx.fillStyle = this.isActive ? this.cssVariables[`header-stand-out-sub-block-background-color-active${this.isHover ? '-hover' : ''}`] : this.cssVariables[`header-stand-out-sub-block-background-color-normal${this.isHover ? '-hover' : ''}`]
      ctx.beginPath()
      ctx.moveTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, parseInt(this.cssVariables['header-stand-out-height']) - parseInt(this.cssVariables['header-stand-out-sub-block-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2, parseInt(this.cssVariables['header-stand-out-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + headerStandOutRealWidth + (parseInt(this.headerSubBlockWidth) || parseInt(this.cssVariables['header-stand-out-sub-block-width'])), parseInt(this.cssVariables['header-stand-out-height']))
      ctx.lineTo(parseInt(this.cssVariables['header-stand-out-offset-x']) + headerStandOutRealWidth + (parseInt(this.headerSubBlockWidth) || parseInt(this.cssVariables['header-stand-out-sub-block-width'])) - (parseInt(this.cssVariables['header-stand-out-sub-block-height']) / ratio), parseInt(this.cssVariables['header-stand-out-height']) - parseInt(this.cssVariables['header-stand-out-sub-block-height']))
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // 先画内容再画框，不然框线会被挡住
      // 整体背景，包含content
      ctx.save()
      ctx.fillStyle = this.cssVariables['content-background-color']
      lineDialog()
      ctx.fill()
      ctx.restore()

      // 顶部header
      ctx.save()
      ctx.fillStyle = this.cssVariables['header-background-color']
      ctx.beginPath()
      ctx.moveTo(width, parseInt(this.cssVariables['header-line-height']))
      lineHeader()
      ctx.lineTo(0, parseInt(this.cssVariables['header-line-height']))
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // 外部边框
      ctx.save()
      ctx.strokeStyle = this.cssVariables['border-color']
      lineDialog()
      ctx.stroke()
      ctx.restore()
    },
    startMove (evt) {
      this.moveInfo = {
        startX: this.$el.offsetLeft,
        startY: this.$el.offsetTop,
        startMouseX: evt.pageX,
        startMouseY: evt.pageY,
        x: this.$el.offsetLeft,
        y: this.$el.offsetTop
      }
      const move = (evt) => {
        // moveInfo.startMouseX - moveInfo.startX === evt.pageX - moveInfo.x
        this.moveInfo.x = evt.pageX - (this.moveInfo.startMouseX - this.moveInfo.startX)
        this.moveInfo.y = evt.pageY - (this.moveInfo.startMouseY - this.moveInfo.startY)
      }
      const moveEnd = (evt) => {
        this.endMove(evt)
        document.removeEventListener('mouseup', moveEnd)
        document.removeEventListener('mousemove', move)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', moveEnd)
    },
    endMove (evt) {
      this.fixDialogPos()
    },
    onMouseEnter () {
      this.isHover = true
      this.refreshBackground()
    },
    onMouseLeave () {
      this.isHover = false
      this.refreshBackground()
    },
    onMouseMove (evt) {
      // console.log(evt)
      this.refreshIsCloseBtnHover({ x: evt.offsetX, y: evt.offsetY })
    },
    refreshIsCloseBtnHover ({ x, y }) {
      const closeBtnTop = 0
      const closeBtnBottom = 1
      // 从左到右4个横坐标
      // const closeBtnX2 = parseInt(this.cssVariables['header-stand-out-offset-x']) + parseInt(this.cssVariables['header-stand-out-outer-min-width'])
      // const closeBtnX1 = closeBtnX2 - parseInt(this.cssVariables['header-stand-out-outer-and-inner-subtract']) / 2
      // const closeBtnX3 = closeBtnX1 + parseInt(this.cssVariables['header-stand-out-sub-block-width'])
      // const closeBtnX4 = closeBtnX2 + parseInt(this.cssVariables['header-stand-out-sub-block-width'])
      console.log(x, y, closeBtnTop, closeBtnBottom, pointInPolygon({ x, y },
        [
          { x: 0, y: closeBtnTop },
          { x: 200, y: closeBtnTop },
          { x: 200, y: closeBtnBottom },
          { x: 0, y: closeBtnBottom }
        ])
      )
    },
    fixDialogPos () {
      if (!this.isStatic) {
        const dialogWidth = this.$el.offsetWidth
        this.moveInfo = {
          x: this.$el.offsetLeft,
          y: this.$el.offsetTop
        }
        if (this.$el.offsetLeft + 50 > window.innerWidth) {
          this.moveInfo.x = window.innerWidth - 50
        }
        if (this.$el.offsetLeft + dialogWidth < 50) {
          this.moveInfo.x = -(dialogWidth - 50)
        }
        if (this.$el.offsetTop + 50 > window.innerHeight) {
          this.moveInfo.y = window.innerHeight - 50
        }
        if (this.$el.offsetTop < 0) {
          this.moveInfo.y = 0
        }
      }
    },
    setActive (value, evt) {
      if (!this.isStatic) {
        if (evt) {
          evt.preventDefault()
        }
        this.isActive = value
        if (value) {
          if (activeManage.currentActive && activeManage.currentActive !== this) {
            activeManage.currentActive.setActive(false)
          }
          activeManage.currentActive = this
          this.zIndex = ++activeManage.maxZIndex
          if (evt && this.movable) {
            this.startMove(evt)
          }
        }
        this.refreshBackground()
      }
    }
  },
  mounted () {
    this.initBackground()
    if (this.defaultActive && this.isStatic) {
      this.setActive(true)
    } else {
      // 避免重复绘制
      this.refreshBackground()
    }
    this.callbackOnResize = () => {
      this.fixDialogPos()
    }
    window.addEventListener('resize', this.callbackOnResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.callbackOnResize)
  }
}
</script>
