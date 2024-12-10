var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var mobileW = 360;
var tabletW = 768;
var gnbW = 1480;

$(document).ready(function(){
	// gnb - pc : start
	var $body = $('html, body'),
			$gnb = $('#gnb'),
			$hoverMenu = $('.menu-full'),
			$gnbTit = $('.visual.title h2');
			$dimmed = $('.dimmed');
		

	// 마우스오버 시 펼침메뉴 열림
	$('.nav').on('mouseover',function(){
		$gnb.addClass('hover');
		$('.depth2').show();
		if( !$(this).hasClass('search-input') ) {
			$hoverMenu.addClass('show');
		}
		$dimmed.show();
		$body.css('overflow','hidden');
	});

	// gnb 영역 검색버튼 클릭시 검색영역 보임
	$('#gnb .search').on('click',function() {
			$gnb.addClass('search-input hover');
			//$('#gnb .search-wrap').fadeIn(300);
			$('#gnb .search-wrap').slideDown(200);
			$hoverMenu.removeClass('show');
			$dimmed.show();
			$body.css('overflow','hidden');
	});	

	// 펼침메뉴, 검색영역 닫기 ( 펼침메뉴와 검색영역이 동시에 열려있을 경우에는 펼침메뉴 먼저 닫힘)
	$('#gnb .menu-close').on('click',function() {
			if ( $gnb.hasClass('search-input') && $hoverMenu.hasClass('show') ) {
				$hoverMenu.removeClass('show');
				$body.css('overflow','hidden');
			} else {
				$gnb.removeClass('search-input hover');
				$hoverMenu.removeClass('show');
				//$('#gnb .search-wrap').fadeOut(100);
				$('#gnb .search-wrap').slideUp(100);
				$dimmed.hide();
				$body.css('overflow','inherit');
			}
	});

	if (winW > gnbW) {
		// 마우스아웃 시 펼침메뉴 닫힘
		$hoverMenu.on('mouseleave',function(e){
			var hoverTarget = e.relatedTarget;
			if( !$gnb.hasClass('search-input') && !(hoverTarget != null && hoverTarget.id == 'gnb') ) {		
				$gnb.removeClass('hover');
				if( !$hoverMenu.hasClass('open') && !(hoverTarget != null && hoverTarget.id == 'gnb') ) {
					$body.css('overflow','inherit');
					$dimmed.hide();
				} 
			}
			if ( !(hoverTarget != null && hoverTarget.id == 'gnb') ){
				$hoverMenu.removeClass('show');
			}
		});
		$gnb.on('mouseleave',function(e){
			var hoverTarget = e.relatedTarget;
			if( hoverTarget == null ) {
				$body.css('overflow','inherit');
			}
		});
	}
	
	// 마우스가 브라우저를 벗어날 경우 gnb 닫힘
	$(document).on("mouseleave", function(){
		if( !$hoverMenu.hasClass('open') ) {
			if ( !$gnb.hasClass('search-input') && $('.pop-layer:visible').length == 0){
				$gnb.removeClass('hover');
				$hoverMenu.removeClass('show');
				if ( $(window).width() > 1366) {
					$dimmed.hide();
				}
			}
			if (  $gnb.hasClass('search-input') && $hoverMenu.hasClass('show') ){
				$hoverMenu.removeClass('show');
				$body.css('overflow','hidden');
			}
		}
	});
	// gnb - pc : end

	//gnb - tablet, mo : start
	$('.btn-menu').on('click',function(){
		$hoverMenu.addClass('open');
		$dimmed.fadeIn();
		$body.css('overflow-y','hidden');
		$dimmed.css('z-index',20);
	});

	$('.menu-full .btn-close').on('click',function(){
		if ( $hoverMenu.hasClass('open') ) {
			$dimmed.hide();
			$body.css('overflow-y','inherit');
			$dimmed.css('z-index',5);
			$hoverMenu.removeClass('open');
			$('.depth2').hide();
		} else {
			$('#gnb .menu-close').click();
		}
	});
	lnb();
	//gnb - tablet, mo : end

	// visual - slider
	visualSlider();
	topBanner();
	quickList();
	
	// top	
	btnTop();
	
	// visual - scroll down
	$('.visual .scroll').on('click',function(){
			var visualH = $('.visual').innerHeight();
			$('html, body').animate({ scrollTop: visualH-100 }, 300, 'easeInOutQuad');
	});

	// main : tab-list
	tabList();
	tabSlider();
	
	var $calendar = $('.calendar, .calendar-from, .calendar-to');
	if( $(window).width() < 1440) {
		$calendar.attr('readonly','readonly')
		//$calendar.datepicker(  "option", "dateFormat", 'yy-mm-dd' );
	}

	// date picker	
	$( ".calendar").datepicker({
		dateFormat: "yy-mm-dd",
		showOtherMonths: true,
		selectOtherMonths: true,
		monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'], //달력의 월 부분 Tooltip 텍스트
		dayNamesMin: ['S','M','T','W','T','F','S'] ,//달력의 요일 부분 텍스트
		showMonthAfterYear: true,
		yearSuffix: ".", 
		showButtonPanel: true,
		closeText: 'Clear',
		beforeShow: function(input) {
			setTimeout(function () {
				var buttonPane = $(input)
						.datepicker("widget")
						.find(".ui-datepicker-buttonpane");

				var btn = $('<button class="ui-datepicker-clear ui-state-default ui-priority-secondary ui-corner-all" type="button">Clear</button>');
				btn.off("click").on("click", function () {
						input.value = '';
				});
				btn.appendTo(buttonPane);
			}, 1);

			if ($(window).width() < 767) {
				return { numberOfMonths: 1 };
			} else {
				return { numberOfMonths: 2 };
			}
    }
	});

	// layer-popup
	$('.btn.example, .btn-popup').on('click',function(){
		var $href = $(this).attr('data-href');
		layer_popup('#'+$href);
		$dimmed.addClass('pop');
	});

	function layer_popup(el){
		var $el = $(el);
		$dimmed.fadeIn();
		$el.fadeIn();
		$body.css('overflow','hidden');

		var $elWidth = ~~($el.outerWidth()),
			$elHeight = ~~($el.outerHeight()),
			docWidth = $(document).width(),
			docHeight = $(document).height();

		// 화면의 중앙에 레이어를 띄운다.
		if ($elHeight < docHeight || $elWidth < docWidth) {
			$el.css({
				marginTop: -$elHeight /2,
				//marginLeft: -$elWidth/2
			})
		} else {
			$el.css({top: 0, left: 0});
		}

		$el.find('.pop-close, .close').click(function(){
			$dimmed.fadeOut();
			$dimmed.removeClass('pop');
			$el.fadeOut();
			$body.css('overflow','inherit');
			return false;
		});

		/*$dimmed.on('click',function(){
			if( !$(this).hasClass('alert') ){
				$el.fadeOut();
				$(this).fadeOut();
				$body.css('overflow','inherit');
			}			
		});*/
	}

	// mo: quick-link
	$(".quick-link").slick({
		slide: 'li',
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		variableWidth: true,
		infinite: false,
		prevArrow: false,
    nextArrow: false
	});

	var $width = $(window).width();
	$(window).resize(function(){
		// resize 될 때 lnb가 닫힘
		if( $hoverMenu.hasClass('open') && $(window).width() > 1440) {
			$('.menu-full .btn-close').click();
		}
		
		// visual - slider
		quickList();

		// main : tab-list
		tabList();
		
		/* tooltip */
		$('.tooltip-menu').removeClass('show');
			
		
		if( $width != $(window).width()) {
			/* education calendar */
			var calendarH = $('.tbl-calendar table').height();
			$('.tbl-calendar').height(calendarH);
			$('.tbl-calendar').removeClass('hide');
			$('.calendar-info').removeClass('scroll');

			/* faq */
			var keywordH = $('.keyword').innerHeight();
			if( window.innerWidth > 767 ){
					$('.faq-keyword').css('height','auto');
			} else {
				$('.faq-keyword').css('height',48);
				$('.faq-keyword').removeClass('show');
			}
		}	

		if( $(window).width() < 768) {
			$('.tbl-wrap .tbl-toggle tr').css('display','block');
			$('.tbl-wrap .tbl-toggle tr').css('display','none');
			$('.tbl-wrap .tbl-toggle').eq(0).addClass('open').find('tr').show();
		} else {
			$('.tbl-wrap .tbl-toggle tr').css('display','table-row');
		}
		//tblToggle();
				
	});

	$(window).scroll(function(){
		gnbFixed();

		var scrollT = $(window).scrollTop(),
         scrollArea = $( document ).height();
		if ((scrollT + $( window ).height() ) >= scrollArea-160) {
				$('.btn-top').fadeIn(200);
				$('.btn-write').addClass('bottom');
		} else {
			$('.btn-top').fadeOut(200);
			$('.btn-write').removeClass('bottom');
		}
		btnTop();


	});

	$('.user').on('click',function() {
			$(this).siblings('.tooltip-menu').toggleClass('show');
	});

	$('.slider .slick-arrow').on('click',function() {
		$('.slider .slick-arrow').removeClass('on');
		$(this).addClass('on');
	});
	
	// search-box filter button
	$('.btn-filter').on('click',function() {
			var $box = $(this).parents('.search-box');
			if ( !$(this).hasClass('pc') && !$(this).hasClass('ta') ){
				$dimmed.show();
				$dimmed.css('z-index',10);
				$box.find('.bottom-filter').addClass('show');
				$body.css('overflow','hidden');
			} else if( $(this).hasClass('ta') ) {
				$dimmed.show();
				$dimmed.css('z-index',10);
				$box.find('.bottom-filter').addClass('show');
				$body.css('overflow','hidden');
			}else {
				if ( !$(this).parents('.search-box').hasClass('open')){
					$box.find('.pc-filter').slideDown(200);
					$box.addClass('open');
				} else {
					$box.find('.pc-filter').slideUp(50);
					setTimeout(function () { $box.removeClass('open')}, 40);
				}
			}
	});
	$('.bottom-filter .bottom-close').on('click',function() {
		$(this).parent('.bottom-filter').removeClass('show');
		$dimmed.hide();
		$dimmed.css('z-index',5);
		$body.css('overflow','inherit');
	});
	
	//board-list 페이지의 content-wrap 에 class추가
	if( $('.board-list').length > 0) {
		$('.content-wrap').addClass('in-list');
	}

	//board view comment 
	$('.comment-list').each(function(){
			var $input = $(this).find('.comment-input'),
					$edit = $(this).find('.btn-edit'),
					$modify = $(this).find('.btn-modify'),
					$cancel = $(this).find('.btn-cancel'),
					$reply= $(this).find('.btn-reply'),
					$recomment = $(this).find('.re-comment'),
					$list = $(this),
					$comment = $(this).find('.comment');

			$edit.on("click", function() {
				var $tool = $(this).siblings('.tool-edit');
				if ($tool.hasClass("active")) {
					$tool.removeClass("active");
				} else {
					$('.tool-edit').removeClass("active");
					$tool.addClass("active");
				}
			});

			$modify.on('click',function() {
				$(this).parent('.tool-edit').parent('.comment').addClass('modify');
				$(this).parent('.tool-edit').parent('.re-comment').addClass('modify');
				$(this).parent('.tool-edit').removeClass('active');
				$(this).parents('.re-comment').removeClass('in-writing');
				$list.removeClass('in-reinput');
			});
			$cancel.on('click',function() {
				//$(this).parents('.comment, .re-comment').removeClass('modify');
				$(this).parent('.comment, .re-comment').removeClass('modify');
			});
			$reply.on("click", function() {
				var $recommentR = $(this).parent('.re-comment'),
					  $listR = $(this).parents('.comment-list'),
						$commentR = $(this).parents('.comment');
				
				if ($recommentR.hasClass("in-writing") || $listR.hasClass("in-reinput") || $commentR.hasClass("modify")) {
					if( $commentR.length != 0){
						$listR.removeClass('in-reinput');
					} else {
						$recommentR.removeClass('in-writing');
					}
				} else {
					$('.comment-list').removeClass('in-reinput');
					$('.re-comment').removeClass('in-writing');
					$('.comment').removeClass('modify');
					if( $(this).parents('.comment').length != 0){
						$listR.addClass('in-reinput');
					} else {
						$recommentR.addClass('in-writing');
					}
				}
			});
	});

	//faq
	$('.faq-keyword .keyword button').on('click',function() {
			$('.faq-keyword button').removeClass('on');
			$(this).addClass('on');
	});
	
	$('.faq-keyword .toggle').on('click',function(){
		var keywordH = $('.keyword').innerHeight();
		if ( $(window).width() < 768) {
			$(this).parent('.faq-keyword').toggleClass('show');
			 if( $(this).parents('.faq-keyword').hasClass('show')) {
				 $(this).parent('.faq-keyword').css('height',keywordH);
				
			 } else {
					$(this).parent('.faq-keyword').css('height',48);
					$('.faq-keyword button').removeClass('on');
			 }
		}		 
	});

	/* education calendar bottom bar */
	$('.full-calendar .toggle').on('click',function() {
		var calendarH = $('.tbl-calendar table').height();
		$(this).parent('.full-calendar').find('.tbl-calendar').toggleClass('hide');
		$(this).parents('.calendar-wrap').find('.calendar-info').toggleClass('scroll');
		if( $(this).parent('.full-calendar').find('.tbl-calendar').hasClass('hide') ) {
			$('.tbl-calendar').height(0);
		} else {
			$('.tbl-calendar').height(calendarH);
		}
	});

	$('.grade-caption .caption').on('click',function() {
			$('.grade-tooltip').toggleClass('show');
	});

	/* btn-dayoff */
	$('.btn-dayoff').on('click',function(){
			$('.btn-dayoff').removeClass('on');
			$(this).addClass('on');
	});
	
	if( $(window).width > 768) {
		$('.tbl-wrap .tbl-toggle tr').hide();
		$('.tbl-wrap .tbl-toggle').eq(0).addClass('open').find('tr').show();
	}
	tblToggle();

	$('.tbl-calendar td button').on('click',function() {
			$('.tbl-calendar td button').removeClass('on');
			$(this).addClass('on');
	});

	//accordion
	aCurrent = 0;
	$('.accordion').each(function() {
		var $dt = $(this).children('dt');
		$dt.eq(0).addClass('open');
		$dt.eq(0).next('dd').show();
		
		if( $(this).hasClass('sugg-info') ) {
			$(this).find('dt').addClass('open');
			$(this).find('dd').show();
		}
		if( !$(this).hasClass('report-info') && !$(this).hasClass('sugg-info') ) {
			$dt.on('click',function() {
				var idx = $(this).index();
				if( aCurrent != idx){
					$dt.removeClass('open');
					$dt.next('dd').slideUp('fast');
					$(this).addClass('open');
					$(this).next('dd').slideDown('fast');
					aCurrent = idx;
				} else {
					$(this).toggleClass('open');
					$(this).next('dd').slideToggle('fast');
				}
			});
		} else {
			$dt.on('click',function(e) {
				if (e.target.tagName == 'BUTTON' || e.target.tagName == 'A' || e.target.tagName == 'LABEL' || e.target.tagName == 'INPUT' || e.target.className == 'radio-wrap')
				return;				
			
				if( !$(this).hasClass('no-data') ) {
					$(this).toggleClass('open');
					$(this).next('dd').slideToggle('fast');
				}
			});
		}		
	});

	$('.accordion dt').each(function(){
		if( $(this).next('dd').text() == '' ) {
			$(this).addClass('no-data');
		}
	});
	

	//scroll table tutorial
	$('.tutorial').on('click',function() {
		$(this).fadeOut();
	});

	//fly duty btns
	$('.flight-btns button').on('click',function() {
		$('.flight-btns button').removeClass('active');
		$(this).addClass('active');
	});
	
	//textarea autosize
	$('textarea.autosize').each(function () {
	 this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
	}).on('input', function () {
		this.style.height = 'auto';
		this.style.height = (this.scrollHeight) + 'px';
	});

});
// end: $(document).ready


