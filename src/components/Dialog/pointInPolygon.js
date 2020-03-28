/*
* 射线法判断点是否在多边形内
* 向右发射射线（到多边形x最大的坐标+1的位置为止）
* 交叉点为奇数则在多边形内
* 特殊情况：
* 1. 刚好在两线交叉点交叉
* 2. 刚好和某一条线段重叠
* */

class Line {
  constructor (x1, y1, x2, y2) {
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }

  getIsCross (line) {
    /*
    * (x - this.x1) * (this.y2 - this.y1) / (this.x2 - this.x1) + this.y1 = (x - line.x1) * (line.y2 - line.y1) / (line.x2 - line.x1) + line.y1
    * x * (this.y2 - this.y1) / (this.x2 - this.x1) - this.x1 * (this.y2 - this.y1) / (this.x2 - this.x1) + this.y1 = x * (line.y2 - line.y1) / (line.x2 - line.x1) - line.x1 * (line.y2 - line.y1) / (line.x2 - line.x1) + line.y1
    * x = (- line.x1 * (line.y2 - line.y1) / (line.x2 - line.x1) + line.y1 + this.x1 * (this.y2 - this.y1) / (this.x2 - this.x1) - this.y1) / ((this.y2 - this.y1) / (this.x2 - this.x1) - (line.y2 - line.y1) / (line.x2 - line.x1))
    *
    * (y - this.y1) / (this.y2 - this.y1) = (x - this.x1) / (this.x2 -  this.x1)
    * y = (x - this.x1) / (this.x2 -  this.x1) * (this.y2 - this.y1) + this.y1
    * */
    const denominator = (this.y2 - this.y1) * (line.x2 - line.x1) - (this.x1 - this.x2) * (line.y1 - line.y2)
    const crossX = ((this.x1 - this.x1) * (line.x2 - line.x1) * (line.y1 - this.y1) + (this.y2 - this.y1) * (line.x2 - line.x1) * this.x1 - (line.y2 - line.y1) * (this.x2 - this.x1) * line.x1) / denominator
    const crossY = -((this.y2 - this.y1) * (line.y2 - line.y1) * (line.x1 - this.x1) + (this.x2 - this.x1) * (line.y2 - line.y1) * this.y1 - (line.x2 - line.x1) * (this.y2 - this.y1) * line.y1) / denominator
    // console.log('crossX = ', crossX, 'x1 = ', this.x1, 'x2 = ', this.x2)
    return !isNaN(crossX) && !isNaN(crossY) && (crossX - line.x1) * (crossX - line.x2) <= 0 && (crossY - line.y1) * (crossY - line.y2) <= 0
  }
}

export default function ({ x = null, y = null } = {}, polygon = []) {
  const maxRight = Math.max(...polygon.map(item => item.x))
  const polygonLines = []
  const line = new Line(x, y, maxRight + 1, y)
  let result = 0
  for (let i = 0; i < polygon.length; i++) {
    const nextPolygonPoint = i === polygon.length - 1 ? polygon[0] : polygon[i + 1]
    polygonLines.push(new Line(polygon[i].x, polygon[i].y, nextPolygonPoint.x, nextPolygonPoint.y))
  }
  // console.log(polygonLines)
  polygonLines.forEach((polygonLine) => {
    if (polygonLine.getIsCross(line)) {
      result++
    }
  })
  // console.log(result)
  return !!(result % 2)
}
