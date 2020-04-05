export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    setActive () {
      this.visible = true
      if (this.dialogs) {
        for (const dialog of this.dialogs) {
          dialog.setActive(true)
        }
      }
    }
  }
}
