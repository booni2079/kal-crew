
$(document).ready(function(){
	var $body = $('body'),
		$dimm = $('.dialog-dimmed'),
		$winWidth = $(window).width();

	myFlight();
	mySchedule();
	usedMenu();

	goToTop();	//top button

	/* mCustomScrollbar */
	$('.cs-scroll').mCustomScrollbar({
		theme: "minimal-dark"
	});



	/* usermenu widget */
	$('.usermenu-item ._has-toggle').on('click', function () {
		$(this).next().toggleClass('_show');
		$(".usermenu-item ._has-toggle").not(this).next().removeClass('_show');
		if($winWidth  <= 768 ){
			$('body').addClass('scroll-lock');
		}
		else {
			$('body').removeClass('scroll-lock');
		}
	});
	$('.togglebox').find('.ico-btn-close').click(function(){
		$(this).closest('.togglebox').removeClass('_show');
		$('body').removeClass('scroll-lock');
	});
	

	/* MyFlight slideUp,Down */
	$('.myflight .ico-btn-toggle').on('click',function(){
		$(this).parent().toggleClass('_hide');
	});

	/* 통합검색:Start */
	$('.search-wrap').hide();
	$('.gnb-wrap .ico-btn-search').on('click',function() {
		$body.addClass('scroll-lock');
		$dimm.show();
		$('.header').addClass('search-open');
		$('.search-wrap').slideDown(200);
	});
	$('.search-wrap .ico-btn-hide').on('click',function(){
		$body.removeClass('scroll-lock');
		$dimm.hide();
		$('.header').removeClass('search-open');
		$('.search-wrap').slideUp(100);
	});
	/* //통합검색:End */

	/* 한줄공지 */
	$('.one-line-notice .ico-btn-close').on('click', function(){
		$(this).parent().slideUp(200);
	});

	/* mGNB:Start */
	var $mGnb = $('.m-gnb');
	$('.btn-mgnb').on('click',function(){
		$mGnb.addClass('_show');
		$dimm.show().addClass('mp_show');
		$body.addClass('scroll-lock');
	});
	$('.m-gnb .ico-btn-close').on('click',function(){
		$dimm.hide().removeClass('mp_show');
		$body.removeClass('scroll-lock');
		$mGnb.removeClass('_show');
	});
	/* //mGNB:End */
	
	/* window */
	$(window).resize(function(){
		setResizeNav();
	});
	
	$(window).scroll(function(){
		headerFixed();	//header fixed
		
		/* btn-top */
		var scrollT = $(window).scrollTop(),
		scrollArea = $( document ).height();
		if ((scrollT + $( window ).height() ) >= scrollArea-160) {
				$('.btn-top').fadeIn(200);
		} else {
			$('.btn-top').fadeOut(200);
		}
		goToTop();
	});

	/* 레이어팝업:Start */
	// layer-popup
	$('.btn-pop-open').on('click',function(){
		var $href = $(this).attr('data-href');
		layPop('.'+$href);
		$dimm.addClass('mp_show');
				
	});
	function layPop(el){
		var $el = $(el);
		$dimm.fadeIn(100);
		$el.fadeIn(100);
		$body.addClass('scroll-lock');
		$el.find('.ico-btn-close').click(function(){
			$dimm.fadeOut(100).removeClass('mp_show');
			$el.fadeOut(100);
			$body.removeClass('scroll-lock');
			return false;
		});
	}


});
//End: $(document).ready -----------------------------*/

//mobile menu(세로탭) 윈도우 사이즈 변환시 위치 변환
function setResizeNav() {
	$(".tabs-nav .tab").each(function(i){
	   if ($(this).hasClass("active")) {
		  var tabsWidth = document.querySelector(".mgnb-nav").offsetWidth;
		  if(tabsWidth <= 599){
			 $(".tab-indicator-mgnb").css('top', `calc(18px + ${i*60}px)`);
		  } else {
			 $(".tab-indicator-mgnb").css('top', `calc(20px + ${i*70}px)`);
		  }
	   }
	})
 }

/* btn-top position */
function goToTop() {
	var footerH = $('#footer').innerHeight();

	$('.btn-top').on('click',function(){
			$('html, body').stop().animate({ scrollTop: 0 }, 300, 'easeInOutQuad');
	});
	
	if ( $(window).width() < 912)	{
		$('.btn-top').css('bottom',220+'px');
	} else {
		$('.btn-top').css('bottom',footerH+20+'px');
	}
}

/* header fixed */
function headerFixed() {
	var $headerFix = $('.header');

	if ( $(window).scrollTop() > 10 ){
		$headerFix.addClass('fixed');
	} else {
		$headerFix.removeClass('fixed');
	}
}

/* swiper */
function myFlight() {
	/*-----My Flight----*/
	new Swiper('.myflight', {
		slidesPerView : 2, // 동시에 보여줄 슬라이드 갯수
		spaceBetween : 20, // 슬라이드간 간격
		slidesPerGroup : 2, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음

		// 그룹수가 맞지 않을 경우 빈칸으로 메우기
		// 3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬
		loopFillGroupWithBlank : true,

		//loop : true, // 무한 반복

		pagination : { // 페이징
			el : '.swiper-pagination',
			clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
		},
		// navigation : { // 네비게이션
		// 	nextEl : '.swiper-button-next', // 다음 버튼
		// 	prevEl : '.swiper-button-prev', // 이전 버튼
		// },

		breakpoints: {
			// when window width is >= 320px 
			// 창 너비가 1023이하일때
			1023: {
			slidesPerView: 1,
			spaceBetween: 20,
			slidesPerGroup : 1,
			}
		}
	});
}
function mySchedule() {
	/*-----my SKD----*/
	new Swiper('.myschedule', {
		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
}
function usedMenu() {
	/*-----자주 가는 메뉴----*/
	new Swiper('.usedmenu-list', {
		slidesPerView : 5, // 동시에 보여줄 슬라이드 갯수
		spaceBetween : 0, // 슬라이드간 간격
		slidesPerGroup : 10, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음

		loopFillGroupWithBlank : true,

		//loop : true, // 무한 반복

		pagination : {
			el : '.swiper-pagination',
			clickable : true,
		},

		breakpoints: {
			1023: {
				slidesPerView: 5,
				spaceBetween: 10,
				slidesPerGroup : 5,
				pagination : { // 페이징
					el : '.swiper-pagination',
					clickable : true,
				},
			}
		},
		breakpoints: {
			599: {
				slidesPerView: 4,
				spaceBetween: 10,
				slidesPerGroup : 4,
				pagination : { // 페이징
					el : '.swiper-pagination',
					clickable : true,
				},
			}
		}
	});
}