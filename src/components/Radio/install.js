import Index from './index'
import Group from './group'

export default {
  install (Vue) {
    Vue.component('hp-radio', Index)
    Vue.component('hp-radio-group', Group)
  }
}
