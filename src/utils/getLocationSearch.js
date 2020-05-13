export default function () {
  const urlParams = {}
  let match = null
  const pl = /\+/g
  const search = /([^&=]+)=?([^&]*)/g
  const decode = function (s) {
    return decodeURIComponent(s.replace(pl, ' '))
  }
  const query = window.location.search.substring(1)
  match = search.exec(query)
  while (match) {
    urlParams[decode(match[1])] = decode(match[2])
    match = search.exec(query)
  }
  return urlParams
}
