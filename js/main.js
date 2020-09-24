(function ($) {
    "use strict";

    $('.header-menu a[href="#"]').on('click', function (event) {
        event.preventDefault();
    });


//changing_background_banner
    var $bgImg = $('[data-banner]');
    $bgImg.css('background-image', function () {
        return 'url("' + $(this).data('banner') + '")';
    }).removeAttr('data-banner').addClass('banner');


 //video_popup
    var $popUpVideo = $('.popup-video');
    if ($popUpVideo.length) {
        $popUpVideo.magnificPopup({
            type: 'iframe'
        });
    };

    //back_to_top
    var $backToTopBtn = $('.back-to-top');

    if ($backToTopBtn.length) {
        var scrollTrigger = 400, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $backToTopBtn.addClass('show');
                } else {
                    $backToTopBtn.removeClass('show');
                }
            };

        backToTop();

        $(window).on('scroll', function () {
            backToTop();
        });

        $backToTopBtn.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }


}(jQuery));