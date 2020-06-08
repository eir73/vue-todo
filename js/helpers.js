function createTodoBody(title, deadline) {
    return {
        title,
        isEditing: false,
        isExpanded: false,
        deadline,
        id: new Date()
    }
}
function deleteElementById(array, id) {
    return array.filter(el => el.id != id)
}
function focusElement(el) {
    setTimeout(() => {
        el.focus()
    },0)
}
function filterElementsByDate(array) {
    array =  array.sort((a, b) => {
        console.log('i am sortoig')
        return new Date(a.deadline) - new Date(b.deadline)
    })
    return array
}