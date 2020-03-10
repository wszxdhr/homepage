<template>
  <span>
    {{ char }}
  </span>
</template>

<script>
export default {
  name: 'DancingChar',
  props: {
    chars: {
      type: [Array, String],
      default: '@#$%^&*()'
    }
  },
  data () {
    return {
      char: this.chars[0],
      charIndex: 0
    }
  },
  created () {
    setInterval(() => {
      this.charIndex++
      if (this.charIndex > this.chars.length) {
        this.charIndex = 0
      }
      this.char = this.chars[this.charIndex]
    }, 200)
  }
}
</script>