// tab
$(function () {
	$('.tab-wrap').each(function () {
		var $tabCon = $(this).find('.tab-cont');
		var $tabMenu = $(this).find('.tab-menu li');

		if( !$(this).find('li').hasClass('active') ) {
			$(this).find('.tab-menu li').eq(0).addClass('active');
			$tabCon.hide();
			$tabCon.eq(0).show();
		}

		 $tabMenu.click(function () {
			$(this).parents('.tab-wrap').find(".tab-menu li").removeClass("active");
			$(this).addClass("active");
			$(this).parents('.tab-wrap').find(".tab-cont").hide();
			
			var activeTab = $(this).attr("rel");
			$("#" + activeTab).fadeIn();
		});
	});
});

function lnb() {
	var $depth1 = $('.depth1 > li > a');

		current = -1;
		$depth1.on('click',function(){
				if ( $('.menu-full').hasClass('open') ) {

					var index = $depth1.index(this);
					if ( index != current ) {
						$depth1.removeClass('open');
						$depth1.siblings('.depth2').slideUp('300');
						$(this).addClass('open');
						$(this).siblings('.depth2').slideDown('500');
						current = index;
					} else {
						$(this).toggleClass('open');
						$(this).siblings('.depth2').slideToggle('500');
					}

				}
		});
}

