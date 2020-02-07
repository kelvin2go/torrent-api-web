import Vue from 'vue'
import WebTorrent from 'webtorrent-hybrid'
import VueMagnet from 'vue-magnet'

Vue.WebTorrent = new WebTorrent()

Vue.use(VueMagnet)