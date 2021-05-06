const listsContainer = document.querySelector('[data-lists]')

let lists = [
    'name',
    'todo'
]

function render() {
    clearElement(listsContainer)
    
    lists.forEach(list => {
        // create DOM element accordingly
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innterText = list
    })
}


function clearElement(element) {
// To clear out given element
}