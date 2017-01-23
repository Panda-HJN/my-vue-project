import Vue from 'vue'

import AV from 'leancloud-storage'

var APP_ID = 'S4Jth8Wn51NoWMoxVEyjpsg5-gzGzoHsz';
var APP_KEY = 'sQhBBOPOSIq0JEya9YkiaYHF';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
let app = new Vue({

    el: '#app',
    data: {
        newTodo: '', //与输入框绑定
        todoList: [],
        actionType: 'signUp', //表示登录状态,初始是未登录
        formData: {
            username: '', //你叫啥名
            password: ''
        },
        currentUser: null //用户名称
    },
    created: function() { //created是 vue实例建立完成后执行的函数
        //ES6 语法 ()=> 更方便取到this
        window.onbeforeunload = () => { //onbeforeunload 不能放回调函数! 页面都死球了,还怎么回调
            let dataStr = JSON.stringify(this.todoList)
            window.localStorage.setItem("todos", dataStr)
        }
        let oldDataStr = window.localStorage.getItem("todos") //从localStorage取出数据
        let oldData = JSON.parse(oldDataStr)
        this.todoList = oldData || [] //把旧数据存进 vue实例的todoList里
        this.currentUser = this.getCurrentUser() //看看当前已经登录的用户是谁
    },
    methods: {
        addTodo: function() {
          if(this.newTodo.length>0){
            let time = new Date()
            this.todoList.push({
                title: this.newTodo, //输入的内容
                todoTime: time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes(), //建立时间
                done: false // 是否完成
            })
            this.newTodo = ''
            this.saveUserData()
          }else{
            alert("内容不能为空")
          }
        },
        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo) //查看排第几
            this.todoList.splice(index, 1) // 在 index的位置删去一个元素
            this.saveUserData()
        },
        login:function(){
          
        }

    }






})
