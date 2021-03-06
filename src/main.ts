import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import i18n from './lang'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/database'
import './registerServiceWorker'

Vue.config.productionTip = false

const updateSizes = (obj: any = {}) => {
  obj.width = window.innerWidth
  obj.height = window.innerHeight
  return obj
}

Object.defineProperty(Vue.prototype, '$viewport', {
  value: Vue.observable(updateSizes())
})

window.addEventListener('resize', () => {
  updateSizes(Vue.prototype.$viewport)
})

declare interface Viewport {
  width: number,
  height: number,
}

declare module 'vue/types/vue' {
  interface Vue {
    $viewport: Viewport,
  }
}

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseapp.com",
  databaseURL: "https://" + process.env.VUE_APP_FIREBASE_PROJECT_ID + "-default-rtdb.firebaseio.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
