$(document).ready(function(){  
    $('.phone-mail').click(function(){
        var activeTab = $(this).attr('data-tab');
    
        $('.phone-mail').removeClass('current');
        $('.tab-content').removeClass('current');
    
        $(this).addClass('current');
        $('#' + activeTab).addClass('current');
        $(".tab-content li").removeClass("current");
        })

 

        $('.mileage_box').on('click', 'li', function() {
            $('.selection').removeClass('on');
            $(this).addClass('on');
      });
        
});