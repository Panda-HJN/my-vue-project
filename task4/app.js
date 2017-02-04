import Vue from 'vue'

let app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    methods: {
        addTodo: function() {
          console.log('addddd');
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
    },
    created:function () {
      window.onbeforeunload =()=>{
        let dataStr = JSON.stringify(this.todoList) //取出todoList 并JSON字符串化
         window.localStorage.setItem("myTodos", dataStr)//存进localStorage
      }
      let oldDataString = window.localStorage.getItem('myTodos') //从localStorage中取出
      let oldData = JSON.parse(oldDataString) //JSON化
      this.todoList = oldData || [] //覆盖 todoList

    }
})
