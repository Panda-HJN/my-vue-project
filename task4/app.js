import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'S4Jth8Wn51NoWMoxVEyjpsg5-gzGzoHsz';
var APP_KEY = 'sQhBBOPOSIq0JEya9YkiaYHF';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();


let app = new Vue({
    el: '#app',
    data: {
        newTodo: '', //和输入框绑定
        todoList: [], //存储todo项目
        formData: { //用户数据
            username: '',
            password: ''
        },
        actionType: 'signUp', //这个值决定 是显示 注册  还是 显示 登录
        currentUser: null //未登录时是空的,登陆后 getCurrentUser() 会给其赋值
    },
    methods: {
        addTodo: function() {
            console.log('addddd');
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
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('注册失败.用户名可能非法,或者已被注册.')
            });
        },
        login: function() {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, function(error) {
                alert('登录失败,用户名和密码可能错误')
            });
        },
        logOut: function() {
            AV.User.logOut()
            this.currentUser = null //退出登录了就得把 currentUser 改一下
            window.location.reload()
        },
        getCurrentUser: function() {
            let current = AV.User.current()
                //ES6 解构赋值
            if (current) {
                let {
                    id,
                    createdAt,
                    attributes: {
                        username
                    }
                } = current
                return {
                    id,
                    username,
                    createdAt
                }
            } else {
                return null
            }
        }
    },
    created: function() {
        window.onbeforeunload = () => {
            let dataStr = JSON.stringify(this.todoList) //取出todoList 并JSON字符串化
            window.localStorage.setItem("myTodos", dataStr) //存进localStorage
        }
        let oldDataString = window.localStorage.getItem('myTodos') //从localStorage中取出
        let oldData = JSON.parse(oldDataString) //JSON化
        this.todoList = oldData || [] //覆盖 todoList
            this.currentUser = this.getCurrentUser()
    }
})