// slider - paging
function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

// main : top-banner
function topBanner() {
	var $status = $('.paging');
	var $slickElement = $('.top-banner');

	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		if ( slick.slideCount > 1) {
			$status.html('<strong>' + pad(i,1) + '</strong> <span class="slash">/</span> <span>' + pad(slick.slideCount,1)) + '</span>';
		} else {
			$('.top-banner .bnr-area').addClass('nopaging');
		}
	});

	$(".top-banner .bnr-area").slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
					vertical: true,
					//verticalSwiping: true,
				}
			}
		]
	});

	$('.top-banner .bnr-close button').on('click',function(){
		$('.top-banner').fadeOut(100);
	});
}
	
// main : visual - slider
function visualSlider() {
	var $status = $('.pagingInfo');
	var $slickElement = $('.slider');

	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.html('<strong>' + pad(i,2) + '</strong> <span class="slash">/</span> <span>' + pad(slick.slideCount,2)) + '</span>';
		if (slick.slideCount <=5) {
			$(this).find('.slick-list').css('padding-left',0);
		}
	});

	
	$(".visual .slider").slick({
			centerMode: false,
			centerPadding:'24px',
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			//variableWidth: true,
			responsive: [
			{
				breakpoint: 1481,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 1025,
				settings: {
					//centerMode: true,
					//centerPadding:'92px',                 
					slidesToShow: 2,
					//slidesToScroll: 1,
				}
			},
			{
				breakpoint: 767,
				settings: {
					centerMode: false,
					centerPadding:'0',
					slidesToShow: 1,
					//slidesToScroll: 1,
				}
			},
			{
				breakpoint: 361,
				settings: {
					centerMode: true,
					centerPadding:'50px',
					slidesToShow: 1,
					//slidesToScroll: 1,
				}
			},
			{
				breakpoint: 321,
				settings: {
					centerMode: true,
					centerPadding:'30px',
					slidesToShow: 1,
					//slidesToScroll: 1,
				}
			}
		]
	});
	
}
	
