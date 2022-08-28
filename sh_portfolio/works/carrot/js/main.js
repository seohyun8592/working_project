'use strict';
const itemArea = document.querySelector('.item-area');
const startBtn = document.querySelector('.click-start');
const timer = document.querySelector('.timer');
const rect = itemArea.getBoundingClientRect();
const Popup = document.querySelector('.pop-up');
const popupMessage = document.querySelector('.pop-up-ms');
const popupRefresh = document.querySelector('.refresh');
const count = document.querySelector('.count');
const durationGameTime = 7;

let started = false;
let timerStart = undefined;
let score = 0;
let CARROT_COUNT = 5;
let BUG_COUNT = 5;

// 게임 시작 버튼을 눌렀을 때
startBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});
// 게임 필드에 아이템 클릭 했을 때
itemArea.addEventListener('click', onfieldClick);
// 팝업 리프레시 버튼을 클릭 했을 때
popupRefresh.addEventListener('click', function () {
  startGame();
  hidePopupWithText();
  showStartBtn();
});
// 게임이 시작할 때
function startGame() {
  started = true;
  initGame();
  timerOn();
  showTimerWithScore();
  showStopBtn();
}
// 게임을 다시 시작할 때
function stopGame() {
  started = false;
  timerOff();
  hideStartBtn();
  showPopupWithText('REPLAY❓');
}
// 게임이 끝났을  ( 당근 모두 없앰, 시간초과, 벌레 클릭 )
function gameFinished(win) {
  started = false;
  showStartBtn();
  showPopupWithText(win ? 'YOU WON😍' : 'YOU LOST😫');
  timerOff();
  hideTimerWithScore();
  hideStartBtn();
}
// 게임 필드 아이템 클릭 함수
function onfieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      gameFinished(true);
    }
  } else if (target.matches('.bug')) {
    gameFinished(false);
  }
}
// 당근 갯수 스코어 표시
function updateScore() {
  count.innerHTML = CARROT_COUNT - score;
}
// 타이머
function timerOn() {
  let remainingTimeSec = durationGameTime;
  updateTimerText(remainingTimeSec);
  timerStart = setInterval(function () {
    if (remainingTimeSec <= 0) {
      gameFinished(CARROT_COUNT === count);
      clearInterval(timerStart);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
// 타이머에 표시 될 숫자
function updateTimerText(time) {
  let sec = time % 60;
  timer.innerHTML = '00:0' + sec;
}
// 타이머 끝내기
function timerOff() {
  clearInterval(timerStart);
}
// 게임 시작 버튼 -> 스탑 버튼 변경
function showStopBtn() {
  const icon = startBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  // startBtn.style.visibility = "visible";
}
// 게임 버튼 보이기
function showStartBtn() {
  startBtn.style.visibility = 'visible';
}
// 게임 버튼 가리기
function hideStartBtn() {
  startBtn.style.visibility = 'hidden';
}
// 타이머와 스코어 보이기
function showTimerWithScore() {
  timer.style.visibility = 'visible';
  count.style.visibility = 'visible';
}
// 타이머와 스코어 가리기
function hideTimerWithScore() {
  timer.style.visibility = 'hidden';
  count.style.visibility = 'hidden';
}
// 팝업 보이기
function showPopupWithText(text) {
  Popup.classList.remove('pop-up-hide');
  popupMessage.innerText = text;
  hideTimerWithScore();
}
// 팝업 숨기기
function hidePopupWithText() {
  Popup.classList.add('pop-up-hide');
}
// 게임 초기화
function initGame() {
  score = 0;
  itemArea.innerHTML = '';
  count.innerText = CARROT_COUNT;
  randomItem('carrot', CARROT_COUNT, 'img/carrot.png');
  randomItem('bug', BUG_COUNT, 'img/bug.png');
}
// 아이템 필드에 랜덤으로 뿌리기
function randomItem(classname, count, srcpath) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', classname);
    item.setAttribute('src', srcpath);
    const itemLeft = rect.width - 80;
    const itemTop = rect.height - 80;
    item.style.position = 'absolute';
    const x = randomNum(0, itemLeft);
    const y = randomNum(0, itemTop);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.cursor = 'pointer';
    itemArea.appendChild(item);
  }
}
// 랜덤 위치 만드는 함수
function randomNum(min, max) {
  return Math.random() * (max - min) - min;
}
