import Index from './index'
import MenuItem from './menuItem'

export default {
  install (Vue) {
    Vue.component('hp-menu', Index)
    Vue.component('hp-menu-item', MenuItem)
  }
}
