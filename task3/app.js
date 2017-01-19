import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  //vue实例创建后会执行 created的函数
  created: function(){
    window.onbeforeunload = ()=>{
      let dataStr = JSON.stringify(this.todoList)
        window.localStorage.setItem('myTodos', dataStr)
        }

    let oldDataStr = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataStr)
    this.todoList = oldData || []

  },
  methods: {
    addTodo: function(){
      let time = new Date()
      this.todoList.push({
        title: this.newTodo,
        todoTime: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '     ' + time.getHours() + ':' + time.getMinutes(),
        done: false
      })
      this.newTodo = ''
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo)//看看这项排第几
      this.todoList.splice(index,1)//在位置index 删掉一个元素
    }
  }
})
