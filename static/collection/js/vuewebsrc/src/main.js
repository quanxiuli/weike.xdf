import Vue from 'vue'
/*import '../../../css/publicCss.css';
import '../../../css/GlobalSetting.css';*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
})
