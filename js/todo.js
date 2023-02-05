import { changeActiveBtn } from "./control.js";
import { stop } from "./control.js";
import { state } from "./state.js";


const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Add new task';
li.append(todoAddBtn);

const getTodo = () => {
    const todoList = JSON.parse(localStorage.getItem('TimeLoop') || '[]');

    
    return todoList;
};

const addTodo = (title) => {
    const todo = {
        title,
        TimeLoop: 0,
        id: Math.random().toString(16).substring(2,8),
    }
    const todoList = getTodo();
todoList.push(todo);

localStorage.setItem('TimeLoop', JSON.stringify(todoList));
return todo;
}

export const updateTodo = (todo) => {
    const todoList = getTodo();
    if (!todoList.length) {
        return;
    }
    const todoItem = todoList.find((item) => item.id === todo.id);
    todoItem.title = todo.title;
    todoItem.TimeLoop = todo.TimeLoop;
    localStorage.setItem('TimeLoop', JSON.stringify(todoList));
}

const deleteTodo = (todo) => {
    const todoList = getTodo();
    const newtodoList = todoList.filter((item) => item.id !== todo.id);
    if (todo.id === state.activeTodo.id){
        state.activeTodo = newtodoList.newtodoList[todoList.length - 1];
    }
    localStorage.setItem('TimeLoop', JSON.stringify(newtodoList));
}

const createTodoListItem = (todo) => {
    if(todo.id !== 'default') {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__item');

        const todoItemWrapper = document.createElement('div');
        todoItemWrapper.classList.add('todo__item_wrapper'),
        todoItem.append(todoItemWrapper);

        const todoBtn = document.createElement('button');
        todoBtn.classList.add('todo__btn');
        todoBtn.textContent = todo.title;

        const editBtn = document.createElement('button');
        editBtn.classList.add('todo__edit');
        editBtn.ariaLabel = 'Edit task';

        const delBtn = document.createElement('button');
        delBtn.classList.add('todo__del');
        delBtn.ariaLabel = 'Delete task';

        todoItemWrapper.append(todoBtn, editBtn, delBtn);

        todoListElem.prepend(todoItem);

        todoBtn.addEventListener('click', () => {
            state.activeTodo = todo;
            showTodo();
            changeActiveBtn('work');
            stop();
        } );
        editBtn.addEventListener('click', () => {
            todo.title = prompt('Task name', todo.title);
            todoBtn.textContent = todo.title;
            updateTodo(todo);
            showTodo();
        } );
        delBtn.addEventListener('click', () => {
            deleteTodo(todo);
            showTodo();
            todoItem.remove()
        } );
    }
}

const renderTodoList = (list) => {
    todoListElem.textContent = '';
    list.forEach(createTodoListItem)
    todoListElem.append(li);
}

export const showTodo = () => {
    if (state.activeTodo) {
    titleElem.textContent = state.activeTodo.title;
    countElem.textContent = state.activeTodo.TimeLoop;
    }
    else {
        titleElem.textContent = '';
        countElem.textContent = 0;
    };
};

export const initTodo = () => {
    const todoList = getTodo();

    if (!todoList.length) {
        state.activeTodo = {
            id: 'default',
            TimeLoop: 0,
            title: 'TimeLoop',
        }
    } else {
    state.activeTodo = todoList[todoList.length -1]};
    showTodo();
    renderTodoList(todoList);

    todoAddBtn.addEventListener('click', () => {
        const title = prompt('Add new task');
        const todo = addTodo(title);
        createTodoListItem(todo);
    }
    )
};



