import _throttle from 'lodash/throttle'
export default function ({ app, $axios, redirect, store, error }) {
    $axios.onRequest(config => {
        _throttle(() => store.commit('setApiLoading', true), 2000, { 'trailing': false })
        console.log('Making request to ' + config.url)
    })
}