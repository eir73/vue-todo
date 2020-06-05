const Todos = new Vue({
    el: '#todos',
    data: {
        todos: [
            {
                title: 'Fix input closing',
                id: new Date()
            },
            {
                title: 'Enable to edit todos',
                id: new Date()
            }, 
            {
                title: 'fix css',
                id: new Date()
            }
        ],
        todo_text: '',
        adding: false
    },
    methods: {
        create() {
            if(!this.todo_text){
                return
            }
            const todo = {
                title: this.todo_text, 
                id: new Date()
            }
            this.todo_text = ''
            this.todos.push(todo)
            this.adding = false
        },
        del(id) {
            this.todos = this.todos.filter(todo => todo.id != id)
        },
        start(id) {
            this.todos = this.todos.filter(todo => {
                if(todo.id != id) {
                    return true
                } else {
                    Doings.doings.push(todo)
                }
            })
        },
        showAddMenu(){
            this.adding = true
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