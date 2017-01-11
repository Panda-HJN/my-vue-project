import bar from './bar'
import Vue from 'vue'

var app1 = new Vue({
  el: '#app1',
  data: {
    message1: '今天红茶有点喝多了',
    message2: '半夜睡不着就写代码吧'
  }
})
var app2 = new Vue({
  el: '#app2',
  data: {
    message1: '为什么从咖啡换成红茶了呢',
    message2: '因为咖啡喝不起了',
    message3: '就连便宜的G7也买不起了'
  }
})
