import { state } from "./state.js";
import { showTime, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');

export const changeActiveBtn = (dataUse) => {
    state.status = dataUse;
    state.timeLeft = state[state.status] * 60;
    showTime(state.timeLeft);

    for (let i = 0; i < navigationBtns.length; i += 1){
        if(navigationBtns[i].dataset.use === dataUse) {
            navigationBtns[i].classList.add('navigation__btn_active')
        }
        else {
            navigationBtns[i].classList.remove('navigation__btn_active')
        }
    }
};

export const stop = () => {
    clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Start';
            state.timeLeft = state[state.status] * 60;
            showTime(state.timeLeft);
};
export const initControl = () => {
    btnStart.addEventListener('click', () => {
        if (state.isActive){
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Start';
        }
        else{
        state.isActive = true;
        btnStart.textContent = 'Pause';
        startTimer();
        };
        });
    btnStop.addEventListener('click', stop);

    for (let i = 0; i < navigationBtns.length; i++) {
        navigationBtns[i].addEventListener('click', () => {
            changeActiveBtn(navigationBtns[i].dataset.use);
            stop();
        }
        )
    }

    showTime(state.timeLeft);
    };

