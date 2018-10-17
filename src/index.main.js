// 开启'vconsole'
// if (process.env.NODE_ENV === 'development') {
//   let VConsole = require('vConsole');
//   new VConsole();
// }

// 测试Vue
import Vue from 'vue'
import App from './app.vue'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