// main : quick-list
$quickList = false;
function quickList(){    
	if($(window).width() < 768){
			if(! $quickList){
					$(".quick-list").slick({
							slide: 'li',
							slidesToShow: 4,
							slidesToScroll: 4,
							dots: true,
					});
					 $quickList = true;
			}
	} else if($(window).width() > 768){
			if( $quickList){
					$('.quick-list').slick('unslick');
					 $quickList = false;
			}
	}
};

// input - file
/* var $fileBox = null;
  
$(function() {
	inputFile();
})
  
function inputFile() {
	$fileBox = $('.input-file');
	fileLoad();
}

function fileLoad() {
	$.each($fileBox, function(idx){
		var $this = $fileBox.eq(idx),
				$btnUpload = $this.find('[type="file"]'),
				$label = $this.find('.file-label');
		
		$btnUpload.on('change', function() {
			var $target = $(this),
					fileName = $target.val(),
					$fileText = $target.siblings('.file-name');
			$fileText.val(fileName);
		})
		
		$btnUpload.on('focusin focusout', function(e) {
			e.type == 'focusin' ?
				$label.addClass('file-focus') : $label.removeClass('file-focus');
		})
		
	})
}  */


// btn-top position
function btnTop() {
	var footerH = $('#footer').innerHeight();

	$('.btn-top').on('click',function(){
			$('html, body').stop().animate({ scrollTop: 0 }, 500, 'easeInOutQuad');
	});
	
	if ( $(window).width() < 767)	{
		$('.btn-top').css('bottom',40+'px');
	} else {
		$('.btn-top').css('bottom',footerH+24+'px');
	}
	
}

