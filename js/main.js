$(document).ready(function(){
    var   $container = $('#progress'),
            $progressBar = $container.find('.progress-bar'),
            $progressText = $container.find('.progress-text'),
    
            imgLoad = imagesLoaded( 'body' ),
            imgTotal = imgLoad.images.length, // 전체 이미지  수
            imgLoaded = 0,  // 로드한 이미지 수
            current = 0,  // 진행률
            progressTimer = setInterval(updateProgress, 1000/60);

//이미지를 로드할 때 마다 로드한 이미지 수를 늘려준다.

            imgLoad.on( 'progress', function(){
                imgLoaded++;
                
                });

                function updateProgress(){
                var target = (imgLoaded/imgTotal) *100;

                // current = current + (target - current) * 0.1;
                current += (target - current) * 0.05;

                

                $progressBar.css({width:current + "%"});    
                $progressText.text(Math.floor(current) + '%');
                

                if(current > 99.9){
                clearInterval(progressTimer);
                $container.addClass('progress-complete')
                $progressBar.add($progressText).delay(500).animate({opacity:0}, 250,
                    function(){
                        $container.animate({top:'-100%'}, 1000, 'easeInOutQuint');
                        $('header,main').addClass('on');
                });
                }
            }//updateProgress


    // nav 클릭 시 active class 추가 
    const navClick = document.querySelectorAll("nav .main-menu li")
    navClick.forEach(function(item,index){
        item.addEventListener('click',function(e){
            const activeA = document.querySelectorAll("nav .main-menu li a")
            for(let i = 0; activeA.length > i; i++) {
                activeA[i].classList.remove("active");
            }
            e.target.classList.add("active");
        });
    });  
    // //nav 클릭 시 active class 추가 
          



    var $header = $('header');
    var $skills = $('.skills');
    var $skillper = $skills.find('.skill-per');
    var $history = $('.history');
    var skillsExcuted = false;
    var $counterExcuted = false;
    var historyExcuted = false;
    
    $(window).scroll(function(){
        var $currentSct  = $(this).scrollTop();
        var $offset = 700;
        var skillsThreshold = $skills.offset().top - 600;
        var mobileskillsThreshold = $skills.offset().top - 600;
    
    
        // 헤더 고정하기
        if($currentSct > 0 ){
            $header.addClass('sticky');
        }else{
            $header.removeClass('sticky');
        }

        // 스킬 나타내기
        if($currentSct > skillsThreshold ){
            $skillper.each(function(){
                var $this = $(this);
                var per = $this.attr('per');

                $this.css('width',per + '%');
            });
        }

        // 모바일 버전
        if($currentSct > mobileskillsThreshold ){
            $skillper.each(function(){
                var $this = $(this);
                var per = $this.attr('per');

                $this.css('width',per + '%');
            });
        }

        var mobilehistoryThreshold = $history.offset().top - 600;

        // if(!historyExcuted){
            if($currentSct > mobilehistoryThreshold ){
                $history.addClass('active');
                historyExcuted = true;
            }
        // }



        // history 나타나기
        var historyThreshold = $history.offset().top - $offset;

        if(!historyExcuted){
            if($currentSct > historyThreshold ){
                $history.addClass('active');
                historyExcuted = true;
            }
        }
    });  //scroll event


        //portfolio 슬라이드
        var container = $('.container');
        var slideGroup = container.find('.portfolio_list');
        var slides = slideGroup.find('li');
        var nav = $('.controls');
        var slideCount = slides.length;
        var currentIdx = 0;
        var duration = 500;
    

        slides.each(function(i){
            var newLeft = i * 400 + 'px';
            $(this).css({left : newLeft});
            
        }); //slides.each
        

        function goToSlide(index){
            slideGroup.animate({left : -400 * index + 'px'}, duration);
            currentIdx = index;
            
        }

        nav.find('.next').click(function(e){
            e.preventDefault();
            if(currentIdx < slideCount -3){
                goToSlide(currentIdx + 1);
            }else{
                goToSlide(0);
            }            
        });

        nav.find('.prev').click(function(e){
            e.preventDefault();
            if(currentIdx > 0){
                goToSlide(currentIdx - 1);
            }else{
                goToSlide(slideCount - 3);
            }            
        });
        
           
            
});   //ready(function()
