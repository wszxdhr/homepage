<template>
  <canvas :style="{width: width + 'px', height: height + 'px'}"/>
</template>

<script>
import Char from './char'
const RENDER_ONCE = 100
const DISPLAY_DELAY = 2000
const HANDLE_ANIMATE_LIST_DELAY = 10
export default {
  name: 'CharDance',
  props: {
    rect: {
      default: () => ([]),
      type: Array
    },
    animateOnInit: {
      default: false,
      type: Boolean
    },
    transChar: {
      default: '+',
      type: [String, Array]
    },
    width: {
      default: 800
    },
    height: {
      default: 800
    }
  },
  data () {
    return {
      display: [],
      queue: [],
      oldRect: this.rect,
      dancingList: [],
      isDancing: false,
      ctx: null
    }
  },
  mounted () {
    this.init()
    if (this.animateOnInit) {
      setTimeout(() => {
        this.play()
      }, DISPLAY_DELAY)
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
    initDisplay (rect = []) {
      this.display = rect.map((rowItem, rowIndex) => {
        const row = (rowItem instanceof Array) ? rowItem : rowItem.split('')
        const result = []
        row.map((char, charIndex) => {
          const charX = charIndex * 8
          const charY = rowIndex * 14
          const charW = 8
          const charH = 14
          const charText = 14
          const isDancing = this.isDancing
          const charItem = (this.display[rowIndex] || [])[charIndex] ? this.display[rowIndex][charIndex] : new Char({ x: charX, y: charY, w: charW, h: charH, char: charText, ctx: this.ctx, index: [rowIndex, charIndex], isDancing: isDancing })
          charItem.setRect(charX, charY, charW, charH)
          charItem.setChar(charText)
          charItem.isDancing = isDancing
          result.push(charItem)
        })
        console.log(result)
        return result
      })
      this.queue.push(...this.display.reduce((result, row, rowIndex) => {
        row.map((char, charIndex) => {
          result.push([rowIndex, charIndex])
        })
        return result
      }, []))
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
          char.startDance()
        })
        this.dancingList.push(...danceChar)
        this.queue.push(...danceChar.map(item => item.index))
        if (!randomDisplayList.length) {
          clearInterval(timer)
          setTimeout(() => {
            this.stop()
          }, DISPLAY_DELAY)
        }
      }, HANDLE_ANIMATE_LIST_DELAY)
    },
    stop () {
      const randomDisplayList = this.randomList(this.display.flat())
      const timer = setInterval(() => {
        const danceChar = randomDisplayList.splice(0, 20)
        danceChar.map(char => {
          char.stopDance()
        })
        this.queue.push(...danceChar.map(item => item.index))
        if (!randomDisplayList.length) {
          this.dancingList = []
          this.isDancing = false
          clearInterval(timer)
          setTimeout(() => {
            this.$emit('finish')
          }, DISPLAY_DELAY)
        }
      }, HANDLE_ANIMATE_LIST_DELAY)
    },
    render () {
      // this.ctx.clearRect(0, 0, this.width, this.height)
      // this.ctx.fillStyle = '#000'
      this.ctx.save()
      this.ctx.font = 'bold 8px arial'
      this.ctx.textAlign = 'center'
      const renderList = this.queue.splice(0, RENDER_ONCE)
      if (renderList && renderList.length) {
        renderList.map(([rowIndex = 0, charIndex = 0]) => {
          this.display[rowIndex][charIndex].render()
        })
      }
      this.ctx.restore()
    }
  },
  watch: {
    rect (val, oldVal) {
      this.oldRect = oldVal || val
      console.log(oldVal || val)
      this.initDisplay(this.oldRect)
    },
    dancingList (val) {
      // if (val.length >= ) {
      //
      // }
    }
  }
}
</script>
