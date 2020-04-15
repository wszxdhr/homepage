<template>
  <canvas :style="{width: width + 'px', height: height + 'px'}" @mousemove="focusMove"/>
</template>

<script>
import Char from './char'
const RENDER_ONCE = 200
const DISPLAY_IMAGE_DELAY = 3000
const DISPLAY_EMPTY_DELAY = 0
const HANDLE_ANIMATE_LIST_DELAY = 10
export default {
  name: 'CharDance',
  props: {
    // 字符画数组
    rect: {
      default: () => ([]),
      type: Array
    },
    // 是否在初始化时播放
    animateOnInit: {
      default: false,
      type: Boolean
    },
    // 随机出现的字符集
    transChar: {
      default: '+',
      type: [String, Array]
    },
    width: {
      default: 800
    },
    height: {
      default: 800
    },
    // 字符颜色
    color: {
      type: String,
      default: '#000'
    }
  },
  data () {
    return {
      display: [],
      // 渲染队列
      queue: [],
      // 正在播放的字符列表
      dancingList: [],
      focusList: [],
      // 是否正在播放动画
      isDancing: false,
      ctx: null
    }
  },
  mounted () {
    this.init()
    if (this.animateOnInit) {
      setTimeout(() => {
        this.play()
      }, DISPLAY_EMPTY_DELAY)
    }
  },
  methods: {
    init () {
      const canvas = this.$el
      this.ctx = canvas.getContext('2d')
      canvas.width = this.width
      canvas.height = this.height
      const raf = () => {
        this.render()
        window.requestAnimationFrame(() => {
          raf()
        })
      }
      raf()
      if (this.rect && this.rect.length) {
        this.initDisplay(this.rect)
      }
      this.render()
    },
    resetCharItem (rect = []) {
      this.display = rect.map((rowItem, rowIndex) => {
        const row = (rowItem instanceof Array) ? rowItem : rowItem.split('')
        const result = []
        row.map((char, charIndex) => {
          const charW = this.width / 101
          const charH = this.width / 53
          const charX = charIndex * charW
          const charY = (rowIndex + 1) * charH
          const charText = char
          const charItem = new Char({ x: charX + charW / 2, y: charY, w: charW, h: charH, char: charText, ctx: this.ctx, index: [rowIndex, charIndex], isDancing: true, charset: ' ' })
          charItem.setRect(charX + charW / 2, charY, charW, charH)
          charItem.setChar(charText)
          charItem.isDancing = true
          result.push(charItem)
        })
        return result
      })
    },
    initDisplay (rect = this.rect) {
      this.resetCharItem(rect)
      this.queue.push(...this.display.reduce((result, row, rowIndex) => {
        row.map((char, charIndex) => {
          result.push([rowIndex, charIndex])
        })
        return result
      }, []))
    },
    focusMove (evt) {
      // console.log(evt.offsetX, evt.offsetY)
    },
    getRandomInt (start, end) {
      return Math.round(start + (end - start) * Math.random())
    },
    // 乱序列表
    randomList (list) {
      const temp = [...list]
      const result = []
      while (temp.length) {
        result.push(...(temp.splice(this.getRandomInt(0, temp.length - 1), 1) || []))
      }
      return result
    },
    play () {
      this.isDancing = true
      const randomDisplayList = this.randomList(this.display.flat())
      const timer = setInterval(() => {
        const danceChar = randomDisplayList.splice(0, 20)
        danceChar.map(char => {
          char.stopDance()
        })
        this.dancingList.push(...danceChar)
        this.queue.push(...danceChar.map(item => item.index))
        if (!randomDisplayList.length) {
          clearInterval(timer)
          setTimeout(() => {
            this.stop()
          }, DISPLAY_IMAGE_DELAY)
        }
      }, HANDLE_ANIMATE_LIST_DELAY)
    },
    stop () {
      const randomDisplayList = this.randomList(this.display.flat())
      const timer = setInterval(() => {
        const danceChar = randomDisplayList.splice(0, 20)
        danceChar.map(char => {
          char.startDance()
        })
        this.queue.push(...danceChar.map(item => item.index))
        if (!randomDisplayList.length) {
          this.dancingList = []
          this.isDancing = false
          clearInterval(timer)
          setTimeout(() => {
            this.$emit('finish')
          }, DISPLAY_EMPTY_DELAY)
        }
      }, HANDLE_ANIMATE_LIST_DELAY)
    },
    render () {
      // this.ctx.clearRect(0, 0, this.width, this.height)
      // this.ctx.fillStyle = '#000'
      this.ctx.save()
      this.ctx.font = `bold ${this.width / 100}px arial`
      this.ctx.fillStyle = this.color
      this.ctx.textAlign = 'center'
      const renderList = this.queue.splice(0, RENDER_ONCE)
      if (renderList && renderList.length) {
        renderList.map(([rowIndex = 0, charIndex = 0]) => {
          if (this.display[rowIndex]) {
            this.display[rowIndex][charIndex].render()
          }
        })
      }
      this.ctx.restore()
    }
  },
  watch: {
    rect (val) {
      this.resetCharItem(val)
      this.play()
    },
    dancingList (val) {
      // if (val.length >= ) {
      //
      // }
    }
  }
}
</script>
