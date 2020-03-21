import Vue from 'vue'
import Dialog from '@/components/Dialog/install'
import Radio from '@/components/Radio/install'
import TextDisplay from '@/components/TextDisplay/install'

[
  Dialog,
  Radio,
  TextDisplay
].map(item => {
  Vue.use(item)
})
