import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CorrectProposition from './components/CorrectProposition.vue';
import BackgroundProposition from './components/BackgroundProposition.vue';
Vue.use(VueRouter);

Vue.config.productionTip = true

const routes = [
	{ path: '/'},
	{ path: ''},
	{ path: '/correct-proposition', component: CorrectProposition },
	{ path: '/background-proposition', component: BackgroundProposition },
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
