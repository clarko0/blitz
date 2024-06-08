// Ignore me
const html = (strings, ...values) => {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
};

const TODO_ELEMENT = document.getElementById('todolist')
const MAX_NUMBER_OF_ITEMS = 20;

function CreateItem(event) {
    event.preventDefault();

    const itemIsInvalid = false == event.target.checkValidity();
    const todoListIsFull = TODO_ELEMENT.children.length >= MAX_NUMBER_OF_ITEMS;
    const cannotCreateNewItem = itemIsInvalid || todoListIsFull;

    if(cannotCreateNewItem) {
        // Handle error
        return;
    }

    const itemText = event.target.item.value;
    const item = _ItemTemplate(itemText);
    TODO_ELEMENT.appendChild(item);
}

function SaveItem(event) { 
    const item = event.target.parentElement;

    const inputEle = item.querySelector('input');
    const newText = inputEle.value;
    inputEle.outerHTML = `<p>${newText}</p>`;

    event.target.remove();

    const editBtnEle = document.createElement('button');
    editBtnEle.textContent = 'Edit';
    editBtnEle.onclick = EditItem;
    item.appendChild(editBtnEle);
}

function EditItem(event) {
    const item = event.target.parentElement;

    const itemTextEle = item.querySelector('p');
    itemTextEle.outerHTML = `<input type="text" value="${itemTextEle.textContent}" />`;
    
    const saveBtnEle = document.createElement('button');
    saveBtnEle.textContent = 'Save';
    saveBtnEle.onclick = SaveItem;

    item.appendChild(saveBtnEle);

    event.target.remove();
}

function DeleteItem(event) {
    const item = event.target.parentElement;
    item.remove();
}

function _ItemTemplate(text) {
    const ele =  html`
        <div>
            <p>${text}</p>
            <button onclick="EditItem(event)">Edit</button>
            <button onclick="DeleteItem(event)">Delete</button>
        </div>`;

    const item = document.createElement('div');
    item.innerHTML = ele;

    return item;
}