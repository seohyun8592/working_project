(function () {
  const ONSTRING = "on";

  const body = document.querySelector("body");
  const closeBtn = document.querySelector(".btn-close");
  const tabBtn = document.querySelectorAll(".tab-btn");
  const tabContent = document.querySelectorAll(".tab-cont");
  const tabTit = document.querySelector(".tab .title");
  const phoneInput = document.querySelector("#phone");
  const nav = document.querySelector("nav");
  const targetItem = document.querySelectorAll(".item-depth01");
  const main = document.querySelector(".app-contents");
  const type = main.querySelectorAll(".main-type");
  const checkInput = document.querySelectorAll(".ly-form .check-area input");
  const like = document.querySelectorAll(".txt-like.toggle");
  const gnbLi = document.querySelectorAll(".gnb-list > li");
  const dimmer = document.querySelector(".dimmer");
  const footerDrop = document.querySelector(".footer-drop");




  // 햄버거 버튼(전체 페이지 공통)
  function hbgBtnEvHandler() {
    const hbgBtn = document.querySelector(".btn-hbg");

    hbgBtn.addEventListener("click", function () {
      nav.classList.add(ONSTRING);
      nav.style.right = 0;
      body.style.overflow = "hidden";
    });
  }

  // gnb 메뉴 닫기(전체 페이지 공통)
  function gnbMenuClose() {
    if (!closeBtn) {
      return;
    }
    nav.style.right = -(nav.offsetWidth) + "px";
    nav.classList.remove(ONSTRING);
    body.style.overflow = "auto";
  }

  // gnb 메뉴 리스트 
  function gnbMenuListShowHide(item, idx) {
    const gnbLiH = item.offsetHeight;
 
    item.addEventListener("click", function(){
 
      const subGnb = item.querySelector(".sub-gnb-list");
      const subGnbH = subGnb.offsetHeight;
  
      if(subGnb) {
        if(item.offsetHeight === gnbLiH) {
          item.style.height = gnbLiH + subGnbH + "px";
          item.classList.add(ONSTRING);
          dimmer.classList.add("active");
        }else {
          item.style.height = gnbLiH + "px";
          item.classList.remove(ONSTRING);
          dimmer.classList.remove("active");
        }
      }
    });
  }

  // 컨텐츠 슬라이드 width/height
  function slideContainerWidthCalc() {
    const slideCon = document.querySelector("#cont-02");
    if (!slideCon) {
      return;
    }
    const conLef = slideCon.querySelector(".cont-left");
    const conRig = slideCon.querySelector(".cont-right");
    const slides = conRig.querySelectorAll(".slide");
    if (!slides) {
      return;
    }

    [].forEach.call(slides, function (slide) {
      const conRect = conLef.getBoundingClientRect();
      const conLefW = conRect.width;
      const conPoLeft = conRect.right;
      const winW = window.innerWidth;

      const container = document.querySelector("#cont-02 .container");
      conRig.style.width =
        (winW - (conLefW + conPoLeft)) + "px";
      container.style.height =
        slide.getBoundingClientRect().height + "px";
    });
  }

  // tab
  function tabEventHandler(btn, idx) {
    if (!tabBtn) {
      return;
    }
    [].forEach.call(tabBtn, function (item, x) {
      item.classList.remove(ONSTRING);
      tabContent[x].classList.remove(ONSTRING);
    });

    tabContent[idx].classList.add(ONSTRING);
    if(tabTit) {
      tabTit.innerText = btn.innerText;

    }


    btn.classList.add(ONSTRING);

  }

  // 외부 페이지 탭 이동
  function locationHandler() {
    const url = location.href;
    const target = String(url.match(/\#[\w\-\w]+/g));
    const currentHash = location.hash;

    if (currentHash === target) {
      [].forEach.call(tabBtn, function (item, ix) {
        const tagUrl = item.getAttribute("href");
        item.classList.remove(ONSTRING);
        tabContent[ix].classList.remove(ONSTRING);

        if (tagUrl === target) {
          item.classList.add(ONSTRING);
          tabTit.innerText = item.innerText;
          tabContent[ix].classList.add(ONSTRING);
        }
      });
    }
  }

  
  
  // 회원가입 전화번호 010 자동입력
  function autoTextInputHandler() {
    if (!phoneInput) {
      return false;
    }

    phoneInput.addEventListener("click", function (e) {
      if (this.value === "") {
        this.value = "010";
      }
    });
  }

  // "-" 자동 입력
  const autoHypenPhone = function (str) {
    str = str.replace(/[^0-9]/g, "");
    let tmp = "";
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3, 3);
      tmp += "-";
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += "-";
      tmp += str.substr(3, 4);
      tmp += "-";
      tmp += str.substr(7);
      return tmp;
    }
  };

  // 게시판 글쓰기 메뉴 드롭다운
  function boardMenuDropDown(item, idx) {
    item.addEventListener("click", function(){
      [].forEach.call(targetItem, function(c,z){    
        c.nextElementSibling.style.height = 0 + "px";
      });

      const menu = item.nextElementSibling.querySelectorAll("li");
      [].forEach.call(menu, function(a, b){    
        const menuH = a.children[0].offsetHeight; 
        
        if(item.nextElementSibling.offsetHeight === 0) {
          item.nextElementSibling.style.height = (menuH * menu.length + 16) + "px";
        }else {
          item.nextElementSibling.style.height = 0;
        }
      });
    });
  }

  // 사용자 메뉴 컨트롤
  function mainContentUser(item, idx) {
    const mainData = main.getAttribute("data-user");
    const itemData = item.getAttribute("data-user");

    if(mainData === itemData) {
      item.classList.add(ONSTRING);
    }
  }

  // 파일첨부 파일명 
  function fileAddInput() {
    const file = document.querySelector("#file");
    const name = document.querySelector(".upload-name");
    if(!file) {
      return;
    }
    file.addEventListener("change", function(){
      const fileName = file.value;
      name.value = fileName;
    });
  }

  // 회원가입
  function checkTypeHandler(input, i) {
    const checkPoint = document.querySelector(".check-point");
    const check = document.querySelector(".check-gorup");
    const depth01 = document.querySelector(".form-depth.depth01");
    const rowGroup = document.querySelectorAll(".row-multiple .row-group");
    if(!checkPoint) {
      return;
    }

    input.addEventListener("click", function(){
      
      if(checkPoint.checked === true) {
        depth01.classList.add(ONSTRING);
        check.setAttribute("data-type", "type02");

        checkDataType(check, rowGroup);

      }else if(checkPoint.checked === false) {
        depth01.classList.remove(ONSTRING);
        check.setAttribute("data-type", "type01");

        checkDataType(check, rowGroup);
      }
    });
  }

  // 회원가입 인풋 트리거
  function checkDataType(check, rowGroup) {
    [].map.call(rowGroup, function(item, i){
      item.classList.remove(ONSTRING);

      const arrAy = [];
      arrAy.push(item);

      const result = arrAy.find(function(x){
        return x.dataset.type === check.dataset.type;
      });

      if(result !== undefined) {
        result.classList.add(ONSTRING);
      }
    });
  }

  // 좋아요
  function feildLikeCheck(like, idx){
      like.classList.toggle(ONSTRING);
  }

  // footer drop
  function footerDropHandler() {
    footerDrop.addEventListener("click", function(){
      footerDrop.classList.toggle(ONSTRING);
    });
    
  } 

  // 메인 검색창 팝업
  function searchPopUpShowHide() {
    const searchIp = document.querySelectorAll("input[type='text']");
   
    [].forEach.call(searchIp, function(item, idx){
     
      const parent = item.closest(".form-area");
      const sibling = parent.nextElementSibling;
      if(!sibling) {
        return;
      }
      const hasClass = sibling.classList.contains("search-popup");
      item.addEventListener("focus", function(e){
        if(hasClass) {
          parent.classList.add(ONSTRING);
        }
      });
    });
  }

  function alarmPopupShowHide() {
    const alarmArea = document.querySelector(".alarm-area");
    const alarmBtn = document.querySelector(".btn-alarm");

    if(!alarmBtn) {
      return;
    }

    alarmBtn.addEventListener("click", function(){
      alarmArea.classList.toggle(ONSTRING);
    });
  }

  function loopHandler() {

    // 탭
    [].forEach.call(tabBtn, function (btn, idx) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        tabEventHandler(btn, idx);
      });
    });

    // 게시판 글쓰기 메뉴 
    [].forEach.call(targetItem, function(item, idx){
        boardMenuDropDown(item, idx);
    });

    // 메인 사용자(로그인 후) 메뉴
    [].forEach.call(type, function(item, idx){
      mainContentUser(item, idx);
    });
  
    // 회원가입 체크 영역 show/hide
    [].forEach.call(checkInput, function(input, i){
      checkTypeHandler(input, i);
    });
  
    // 좋아요 클릭
    [].forEach.call(like, function(like, idx){
 
      like.addEventListener("click", function(){
        feildLikeCheck(like, idx);
      });
    });

    // gnb
    [].forEach.call(gnbLi, function(item, idx){ 
      gnbMenuListShowHide(item, idx)
    });

  }

  function init() {
    loopHandler();
    hbgBtnEvHandler();
    gnbMenuClose();
    slideContainerWidthCalc();
    autoTextInputHandler();
    fileAddInput();
    footerDropHandler();
    searchPopUpShowHide();
    locationHandler();
    alarmPopupShowHide();

    if (phoneInput) {
      phoneInput.onkeyup = function () {
        this.value = autoHypenPhone(this.value);
      };
    }

    closeBtn.addEventListener("click", () => gnbMenuClose());

    window.addEventListener("resize", function () {
      slideContainerWidthCalc();
      nav.style.right = -(nav.offsetWidth) + "px";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    init();
  });
})(window);


// 팝업 열기
function popupOpen(pop_id) {
  pop_id.classList.add("active");
}

// 팝업 닫기
function popupClose(pop_id) {
  pop_id.classList.remove("active");
}
