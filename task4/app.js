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
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null,
        showName: '' //显示已登录的用户名
    },
    // created vue实例建立成功之后执行的函数
    created: function() {
        // console.log(this.$data.actionType); //可以通过 vm.$data 访问原始数据对象
        //ES6 箭头函数 ()=> 更方便取到 this
        window.onbeforeunload = () => {
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
            let time = new Date()
            this.todoList.push({
                title: this.newTodo, //输入的内容
                todoTime: time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes(), //建立时间
                done: false // 是否完成
            })
            this.newTodo = ''
        },
        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo) //查看排第几
            this.todoList.splice(index, 1) // 在 index的位置删去一个元素
        },
        signUp: function() {
            let user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then(
                (loginedUser) => {
                    this.currentUser = this.getCurrentUser()
                }, (error) => {
                    alert("注册失败")
                }
            )
        },
        login: function() {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert("登录失败")
            })
        },
        getCurrentUser: function() { //这里有点疑问,需要重新看
            let current = AV.User.current()
            if (current) {
                //ES6 解构赋值
                let {
                    id,
                    createdAt,
                    attributes: {
                        username
                    }
                } = current
                //ES6 对象初始化
                return {
                    id,
                    username,
                    createdAt
                }
            } else {
                return null
            }
        },
        logout: function() {
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()
        },
        saveUserData: function() {
            let logedUser = AV.User.current()
            if (logedUser.get("todoList")) {
                let oldTodoString = logedUser.get("todoList").todoString
                let oldTodo = JSON.parse(oldTodoString)
                return this.todoList = oldTodo || []
            } else {
                return this.todoList = []
            }
        }
    }
})