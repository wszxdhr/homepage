<template>
  <canvas :style="{width: width + 'px', height: height + 'px'}"/>
</template>

<script>
import Char from './char'
const RENDER_ONCE = 100
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
      ctx: null
    }
  },
  mounted () {
    this.init()
    if (this.animateOnInit) {
      this.play()
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
        this.initDisplay()
      }
      this.render()
    },
    initDisplay () {
      this.display = this.rect.map((rowItem, rowIndex) => {
        const row = (rowItem instanceof Array) ? rowItem : rowItem.split('')
        const result = []
        row.map((char, charIndex) => {
          result.push(new Char({ x: charIndex * 8, y: rowIndex * 14, w: 8, h: 14, char, ctx: this.ctx }))
        })
        return result
      })
      this.queue.push(...this.display.reduce((result, row, rowIndex) => {
        row.map((char, charIndex) => {
          result.push([rowIndex, charIndex])
        })
        return result
      }, []))
      console.log([...this.queue])
    },
    play () {},
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
    rect () {
      this.initDisplay()
    }
  }
}
</script>
