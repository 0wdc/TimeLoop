console.log('Hello Friends! This is an Easter Egg!');

import { initControl } from "./control.js";
import { state } from "./state.js";
import { initTodo } from "./todo.js";

const initTimeLoop = () => {
    initControl();
    initTodo();    
};

initTimeLoop();