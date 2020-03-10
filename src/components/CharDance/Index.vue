<template>
  <div class="char-dance">
    <div class="char-dance-row" v-for="(row, rowIndex) in rectDisplay" :key="rowIndex">
      <pre class="char-dance-item" v-for="(char, charIndex) in row" :key="charIndex">
        <span v-if="!danceList.includes(`${rowIndex},${charIndex}`)">{{char}}</span>
        <dancing-char v-if="danceList.includes(`${rowIndex},${charIndex}`)" :chars="transChar"></dancing-char>
      </pre>
    </div>
  </div>
</template>

<script>
import DancingChar from './DancingChar'
export default {
  name: 'CharDance',
  components: {
    DancingChar
  },
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
    }
  },
  data () {
    return {
      timers: [],
      isDancing: false,
      useOldChars: true,
      oldChars: this.rect,
      danceList: []
    }
  },
  created () {
    if (this.animateOnInit) {
      this.play()
    }
  },
  methods: {
    getRandomInt (start, end) {
      return Math.round(start + (end - start) * Math.random())
    },
    sleep (time) {
      return new Promise(resolve => {
        this.timers.push(setTimeout(() => {
          resolve()
        }, time))
      })
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
    async play () {
      if (!this.isDancing) {
        this.isDancing = true
        this.useOldChars = true
        // 获取二维数组的角标，每次setTimeout时随机选一个
        let time = 0
        // 如果用for of 循环，因为改变了源数组，所以会循环不完，所以复制一个数组出来用
        console.log(this.randomList(this.flatRectIndex))
        for (const indexArr of this.randomList(this.flatRectIndex)) {
          this.timers.push(setTimeout(() => {
            this.danceList.push(indexArr.join(','))
          }, time))
          time += this.getRandomInt(17, 20)
        }
        this.timers.push(setTimeout(() => {
          this.stop()
        }, time))
      }
    },
    async stop () {
      if (this.isDancing) {
        for (const timer of this.timers) {
          clearTimeout(timer)
        }
        this.useOldChars = false
        this.isDancing = false
        const copiedDanceList = this.randomList(this.danceList)
        // console.log(copiedDanceList.length)
        while (this.danceList.length) {
          const deleteItem = copiedDanceList.pop()
          await this.sleep(this.getRandomInt(17, 20))
          this.danceList.splice(this.danceList.indexOf(deleteItem), 1)
        }
        this.$emit('finish')
      }
    }
  },
  computed: {
    flatRectIndex () {
      return this.rect.map((rectItem, rectIndex) => {
        if (rectItem instanceof Array) {
          return rectItem.map((subItem, subIndex) => [rectIndex, subIndex])
        } else {
          return []
        }
      }).flat()
    },
    rectDisplay () {
      return this.rect
    }
  },
  watch: {
    rect (val, oldVal) {
      this.oldChars = oldVal
      // this.play()
    }
  }
}
</script>

<style lang="scss">
  .char-dance {
    line-height: 1;
    &-row {
      text-align: left;
      display: flex;
    }
    &-item {
      margin: 0;
      white-space: normal;
      width: 8px;
    }
  }
</style>
