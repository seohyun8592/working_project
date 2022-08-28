'use strict';

document.addEventListener("DOMContentLoaded", init);

const carrotArea = document.querySelector('.item-area');
const startBtn = document.querySelector('.start-btn');
const timer = document.querySelector('.timer');
const carrot = document.querySelectorAll('.carrot');
const rect = carrotArea.getBoundingClientRect();

const timeOutPopup = document.querySelector(".time-out-popup");
const gameOverPopup = document.querySelector(".game-over-popup");
 
  let carrotLength = carrot.length;
  let time = 9;
  let sec = ""; 




    

startBtn.addEventListener('click', ( ) => { 
  randomItem();
  timerOn();
  carrotClick();
  // timeOutPopup.style.display = "none";
});

   


function randomItem( ) {
  for(let i = 0; i<carrotLength; i++) {
    let carrotWidth = Math.floor(Math.random() * rect.width - 50)
    let carrotHeigt = Math.floor((Math.random() * rect.height - 50))
   carrot[i].style.left = carrotWidth + "px";
   carrot[i].style.top = carrotHeigt + "px";
   carrot[i].style.display = "block";
  }    
}

function timerOn() {
  let timerStart = setInterval(function() {
    sec = time%60;
    timer.innerHTML = "00:0" + sec;
    time--;
    if(time < 0) {
      clearInterval(timerStart);
      timer.innerHTML = "Time Out";
      // timeOutPopup.style.display = "block"; 
      time = 9;   
    }
  },1000);
} 


const count = document.querySelector('.count');
//  count.innerHTML = carrotLength;



function carrotClick() {
  carrotArea.addEventListener("click", (e) => {
    const target = e.target;   
    const valueCarrot = target.getAttribute("data-key");
    let currentCount = --carrotLength;

    if(valueCarrot === "carrot") {
      target.style.display = "none";
      count.innerHTML = currentCount;
    }
    
    // if(time < carrotLength) {
      //   gameOverPopup.style.display = "block";
    //   console.log(time);
    // }
  });  
  
}