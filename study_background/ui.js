(function () {
  // 컨텐츠 엘리먼트
  var elements = [];

  // 컨텐츠엘리먼트 offsetTop 값 저장할 배열
  var contentsTop = [];
  // bg컬러
  var colors = ['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'];
  // fixed-bg 엘리먼트 캐싱
  var bg;

  function init() {
    initVars();
    initEvents();
    resizeHandler();
    scrollHandler();
  }

  // 이벤트 초기화
  function initEvents() {
    // 화면 리사이즈 이벤트
    window.addEventListener('resize', resizeHandler);
    // 화면 스크롤 이벤트
    window.addEventListener('scroll', scrollHandler);
  }

  // 변수 초기화
  function initVars() {
    // 컬러가 변경 될 bg 셀렉트 캐싱
    bg = document.querySelector('.fixed-bg');
    // 컨텐츠 엘리먼트 리스트 캐싱
    elements = document.querySelectorAll('.content');
  }

  // 화면 리사이즈 이벤트 발생 시 실행
  function resizeHandler() {
    contentsTop = [];

    [].forEach.call(elements, function (element) {
      // -50px 헤더 고정영역 만큼 마이너스
      element.style.height = window.innerHeight - 50 + 'px';
      var rect = element.getBoundingClientRect();
      // 화면 사이즈가 변경될 때 offsetTop 값이 변경될 테니 초기화 후 다시 셋팅
      contentsTop.push(rect.top);
    });
  }

  // 화면 스크롤 이벤트 발생 시 실행
  function scrollHandler() {
    // 현재 스크롤 top 값
    var scTop = window.pageYOffset;
    // 엘리먼트의 총 갯수
    var total = elements.length;

    // loop 돌면서 각 엘리먼트들의 offsetTop 값 과 스크롤 top 값을 비교
    for (var i = 0; i < total; i++) {
      // 현재 엘리먼트( 엘리먼트 리스트 중)
      var currentElement = elements[i];
      // 현재 엘리먼트의 offsetTop 값
      var currentTop = contentsTop[i];

      // 현재 스크롤 Top값이 현재 컨텐츠의 offsetTop 값보다 크다면 변경처리
      if (scTop > currentTop - window.innerHeight / 2) {
        bg.style.backgroundColor = colors[i];
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
