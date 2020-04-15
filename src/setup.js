import Vue from 'vue'
import Dialog from '@/components/Dialog/install'
import Radio from '@/components/Radio/install'
import TextDisplay from '@/components/TextDisplay/install'
import Menu from '@/components/Menu/install'
import ImageDisplay from '@/components/ImageDisplay/install'
import MessageBox from '@/components/MessageBox/install'

[
  Dialog,
  Radio,
  TextDisplay,
  Menu,
  ImageDisplay,
  MessageBox
].map(item => {
  Vue.use(item)
})
