export default class Char {
  constructor ({ x, y, char = ' ', ctx, w, h }) {
    this.x = x
    this.y = y
    this.ctx = ctx
    this.charWidth = w
    this.charHeight = h
    this.setChar(char)
  }

  setChar (char) {
    this.char = char
  }

  render () {
    this.ctx.clearRect(this.x, this.y, this.charWidth, this.charHeight)
    this.ctx.fillText(this.char, this.x, this.y)
  }
}
