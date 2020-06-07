const Todos = new Vue({
    el: '#todos',
    data: {
        todos: [
            {
                title: 'Fix everything closing if I\'ll click somewhere or press Esc button',
                isEditing: false,
                isExpanded: false,
                id: new Date()
            },
            {
                title: 'Create project structure',
                isEditing: false,
                isExpanded: false,
                id: new Date()
            }, 
            {
                title: 'Styles',
                isEditing: false,
                isExpanded: false,
                id: new Date()
            }
        ],
        todo_text: '',
        adding: false
    },
    methods: {
        createTodo() {
            if(!this.todo_text){
                return
            }
            const todo = {
                title: this.todo_text, 
                isEditing: false,
                isExpanded: false,
                id: new Date()
            }
            this.todo_text = ''
            this.todos.push(todo)
            this.adding = false
        },
        reset(e) {
            if(!this.$el.contains(e.target))
                setTimeout(() => {
                    this.todos.forEach(todo => {
                    todo.isEditing = false
                    todo.isExpanded = false
                    })
                    this.adding = false
                },0)
        },
        showExpandMenu(id) {
            this.adding = false
            this.todos.forEach(todo => {
                todo.isExpanded = (todo.id != id ? false : !todo.isExpanded)
            })
            //todo.isExpanded = !todo.isExpanded
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(todo => todo.id != id)
        },
        startEditing(todo) {
            todo.isEditing = true
            this.todo_text = todo.title
            this.focusElement(this.$refs.inpEdit[this.todos.indexOf(todo)])
        },
        editTodo(todo) {
            todo.title = this.todo_text
            this.todo_text = ''
            todo.isEditing = false
            todo.isExpanded = false
        },
        startDoing(id) {
            this.todos = this.todos.filter(todo => {
                if(todo.id != id) {
                    return true
                } else {
                    Doings.doings.push(todo)
                }
            })
        },
        showAddMenu(){
            this.adding = !this.adding
            this.todos.forEach(todo => {
                todo.isExpanded = false
            })
            this.focusElement(this.$refs.inp)
        },
        focusElement(el) {
            setTimeout(() => {
                el.focus()
            },0)
        }
    }
})

const Doings = new Vue({
    el: '#doings',
    data: {
        doings: []
    },
    methods: {
        del(id) {
            this.doings = this.doings.filter(doing => doing.id != id)
        },
        finish(id) {
            this.doings = this.doings.filter(doing => {
                if(doing.id != id) {
                    return true
                } else {
                    Dones.dones.push(doing)
                }
            })
        },
        backToTodos(id) {
            this.doings = this.doings.filter(doing => {
                if(doing.id != id) {
                    return true
                } else {
                    Todos.todos.push(doing)
                }
            })
        }
    }
})

const Dones = new Vue({
    el: '#dones',
    data: {
        dones: []
    },
    methods: {
        del(id) {
            this.dones = this.dones.filter(done => done.id != id)
        },
        backToDoings(id) {
            this.dones = this.dones.filter(done => {
                if(done.id != id) {
                    return true
                } else {
                    Doings.doings.push(done)
                }
            })
        }
    }
})

document.querySelector('body').onclick = Todos.reset