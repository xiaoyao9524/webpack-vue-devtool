// 开启'vconsole'
// if (process.env.NODE_ENV === 'development') {
//   let VConsole = require('vConsole');
//   new VConsole();
// }

import 'babel-polyfill';
import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
