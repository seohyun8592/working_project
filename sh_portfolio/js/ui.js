'use strict';
// string
const ON = 'on';
const SCROLL = 'scroll';
const CLICK = 'click';

// element
const header = document.querySelector('header');
const conMain = document.querySelector('.ly-contents__main');
const dim = document.querySelectorAll('.dim');

// 헤더 고정
function headerFixed() {
  const checkPoint = conMain.getBoundingClientRect().top;
  const headerH = header.offsetHeight;

  if (checkPoint < headerH) {
    header.classList.add(ON);
  } else {
    header.classList.remove(ON);
  }
}

// 탭
function tabEvtHandler() {
  const tabBtn = document.querySelectorAll('.tab__btn');
  const tabCon = document.querySelectorAll('.tab__contents');
  tabBtn.forEach((el, i) => {
    el.addEventListener(CLICK, () => {
      for (let z = 0; z < tabBtn.length; z++) {
        tabBtn[z].parentElement.classList.remove(ON);
        tabCon[z].classList.remove(ON);
      }
      el.parentElement.classList.add(ON);
      tabCon[i].classList.add(ON);
    });
  });
}

function formSubmitData() {
  const formSubmit = document.querySelector('.form-submit');
  const txtArea = document.querySelector('#txtArea');

  if (!formSubmit) {
    return;
  }
  formSubmit.addEventListener(CLICK, () => {
    $.ajax({
      type: 'GET',
      url: 'https://script.google.com/macros/s/AKfycbw0E9u5MWN5eCPElu18pbJTAUDThNPzPG52qsfMQJtBgBeyzlkvMQriOILAr1v6G4m1/exec',
      data: {
        메세지: txtArea.value,
      },
      success: function (response) {
        //값 비워주기
        txtArea.value = '';
        formOpenPopup();
      },
      error: function (request) {
        console.log('error');
      },
    });
  });
}

function formOpenPopup() {
  dim.forEach((el) => {
    if (el.id === 'pop01') {
      el.classList.add(ON);
    }
  });
}
function openPopUp(id) {
  id.classList.add(ON);
}

function closePopUp(id) {
  id.classList.remove(ON);
}

const bindEvt = {
  scroll: function (el, func) {
    el.addEventListener(SCROLL, () => {
      func();
    });
  },

  click: function (el, func) {
    el.addEventListener(CLICK, () => {
      func();
    });
  },
};

// 이벤트 연결
function bindEvtHandler(el) {
  bindEvt.scroll(window, headerFixed);
}

// init
function init() {
  tabEvtHandler();
  formSubmitData();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
