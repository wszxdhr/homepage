/*
* 射线法判断点是否在多边形内
* 向右发射射线（到多边形x最大的坐标+1的位置为止）
* 交叉点为奇数则在多边形内
* 特殊情况：
* 1. 刚好在两线交叉点交叉
* 2. 刚好和某一条线段重叠
* */

// function isBetween (x1, x2, xTest) {
//   return (xTest >= x1 && xTest <= x2) || (xTest >= x2 && xTest <= x1)
// }

function crossMul (v1, v2) {
  return v1.x * v2.y - v1.y * v2.x
}

class Line {
  constructor (x1, y1, x2, y2) {
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }

  getIsCross (line) {
    const p1 = {
      x: line.x1,
      y: line.y1
    }
    const p2 = {
      x: line.x2,
      y: line.y2
    }
    const p3 = {
      x: this.x1,
      y: this.y1
    }
    const p4 = {
      x: this.x2,
      y: this.y2
    }
    let v1 = {
      x: p1.x - p3.x,
      y: p1.y - p3.y
    }
    let v2 = {
      x: p2.x - p3.x,
      y: p2.y - p3.y
    }
    let v3 = {
      x: p4.x - p3.x,
      y: p4.y - p3.y
    }
    const v = crossMul(v1, v3) * crossMul(v2, v3)
    v1 = {
      x: p3.x - p1.x,
      y: p3.y - p1.y
    }
    v2 = {
      x: p4.x - p1.x,
      y: p4.y - p1.y
    }
    v3 = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    }
    return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0)
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
  console.log('result', result)
  return !!(result % 2)
}
