// data attribute selectors
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists' 
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListID = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) || []

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListID = e.target.dataset.listId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListID)
        // complete task id to checkbox id
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        // set to complete
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
})

deleteListButton.addEventListener('click', e => {
    // delete selected list, leave everything else alone
    lists = lists.filter(list => list.id !== selectedListID)
    selectedListID = null
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    // for every time form in submitted
    // prevent sumbitting / refreshing automatically when inputting
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    // if they type in a name, create new list w/ input
    const list = createList(listName)
    // clear out input
    newListInput.value = null
    // add to list
    lists.push(list)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    // for every time form in submitted
    // prevent sumbitting / refreshing automatically when inputting
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    // if they type in a name, create new list w/ input
    const task = createTask(taskName)
    // clear out input
    newTaskInput.value = null
    // get selected list
    const selectedList = lists.find(list => list.id === selectedListID)
    // add new task
    selectedList.tasks.push(task)
    saveAndRender()
})

function createList(name) {
    return {
        // create unique ID very easily based current time
        id: Date.now().toString(),
        name: name,
        tasks: []
    }
}

function createTask(name) {
    return {
        // create unique ID very easily based current time
        id: Date.now().toString(),
        name: name,
        complete: false
    }
}

function render() {
    clearElement(listsContainer)
    renderLists()

    const selectedList = lists.find(list => list.id === selectedListID)

    // render tasks for selected list, else none if deleted
    if (selectedListID == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        // true to render everything inside template not just top level element
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList) {
    // only count incomplete tasks
    const incompleteTaskCount = selectedList.tasks.filter(task =>
        !task.complete).length
    // singular or plural
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    // combine
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
    
}

function renderLists() {
    lists.forEach(list => {
        // create DOM element accordingly
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        // select active list
        if (list.id === selectedListID) {
            listElement.classList.add('active-list')
        }
        // add DOM element to list container
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
// To clear out given element
    // check if element has a first child and remove children
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function saveAndRender() {
    save()
    render()
}

function save() {
    // save & persist input in our local storage
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    // save & persist selected list item in local storage
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListID)
}

render()