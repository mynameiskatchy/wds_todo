// data attribute selectors
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists' 
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

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

function createList(name) {
    return {
        // create unique ID very easily based current time
        id: Date.now().toString(),
        name: name,
        tasks: []
    }
}

function render() {
    clearElement(listsContainer)
    
    lists.forEach(list => {
        // create DOM element accordingly
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
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
    // save information in our local storage
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

render()