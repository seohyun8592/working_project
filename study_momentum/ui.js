(function () {
  const greeging = document.querySelector('.contents-top .desc');
  const loginForm = document.querySelector(
    '.before-contents .write-form .form-area input'
  );
  const loginBtn = document.querySelector(
    '.before-contents .write-form .btn-area button'
  );
  const beforeCon = document.querySelector('.before-contents');
  const contentsArea = document.querySelector('.after-contents');
  const logoutBtn = document.querySelector('.logout-btn');

  // login
  function loginSubmitHandler() {
    const userName = loginForm.value;

    if (userName === '') {
      alert('Please, write your name!');
      return;
    }

    localStorage.setItem('user-name', userName);

    beforeCon.classList.add('hidden');
    contentsArea.classList.remove('hidden');

    paintGreeging(userName);
  }

  function logoutSubmitHandler() {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();

      localStorage.removeItem('user-name');

      beforeCon.classList.remove('hidden');
      contentsArea.classList.add('hidden');
      listArea.classList.remove('on');

      loginForm.value = '';

      logoutBtn.innerText = '로그인';
      greeging.innerText = '';

      savedUserCheck();
    });
  }

  function paintGreeging(userName) {
    greeging.innerText = `Good Afternoon, ${userName}`;
    logoutBtn.innerText = '로그아웃';
  }

  function savedUserCheck() {
    const savedUserName = localStorage.getItem('user-name');

    if (savedUserName === null) {
      loginBtn.addEventListener('click', loginSubmitHandler);
      loginForm.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
          loginSubmitHandler();
        }
      });
    } else {
      beforeCon.classList.add('hidden');
      contentsArea.classList.remove('hidden');
      paintGreeging(savedUserName);
    }
  }

  // clock
  const clock = document.querySelector('.clock');

  function clockHandler() {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    clock.innerText = `${hour}:${minutes}:${seconds}`;
  }

  // quote
  const quotes = [
    {
      quote: "The world is your oyster. It's up to you to find the pearls.",
      translate:
        '인생은 힘들 수 있지만, 꾸준히 노력하면 마치 굴 안에 든 진주를 발견하는 것처럼 뜻 밖의 보상을 받을 때가 있다.',
    },
    {
      quote: "It's okay to fail; it;s not okay to quit.",
      translate: '실패하는 것은 괜찮지만 그만두는 것은 괜찮지 않습니다.',
    },
    {
      quote: 'It can be done, but you have to make it happen.',
      translate:
        '내가 원하는 걸 얻을 수 있어 보일 때 실현할 수 있도록 최선을 다해라.',
    },
    {
      quote: 'If you believe you can do it, you will.',
      translate: '할 수 있다고 믿으면 이룰 것이다.',
    },
    {
      quote: 'Always, always pursue happiness.',
      translate: '행복이란 스스로 만족하다고 여기는 사람의 것이다.',
    },
  ];
  const quote = document.querySelector('.quote-area .desc');
  const subQuote = document.querySelector('.quote-area .sub-desc');

  function paintQuote() {
    const randomQuote = Math.floor(Math.random() * quotes.length);
    console.log(randomQuote);
    quote.innerText = quotes[randomQuote].quote;
    subQuote.innerText = quotes[randomQuote].translate;
  }

  // random background
  const wrap = document.querySelector('.wrap');

  function changeBg() {
    const randomBg = Math.floor(Math.random() * 5);

    if (randomBg === 0) {
      wrap.style.backgroundImage = `url("../img/bg_0${randomBg + 1}.png")`;
    } else {
      wrap.style.backgroundImage = `url("../img/bg_0${randomBg}.png")`;
    }
  }

  // function randomNum(max, min) {
  //     return Math.floor(Math.random() * (max - min) + min);
  // }
  // function changeBg() {
  //     const randomBg = randomNum(5, 1);
  //     wrap.style.backgroundImage = `url("../img/bg_0${randomBg}.png")`
  // }

  // Todo List show & hide
  const clickThis = document.querySelector('.list-box a');
  const listArea = document.querySelector('.list-area');

  function todoShowHide() {
    if (clickThis) {
      clickThis.addEventListener('click', function () {
        listArea.classList.toggle('on');
      });
    }
  }

  // To Do List
  const todoInput = document.querySelector(
    '.contents-btm .after-contents .form-area input'
  );
  const listBox = document.querySelector('.list-item');
  const submitBtn = document.querySelector('.submit-btn');

  let arr = [];

  // 로컬스토리지에서 저장된 정보를 불러옴
  function checkSavedUserValue() {
    const savedValue = JSON.parse(localStorage.getItem('todos'));
    if (savedValue !== null) {
      savedValue.forEach(createTodoList);
      arr = savedValue; // 새로운 배열(정보) 저장
    }
  }
  // 로컬스토리지에 정보를 저장함
  function savedUserValue() {
    localStorage.setItem('todos', JSON.stringify(arr));
  }

  // 리스트 삭제
  function listDelHandler(e) {
    const targetParent = e.target.closest('li');
    targetParent.remove();

    arr = arr.filter((x) => x.id !== parseInt(targetParent.id)); // 삭제 할 배열 필터 후 새로운 배열(정보) 저장
    savedUserValue();
  }

  // 화면 출력
  function userValueHandler() {
    const userValue = todoInput.value;
    todoInput.value = '';

    const newObject = {
      text: userValue,
      id: Date.now(),
    };

    arr.push(newObject);

    createTodoList(newObject);
    savedUserValue();
  }

  // 엘리먼트 생성
  function createTodoList(text) {
    const li = document.createElement('li');
    li.id = text.id;
    const span = document.createElement('span');
    span.innerText = text.text;
    const delBtnArea = document.createElement('div');
    delBtnArea.setAttribute('class', 'btn-area');
    const delBtn = document.createElement('button');
    delBtn.setAttribute('class', 'del-btn');

    delBtn.addEventListener('click', listDelHandler);

    li.appendChild(span);
    li.appendChild(delBtnArea);
    delBtnArea.appendChild(delBtn);
    listBox.appendChild(li);
  }

  submitBtn.addEventListener('click', userValueHandler);
  todoInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      userValueHandler();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    savedUserCheck();
    clockHandler();
    setInterval(clockHandler, 1000);
    paintQuote();
    changeBg();
    todoShowHide();
    checkSavedUserValue();
    logoutSubmitHandler();
  });
})(window);
