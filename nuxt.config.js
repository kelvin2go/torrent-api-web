import colors from 'vuetify/es5/util/colors'

const API_BASE_URL = process.env.API_URL || 'http://localhost:1337'
console.log(API_BASE_URL)
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { type: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vuemagnet.js'
    // '~/plugins/webtorrent.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],
  io: {
    sockets: [
      {
        name: 'movies',
        url: `${API_BASE_URL}/`,
        default: true,
      },

    ]
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    theme: {
      dark: true,
      icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `${API_BASE_URL}/auth/local`, method: 'post', propertyName: 'jwt' },
          logout: { url: `${API_BASE_URL}/auth/logout`, method: 'post' },
          user: { url: `${API_BASE_URL}/user/me`, method: 'get', propertyName: 'user' },
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },
  env: {
    API_URL: API_BASE_URL || 'http://localhost:1337'
  },
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: true,
    transpile: ['vuetify/lib'],
    // https://ithelp.ithome.com.tw/articles/10207669
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev }) {
      config.target = 'web'
      config.node = {
        fs: 'empty'
      }
      if (isDev && process.client) {

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

      }

      // config.plugins.unshift(new LodashModuleReplacementPlugin({
      //   shorthands: true
      // }))
      // // rules[2].use[0] is babel-loader
      // config.module.rules[2].use[0].options.plugins = ['lodash']

    },
    render: {
      http2: {
        push: true
      }
    }
  }
}
