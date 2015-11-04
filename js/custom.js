$(document).ready( function() {
    mobileNavCustom();
    heroSlider();
    sliderScroll();
});



// call mobile navigation
function mobileNavCustom() {
    $('<div class="mobile-nav"></div>').insertBefore('.middle-wrapper');
    $('.nav-wrapper nav').slicknav({
        label: 'Products',
        duration: 500,
        allowParentLinks: true,
        prependTo:'.mobile-nav'    
    });
    
    $('.above-header-wrapper > div > ul').slicknav({
        label: '',
        duration: 500,
        allowParentLinks: true,
        prependTo:'body'    
    });
}

function heroSlider() {
        if ($('.hero-slides').length) {
            /*
        $('.hero-banner__container').append('<div class="hero-slides__nav"></div>');
        console.log('hero slide test');*/
            $(".hero-slides").heroSlides({
                auto: true, // Boolean: Animate automatically, true or false
                speed: 500, // Integer: Speed of the transition, in milliseconds
                timeout: 4000, // Integer: Time between slide transitions, in milliseconds
                pager: true, // Boolean: Show pager, true or false
                nav: true, // Boolean: Show navigation, true or false
                random: false, // Boolean: Randomize the order of the slides, true or false
                pause: false, // Boolean: Pause on hover, true or false
                pauseControls: true, // Boolean: Pause when hovering controls, true or false
                prevText: "", // String: Text for the "previous" button
                nextText: "", // String: Text for the "next" button
                maxwidth: "", // Integer: Max-width of the slideshow, in pixels
                navContainer: "", // Selector: Where controls should be appended to, default is after the 'ul'
                manualControls: "", // Selector: Declare custom pager navigation
                namespace: "hero-slides", // String: Change the default namespace used
                before: function() {}, // Function: Before callback
                after: function() {} // Function: After callback
            });
            // prev/next links
            var previous = $('.hero-banner a.prev'),
                next = $('.hero-banner a.next');
            //previous.wrap('<li class="hero--prev"></li>');
            //next.wrap('<li class="hero--next"></li>');
            //$('.hero--prev').prependTo('.hero-slides_tabs');
            //$('.hero--next').appendTo('.hero-slides_tabs');
        }
            
            // add alt text from slides to pager nav
            var i=0;
            var tabText = $.map($('.hero-slides li img'), function(el) {return el.getAttribute('alt');}); 
            $('.hero-slides_tabs a[class^="hero-slides1_"]').each(function(){
             $(this).text(tabText[i]);
             i++;
            });
}

function sliderScroll() {   //.js-scroll
    if ($('.js-scroll').length) {
        WinW = viewportWidth();
        var myslider = $('.js-scroll').bxSlider({
                            slideWidth: 5000,
                            minSlides: 4,
                            maxSlides: 4,
                            slideMargin: 10,
                            pager: false
                        });
                        
        function checkMq() {
            if (WinW <= 749) {
                myslider.reloadSlider({
                    slideWidth: 5000,
                    minSlides: 1,
                    maxSlides: 1,
                    slideMargin: 10,
                    pager: false
                });
            }
            if (WinW >= 750) {
                myslider.reloadSlider({
                    slideWidth: 5000,
                    minSlides: 4,
                    maxSlides: 4,
                    slideMargin: 10,
                    pager: false
                });
            }
        }
        
        $(function () {
            // the call to checkMq here will execute after the document has loaded
            checkMq();
            $(window).resize(function () {
                // the call to checkMq here will execute every time the window is resized
                checkMq();
            });
        });
    }
}

function scrolled() {
    $(window).scroll(function() {    
        var element = $('.scroll:not(.scroll--scrolled)');
        var scroll = $(window).scrollTop();
        var topofDiv = $(element).offset().top;
        var height = $(element).outerHeight();

        if (scroll  > (topofDiv + height) && !element.hasClass('header--scroll')) {
            $('.scroll').addClass('scroll--scrolled');
        } else {
            $('.scroll').removeClass('scroll--scrolled');
        }
    });
}