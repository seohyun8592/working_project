// 'use strict';
(function (window) {
  const hbgBtn = document.querySelector('.header__btn');
  const hidden = document.querySelector('#input-hidden');
  const agreeHidden = document.querySelector('#input-hiddenA');
  const checkboxData = document.querySelectorAll(
    '.form-area__check input[type="checkbox"]'
  );
  const checkAgr = document.querySelector('#check-agree');

  const liWrap = document.querySelector('#art .list-item');
  const indicator = document.querySelector('.indicator');

  const getItem = JSON.parse(localStorage.getItem('item'));

  const setNum = 12;
  const arr = new Array();
  let show = false;

  let aEl = '';
  let liItem = '';
  let iAttr = '';

  const ON_CLASS = 'on';

  function hbgBtnActive() {
    const nav = document.querySelector('nav');
    if (!show) {
      this.parentElement.classList.add(ON_CLASS);
      nav.classList.add(ON_CLASS);
      // body.style.overflow = 'hidden';
      show = true;
    } else {
      this.parentElement.classList.remove(ON_CLASS);
      nav.classList.remove(ON_CLASS);
      show = false;
      // body.style.overflow = 'auto';
    }
  }

  function loadItems() {
    return fetch('../data/data.json')
      .then((response) => response.json())
      .then((json) => json.items);
  }
  loadItems() //
    .then((items) => localStorage.setItem('item', JSON.stringify(items)));

  function setListItem() {
    if (!liWrap) {
      return;
    }
    let liHTML = '';

    getItem.forEach((e, i) => {
      liHTML += `
        <li>
          <a href="${e.link}?${i}" target="_blank">
            <img src="${e.image}" alt="${e.title}" />
            <div class="caption">
              <h2 class="title">${e.title}</h2>
              <div class="type-caption">
                <span class="type-title">${e.type}<br />${e.title}</span>
              </div>
            </div>
          </a>
        </li>
    `;
    });

    liWrap.innerHTML = liHTML;

    liItem = liWrap.querySelectorAll('li');

    liItem.forEach(function (i, idx) {
      i.setAttribute('data-idx', Math.ceil((idx + 1) / setNum));
      iAttr = i.getAttribute('data-idx');
      if (iAttr === '1') {
        i.classList.add(ON_CLASS);
      }
    });
  }

  function setIndicator() {
    if (!indicator) {
      return;
    }
    const itemLen = getItem.length;
    const total = Math.ceil(itemLen / setNum);
    let btnHTML = '';

    for (let i = 0; total > i; i++) {
      btnHTML += `
        <a href="#none">${i + 1}</a>
      `;
    }

    indicator.innerHTML = btnHTML;
  }

  function displayItem() {
    if (!aEl && !liItem) {
      return;
    }
    aEl = indicator.querySelectorAll('a');
    liItem = liWrap.querySelectorAll('li');

    aEl.forEach((a) => {
      const aText = a.textContent;
      aEl[0].classList.add('active');

      a.addEventListener('click', (e) => {
        e.preventDefault();

        aEl.forEach((a) => {
          a.classList.remove('active');
        });

        liItem.forEach((li) => {
          iAttr = li.getAttribute('data-idx');
          li.classList.remove(ON_CLASS);
          if (aText === iAttr) {
            li.classList.add(ON_CLASS);
            a.classList.add('active');
          }
        });

        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });
  }

  function resultChecked() {
    [].forEach.call(checkboxData, function (x) {
      x.addEventListener('change', changedCheckBox(), false);
    });

    if (!checkAgr) {
      return;
    }
    checkAgr.addEventListener('change', agreeCheck(), false);
  }

  function changedCheckBox() {
    return function () {
      if (this.checked) {
        arr.push(this.value);
      } else {
        arr.pop(this.value);
      }
      hidden.value = arr.join(' , ');
    };
  }

  function agreeCheck() {
    return function () {
      if (this.checked) {
        console.log('@');
        agreeHidden.value = this.value;
      } else {
        arr.pop(this.value);
      }
    };
  }

  function formSubmitData() {
    const formSubmit = document.querySelector('.form-submit');
    const project = document.querySelector('#project');
    const endDate = document.querySelector('#end-date');
    const reference = document.querySelector('#reference');
    const detail = document.querySelector('#detail');
    const company = document.querySelector('#company');
    const position = document.querySelector('#position');
    const phoneNum = document.querySelector('#phone-num');
    const homepage = document.querySelector('#homepage');
    if (!formSubmit) {
      return;
    }
    formSubmit.addEventListener('click', function () {
      $.ajax({
        type: 'GET',
        url: 'https://script.google.com/macros/s/AKfycbwWNiwooDOx-9v6N7yh0JKj0c57JI_GfYYEXigAjRuHjZQzKm7s2Es3ebwfK-vwFvIq/exec',
        data: {
          개인정보동의: agreeHidden.value,
          프로젝트종류: hidden.value,
          프로젝트: project.value,
          마감일정: endDate.value,
          참고사이트: reference.value,
          상세문의: detail.value,
          회사명: company.value,
          담당자명: position.value,
          담당자연락처: phoneNum.value,
          홈페이지: homepage.value,
        },
        success: function (response) {
          //값 비워주기
          agreeHidden.value = '';
          hidden.value = '';
          project.value = '';
          endDate.value = '';
          reference.value = '';
          detail.value = '';
          company.value = '';
          position.value = '';
          phoneNum.value = '';
          homepage.value = '';
          checkAgr.checked = false;
          [].forEach.call(checkboxData, function (e) {
            e.checked = false;
          });
        },
        error: function (request) {
          console.log('error');
        },
      });
    });
  }

  function dataReceiveHandler() {
    const receivedData = location.href.split('?')[1];
    const inner = document.querySelector('#pj-detail .contents-area__inner');
    if (!inner) {
      return;
    }
    const dataTit = inner.querySelector('h2.title');
    const valueDate = inner.querySelector('.item-value__date');
    const valueClient = inner.querySelector('.item-value__client');
    const valueType = inner.querySelector('.item-value__type');
    const prjImg = inner.querySelector('.project-img');

    dataTit.innerText = getItem[receivedData].title;
    valueDate.innerText = getItem[receivedData].date;
    valueClient.innerText = getItem[receivedData].client;
    valueType.innerText = getItem[receivedData].type;
    prjImg.innerHTML = ` <img src="${getItem[receivedData].image}" alt="" />`;
  }

  window.addEventListener('DOMContentLoaded', function () {
    hbgBtn.addEventListener('click', hbgBtnActive);
    resultChecked();
    formSubmitData();
    setListItem();
    setIndicator();
    displayItem();
    dataReceiveHandler();
  });
})(window);
// 팝업 열기
function popupOpen(pop_id) {
  pop_id.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// 팝업 닫기
function popupClose(pop_id) {
  pop_id.classList.remove('active');
  document.body.style.overflow = 'auto';
}
