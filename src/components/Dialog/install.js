import Index from './index'
import SubDialog from './subDialog'
import Block from './block'

export default {
  install (Vue) {
    Vue.component('hp-dialog', Index)
    Vue.component('hp-sub-dialog', SubDialog)
    Vue.component('hp-block', Block)
  }
}