// main: tab-list
function tabList() {
	if ( $(window).width() < 768 ) {
		$('.section > li').eq(0).show();
		$('.section-title h3 a').on('click',function(){
			//var idx = $('.section-title a').index(this);
			var idx = $(this).parents('li').attr('data-slick-index');
			$('.section-title a').removeClass('on');
			$(this).addClass('on');
			$('.section > li').hide();
			$('.section > li').eq(idx).show();
		});
	}
}

function tabSlider() {
	$(".section-title").slick({
		slide: 'li',
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		variableWidth: true,
		infinite: false,
		prevArrow: false,
    nextArrow: false
	});
}

function gnbFixed() {
	var $gnb = $('#gnb'),
			$gnbTit = $('.visual.title h2');
	if ( $(window).scrollTop() > 10 ){
		$gnb.addClass('fixed');
		$gnbTit.addClass('fixed');
	} else {
		$gnb.removeClass('fixed');
		$gnbTit.removeClass('fixed');
	}
}

function tblToggle() {
	/* tbl-toggle */
	if ( $(window).width() < 768){
		$('.tbl-wrap .tbl-toggle tr').css('display','none');
		$('.tbl-wrap .tbl-toggle').eq(0).addClass('open').find('tr').show();
	}
	$('.tbl-toggle caption').on('click',function() {
		if ( $(window).width() < 768){
			
			if ( !$(this).parent('.tbl-toggle').hasClass("open")) {
				$(this).parent('.tbl-toggle').addClass("open");
				$(this).parent('table').find('tr').slideDown(200);
			} else {
				$(this).parent('.tbl-toggle').removeClass("open");
				$(this).parent('table').find('tr').slideUp(200);
			}

		} else {
			return false;
		}
	});
}