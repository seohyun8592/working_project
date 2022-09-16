'use strict';

const ON = 'on';
const ACTIVE = 'active';

const body = document.querySelector('body');
const header = document.querySelector('header');
const lyWrap = document.querySelector('.ly-wrap');
const logo = document.querySelector('header .logo');
const nav = document.querySelector('nav');
const subGnb = document.querySelectorAll('.gnb__depth');
const contWrap = document.querySelector('.cont-area .cont__wrap');
const headerBtn = document.querySelector('.header__btn');

const conWrapCheck = contWrap.parentElement.previousElementSibling;

const headerH = header.offsetHeight;
const navH = nav.offsetHeight;

let checkClass;

// 모바일 슬라이드 메뉴
function slideMenuHandler() {
  checkClass = headerBtn.classList.contains(ON);
  if (checkClass) {
    headerBtn.classList.remove(ON);
    nav.style.right = `-100%`;
    logo.style.zIndex = 1;
    lyWrap.classList.remove('stop-scroll');
  } else {
    headerBtn.classList.add(ON);
    nav.style.right = 0;
    logo.style.zIndex = 999;
    lyWrap.classList.add('stop-scroll');
  }
}

// 탭
function moveTabHandler() {
  const tabBtn = document.querySelectorAll('.tab__btn .btn');
  const tabCon = document.querySelectorAll('.tab__cont .cont');

  tabBtn.forEach((el, idx) => {
    el.addEventListener('click', () => {
      tabBtn.forEach((e, i) => {
        e.classList.remove(ON);
        tabCon[i].classList.remove(ON);
      });
      el.classList.add(ON);
      tabCon[idx].classList.add(ON);
    });
  });
}
// 메뉴 드롭다운
function navDropDown() {
  checkClass = nav.classList.contains('mobile');
  if (checkClass) {
    return;
  }
  let cofH = 0;
  subGnb.forEach((el, i) => {
    const subGnbH = el.offsetHeight;

    if (cofH < subGnbH) {
      cofH = subGnbH;
    }

    if (header.offsetHeight === headerH) {
      header.style.height = `${cofH + headerH}px`;
      nav.style.height = `${cofH + headerH}px`;
      header.classList.add(ACTIVE);
      nav.classList.add(ON);
    } else {
      header.style.height = `${headerH}px`;
      nav.style.height = `${navH}px`;
      header.classList.remove(ACTIVE);
      nav.classList.remove(ON);
    }
  });
}

const deviceSizeHandler = {
  type01: () => {
    nav.classList.add('mobile');
    nav.style.height = `100vh`;
    if (conWrapCheck === null) {
      return;
    } else {
      contWrap.classList.remove('cont__wrap--flex');
    }
  },
  type02: () => {
    nav.classList.remove('mobile');
    nav.style.height = `auto`;
    if (conWrapCheck === null) {
      return;
    } else {
      contWrap.classList.add('cont__wrap--flex');
    }
  },
};

// 화면 리사이징
function slideMenuResize() {
  const winW = window.innerWidth;

  if (winW <= 1024) {
    deviceSizeHandler.type01();
  } else {
    deviceSizeHandler.type02();
  }
}

// 디바이스 해상도 체크
function ratioMatch() {
  const ratio = window.matchMedia('(max-width: 1024px)');

  if (ratio.matches) {
    deviceSizeHandler.type01();
  } else {
    deviceSizeHandler.type02();
  }
}

window.addEventListener('resize', slideMenuResize);
nav.addEventListener('mouseenter', navDropDown);
nav.addEventListener('mouseleave', navDropDown);

if (headerBtn) {
  headerBtn.addEventListener('click', slideMenuHandler);
}

function init() {
  ratioMatch();
  moveTabHandler();
}

window.addEventListener('DOMContentLoaded', init);
