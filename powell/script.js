const listsContainer = document.querySelector('[data-lists]')

let lists = ['name','todo']

function render() {
    clearElement(listsContainer)
    
    lists.forEach(list => {
        // create DOM element accordingly
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innerText = list
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

render()