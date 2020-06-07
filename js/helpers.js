function createTodoBody(title) {
    return {
        title,
        isEditing: false,
        isExpanded: false,
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
