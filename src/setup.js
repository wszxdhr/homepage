import Vue from 'vue'
import Dialog from '@/components/Dialog/install'

[
  Dialog
].map(item => {
  Vue.use(item)
})
