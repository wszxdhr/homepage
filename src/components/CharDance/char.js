export default class Char {
  constructor ({ x, y, char = ' ', ctx, w, h, index, isDancing = false, charset = '@#$%&*' }) {
    this.setPos(x, y, w, h)
    this.ctx = ctx
    this.index = index
    this.isDancing = isDancing
    this.charset = charset
    this.setChar(char)
  }

  setPos (x, y) {
    this.x = x
    this.y = y
  }

  setRect (x, y, w, h) {
    this.charWidth = w
    this.charHeight = h
    this.setPos(x, y)
  }

  setChar (char) {
    this.char = char
  }

  getRandomInt (start, end) {
    return Math.round(start + (end - start) * Math.random())
  }

  randomChar () {
    const range = [0, this.charset.length - 1]
    return this.charset[this.getRandomInt(...range)]
  }

  render () {
    this.ctx.clearRect(this.x - this.charWidth / 2, this.y - this.charHeight / 2, this.charWidth, this.charHeight)
    // if (!this.isDancing) {
    this.ctx.fillText(this.isDancing ? this.randomChar() : this.char, this.x, this.y)
    // } else {
    // this.ctx.fillRect(this.x, this.y + this.charHeight / 2, this.charWidth, this.charHeight)
    // }
  }

  startDance () {
    this.isDancing = true
  }

  stopDance () {
    this.isDancing = false
  }
}
