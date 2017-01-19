import Vue from 'vue'

let app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function() {
        console.log("created");
        window.onbeforeunload = (function() {
            let dataStr = JSON.stringify(this.todoList)
            window.localStorage.setItem("todos", dataStr)
        })()
        let oldDataStr = window.localStorage.getItem("todos") //从localStorage取出数据
        console.log(oldDataStr);
        // let oldData = JSON.parse(oldDataStr)
        // this.todoList = oldData || [] //把旧数据存进 vue实例的todoList里
    },
    methods: {
        addTodo: function() {
            let time = new Date()
            this.todoList.push({
                title: this.newTodo, //输入的内容
                todoTime: time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日 '+time.getHours()+':'+time.getMinutes(), //建立时间
                done: false // 是否完成
            })
            this.newTodo = ''
        },
        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo) //查看排第几
            this.todoList.splice(index, 1) // 在 index的位置删去一个元素
        }
    }
})
