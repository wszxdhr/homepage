import Vue from 'vue'
import Dialog from '@/components/Dialog/install'
import Radio from '@/components/Radio/install'
import TextDisplay from '@/components/TextDisplay/install'
import Menu from '@/components/Menu/install'
import ImageDisplay from '@/components/ImageDisplay/install'

[
  Dialog,
  Radio,
  TextDisplay,
  Menu,
  ImageDisplay
].map(item => {
  Vue.use(item)
})
