const App = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                heading: 'Plans',
                noElems: 'You have no plans...',
                position: 'first',
                adding: false,
                notes: [
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
                ]
            },
            {
                heading: 'In progess',
                noElems: 'Nothing is in progress',
                position: 'center',
                adding: false,
                notes: []
            },
            {
                heading: 'Finished',
                noElems: 'Nothing is done for now',
                position: 'last',
                adding: false,
                notes: []
            } 
        ],
        todo_text: '',
        adding: false
    },
    methods: {
        createNote(column) {
            if(!this.todo_text){
                return
            }
            const todo = createTodoBody(this.todo_text)
            this.todo_text = ''
            column.notes.push(todo)
            column.adding = false
        },
        showExpandMenu(id) {
            this.columns.forEach(col => { 
                col.adding = false
                col.notes.forEach(note => {
                    note.isExpanded = (note.id != id ? false : !note.isExpanded)
                    note.isEditing = false
                })
            })
        },
        deleteTodo(column, id) {
            column.notes = deleteElementById(column.notes, id)
        },
        startEditing(notes, todo) {
            todo.isEditing = !todo.isEditing
            this.todo_text = todo.title
            this.$refs.inpEdit.forEach(inp => focusElement(inp))
        },
        editTodo(todo) {
            todo.title = this.todo_text
            this.todo_text = ''
            todo.isEditing = false
            todo.isExpanded = false
        },
        removeToRightCol(column, note) {
            this.deleteTodo(column, note.id)
            this.columns[this.columns.indexOf(column) + 1].notes.push(note)
            this.hideAll()
        },
        showAddMenu(col){
            this.todo_text = ''
            this.columns.forEach(column => column.adding = (column == col ? !col.adding : false))
            this.columns.forEach(col => {
                col.notes.forEach(note => { 
                    note.isExpanded = false
                    note.isEditing = false
                })
            })
            this.$refs.inp.forEach(inp => focusElement(inp))
        },
        removeToLeftCol(column, note) {
            this.deleteTodo(column, note.id)
            this.columns[this.columns.indexOf(column) - 1].notes.push(note)
            this.hideAll()
        },
        reset(e) {
            if(e.target == this.$el) {
                this.hideAll()
            }
        },
        hideAll() {
            this.columns.forEach(col => {
                col.adding = false
                col.notes.forEach(note => {
                    note.isExpanded = false
                    note.isEditing = false
                })
            })
        }
    }
})

document.querySelector('body').onclick = App.reset
