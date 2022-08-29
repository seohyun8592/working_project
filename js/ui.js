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
  const tabArea = document.querySelectorAll('.tab-area');

  tabArea.forEach((el, i) => {
    const tabBtnWap = el.querySelector('.tab-area__btn');
    const tabConWrap = el.querySelector('.tab-area__contents');
    const tabBtn = tabBtnWap.querySelectorAll('.tab__btn');
    tabBtn.forEach((btn, idx) => {
      btn.addEventListener(CLICK, () => {
        console.log(el);
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

const getItem = JSON.parse(localStorage.getItem('item'));
function loadItem() {
  return fetch('../data/item.json') //
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(getItem) {
  const sorContainer = document.querySelector('.sort-area__contents');
  sorContainer.innerHTML = getItem
    .map((item) => createHtmlString(item))
    .join('');
}

function createHtmlString(item) {
  return `
        <div class="sort__contents" data-value= "${item.type}">
            <div class="img-area">
              <img src="${item.img}" alt="${item.title}" />
            </div>
            <h4 class="title">${item.title}</h4>
            <a
              href="${item.src}"
              target="_blank"
            ></a>
        </div>
    `;
}

function onButtonClick(event, getItem) {
  const dataset = event.target.dataset;
  const key = dataset.type;
  const value = dataset.value;

  if (!key === null || !value === null) {
    return;
  }

  const filtered = getItem.filter((item) => item[key] === value);
  displayItems(filtered);
  // updateItem(items, key, value);
}

// function updateItem(items, key, value) {
//   items.filter((item) => {
//     if (item[key] === value) {
//       item.classList.add('visivle');
//     } else {
//       item.classList.remove('visivle');
//     }
//   });
// }

function setEventListener(getItem) {
  const sortBtn = document.querySelectorAll('.sort__btn');

  sortBtn.forEach((el) => {
    const allBtn = el.classList.contains('sort__btn--all');

    el.addEventListener(CLICK, (event) => {
      sortBtn.forEach((e) => {
        e.classList.remove(ON);
      });
      el.classList.add(ON);

      if (allBtn) {
        displayItems(items);
      } else {
        onButtonClick(event, items);
      }
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
  // loadItem() //
  //   .then((items) => {
  //     displayItems(items);
  //     setEventListener(items);
  //   });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
