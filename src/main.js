import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
//样式
import "@/assets/styles/index.styl";
// 注册Element UI
Vue.use(Element, {
  size: "small"
});
Vue.config.productionTip = false
import router from './router'
import store from './data/store'

// SVG 图标
import '@/assets/icons'


//权限控制
import './common/permission/permission'
//模拟数据
import './data/mock/index'  
//全局过滤器
import filters from './common/filters'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})
// 全局directive指令
import directives from './common/directives'
// 注册本页全局指令方法
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
