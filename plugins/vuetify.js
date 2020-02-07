// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'md', // default - only for display purposes
  },
}

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
})