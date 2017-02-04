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
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        currentUser:''
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
            user.signUp().then(function(loginedUser) {
                console.log(loginedUser);
            }, function(error) {});
        },
        logOut:function () {
          console.log(2);
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

    }
})
