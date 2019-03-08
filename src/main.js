import Vue from 'vue'
import VueRouter from 'vue-router'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import App from './App'
import Content from '@/components/layouts/content'

// layouts
Vue.component('content-box', Content)


import router from './router'
import config from './aws-exports'
Amplify.configure(config)

Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')