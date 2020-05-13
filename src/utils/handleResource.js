import getLocationSearch from './getLocationSearch'

const locationSearch = getLocationSearch()

export default function (url) {
  if (locationSearch.emptyResource) {
    return ''
  }
  return url
}
