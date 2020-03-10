<template>
  <canvas :style="{width: width + 'px', height: height + 'px'}"/>
</template>

<script>
// const RENDER_ONCE = 100
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
      this.display = this.rect.map(row => {
        return (row instanceof Array) ? row : row.split('')
      })
    },
    play () {},
    render () {
      this.ctx.clearRect(0, 0, this.width, this.height)
      // this.ctx.fillStyle = '#000'
      this.ctx.save()
      this.ctx.font = 'bold 10px arial'
      for (const rowIndex in this.display) {
        const row = this.display[rowIndex]
        for (const charIndex in row) {
          const char = row[charIndex]
          this.ctx.fillText(char, charIndex * 8, rowIndex * 14)
        }
      }
      this.ctx.restore()
      // const renderList = this.queue.splice(0, RENDER_ONCE)
      // if (renderList && renderList.length) {
      //
      // }
    }
  }
}
</script>
