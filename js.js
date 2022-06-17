let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn



const main = () => {
    // wywoływała funkcje
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    // pobieranie wszystkich elementów
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')
    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')

}

const prepareDOMEvents = () => {
    // nadajemy nasłuchanie
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
    popupInput.addEventListener('keyup', enterKeyEditCheck)
}


// tworzy element li
// nasłuchiwać na klik
// input dodawać li do ul Listy
// pobierac tresc z input
// zabezpiecznie aby nie dodawać pustego todo

const addNewTodo = () => {
    if(todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        console.log(newTodo)
        
        createToolsArea()
        
        ulList.append(newTodo)

        todoInput.value = ''
        errorInfo.textContent = 'Dodaj kolejne zadanie'
    } else {
        errorInfo.textContent = 'Wpisz treść zadania'
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = "EDIT"

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeBtn,editBtn,deleteBtn)
}


const checkClick = e => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if(e.target.matches('.edit')) {
        editToDo(e)
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editToDo = (e) => {
    todoToEdit = e.target.closest('li')

    popupInput.value = todoToEdit.firstChild.textContent
    console.log(todoToEdit.firstChild)
    popup.style.display = "flex"

}
const closePopup = () => {
    popup.style.display = "none"
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść'
    }
}


const deleteTodo = (e) => {
        e.target.closest('li').remove()
        
        const AllTodos = ulList.querySelectorAll('li')
        if(AllTodos.length === 0) {
            errorInfo.textContent = 'Brak zadań na liście'
        }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter')
    addNewTodo()
}

const enterKeyEditCheck = e => {
    if(e.key === 'Enter')
    changeTodoText()
}

document.addEventListener('DOMContentLoaded', main)

