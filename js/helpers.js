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
function sortElementsByDate(array) {
    array =  array.sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline)
    })
    return array
}