import { state } from "./state.js";
import { alarm } from "./alarm.js";
import {addZero} from "./util.js";
import { changeActiveBtn } from "./control.js";
import { showTodo, updateTodo } from "./todo.js";

const minutesElement = document.querySelector('.time__minutes');
const secondsElement = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
    minutesElement.textContent = addZero(Math.floor(seconds / 60));
    secondsElement.textContent = addZero(seconds % 60);
};

const title = document.title;

export const startTimer = () => {
    const countdown = new Date().getTime() + state.timeLeft * 1000;

    state.timerId = setInterval(() => {
        state.timeLeft -= 1;

        showTime(state.timeLeft);

        document.title = state.timeLeft;

        if (!(state.timeLeft % 3)) {
            const now = new Date().getTime();
            state.timeLeft = Math.floor((countdown - now) / 1000);
            console.log('synchronize');
        }

        if(state.timeLeft > 0 && state.isActive) {
            return;
        }

        document.title = title;
        clearTimeout(state.timerId);
            if(state.status === 'work') {
                state.activeTodo.TimeLoop += 1;
                updateTodo(state.activeTodo);
                showTodo();
    
                if(state.activeTodo.TimeLoop % state.count) {
                    state.status = 'break'
                }
                else {
                    state.status = 'relax'
                }
    
                state.status = 'break'
            } else {
                state.status ='work'
            }
            alarm();
            state.timeLeft = state[state.status] * 60;
            changeActiveBtn(state.status);
            startTimer();



    }, 1000)

    



};