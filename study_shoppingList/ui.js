'use strict';

const tabArea = document.querySelector('.tab__area');
const tabConWrap = tabArea.querySelector('.tab__contents');
const tabCont = tabConWrap.querySelectorAll('.tab__contents .content');
const tabInnerWrap = document.querySelectorAll('.tab__contents .content .wrap');

function tabEvtHandler() {
  const tabBtn = tabArea.querySelectorAll('.tab__btn .btn');

  tabBtn.forEach((el, i) => {
    tabCont[i].style.left = 100 * i + '%';

    el.addEventListener('click', () => {
      tabBtn.forEach((btn, idx) => {
        btn.classList.remove('on');
        // tabCont[idx].classList.remove("on");
      });
      el.classList.add('on');
      // tabCont[i].classList.add("on");
      tabConWrap.style.transform = `translateX(${-100 * i}%)`;
    });
  });
}

function addListItem(textInput, listItem) {
  const textInputVal = textInput.value;
  createNewHtml(textInputVal, listItem);

  textInput.value = '';
}

function createNewHtml(textInputVal, listItem) {
  const li = document.createElement('li');
  const liInner = `
      <span>${textInputVal}</span>
      <button type="button" class="btn__del"></button>
    `;

  li.innerHTML = liInner;
  listItem.append(li);

  listDelEvtHandler();
}

function listDelEvtHandler() {
  const delBtn = document.querySelectorAll('.btn__del');
  delBtn.forEach((el) => {
    el.addEventListener('click', () => {
      el.closest('li').remove();
    });
  });
}

function eventHandler() {
  tabInnerWrap.forEach((el) => {
    const listItem = el.querySelector('.list__item');
    const textInput = el.querySelector('.text__input');
    const addBtn = el.querySelector('.btn__add');

    addBtn.addEventListener('click', () => {
      if (textInput.value === '') {
        return;
      } else {
        addListItem(textInput, listItem);
      }
    });

    addEventListener('keypress', (e) => {
      if (e.target === textInput && e.keyCode === 13) {
        addListItem(textInput, listItem);
      } else {
        return;
      }
    });
  });
}

function init() {
  tabEvtHandler();
  eventHandler();
}

init();
