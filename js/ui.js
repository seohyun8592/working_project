'use strict';
// string
const ON = 'on';
const ACTIVE = 'active';
const SCROLL = 'scroll';
const CLICK = 'click';

// element
const header = document.querySelector('header');
const conMain = document.querySelector('.ly-contents__main');
const conArea = document.querySelector('.contents-area');
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

// 스킬
function skillPerMove() {
  const skillWrap = document.querySelector('.skill-item');
  const skillPer = document.querySelectorAll('.skill__per');
  const skillWrapScrT = skillWrap.getBoundingClientRect().top;
  skillPer.forEach((el) => {
    el.style.width = el.dataset.per + '%';
    let scrT = window.scrollY;
    if (scrT > skillWrapScrT) {
      el.classList.add(ACTIVE);
    }
  });
}

// 탭
function tabEvtHandler() {
  const tabArea = document.querySelectorAll('.tab-area');

  tabArea.forEach((el, i) => {
    const tabBtnWap = el.querySelector('.tab-area__btn');
    const tabConWrap = el.querySelector('.tab-area__contents');
    const tabBtn = tabBtnWap.querySelectorAll('.tab__btn');
    tabBtn.forEach((btn, idx) => {
      btn.addEventListener(CLICK, () => {
        for (let z = 0; z < tabBtn.length; z++) {
          tabBtn[z].parentElement.classList.remove(ON);
          tabConWrap.children[z].classList.remove(ON);
        }
        btn.parentElement.classList.add(ON);
        tabConWrap.children[idx].classList.add(ON);
      });
    });
  });
}

function onButtonClick(event) {
  const items = document.querySelectorAll('.sort__contents .contents');
  const key = event.target.dataset.type;
  const arr = [];

  if (!key === null) {
    return;
  }

  items.forEach((z) => {
    const allBtn = document.querySelector('.sort__btn--all');
    allBtn.addEventListener(CLICK, (event) => {
      z.classList.add(ON);
    });
    z.classList.remove(ON);

    arr.push(z);
    const filtered = arr.filter((item) => item.dataset.type === key);

    filtered.forEach((con) => {
      console.log(z);
      con.classList.add(ON);
    });
  });
}

function setEventListener() {
  const sortBtn = document.querySelectorAll('.sort__btn');
  sortBtn.forEach((el) => {
    el.addEventListener(CLICK, (event) => {
      sortBtn.forEach((e) => {
        e.classList.remove(ON);
      });
      el.classList.add(ON);

      onButtonClick(event);
    });
  });
}
setEventListener();

function formSubmitData() {
  const formSubmit = document.querySelector('.btn__submit');
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

// visual
const img = document.querySelector('.ly-contents__visual .img-area img');
let attr = img.getAttribute('src');
let seq_play = true;
let _img_load = 0;
let _img_count = 192;
let idx = 0;

function seq_init() {
  for (idx = 0; idx <= _img_count; idx++) {
    let _img_tmp = new Image();
    _img_tmp.src = `images/sequence/sky${idx}.jpg`;
    _img_tmp.onload = function () {
      ++_img_load;
      if (_img_load == _img_count) {
        rolling();
      }
    };
    // _img_tmp.onerror = function () {
    //   ++_img_load;
    //   if (_img_load == _img_count) {
    //     rolling();
    //   }
    // };
  }
  idx = 0;
  rolling();
}
function rolling() {
  const set = setTimeout(function () {
    if (seq_play) {
      idx++;
      img.setAttribute('src', `images/sequence/sky${idx}.jpg`);
    }
    if (idx == _img_count) {
      seq_play = false;
      idx = 0;
    }
    if (!seq_play) {
      if (idx == 0) seq_play = true;
    }
    rolling();
  }, 100);

  rollingClear(set);
}

function rollingClear(set) {
  let scrT = window.scrollY;
  if (scrT > 0) {
    clearTimeout(set);
  }
}

seq_init();

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
function bindEvtHandler() {
  bindEvt.scroll(window, headerFixed);
  bindEvt.scroll(window, skillPerMove);
  bindEvt.scroll(window, rollingClear);
}

// init
function init() {
  bindEvtHandler();
  tabEvtHandler();
  formSubmitData();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
