// 遍历查找image和video字段
/*
* @param replaceEmpty 不加载资源，将资源置空（一般为location.search控制）
* */
const traverseFindResource = (item = {}, resources = [], replaceEmpty = false) => {
  if (item instanceof Array) {
    for (const sub of item) {
      traverseFindResource(sub)
    }
  } else if (typeof item === 'object') {
    for (const key in item) {
      if ((key === 'image' || key === 'video') && item[key]) {
        if (!replaceEmpty) {
          resources.push({
            type: key,
            value: item[key]
          })
        }
      } else if (typeof item[key] === 'object') {
        traverseFindResource(item[key], resources, replaceEmpty)
      }
    }
  }
}

export default traverseFindResource
