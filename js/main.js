$(document).ready(function() {
    onDocReady();
    $(window).resize(function() {
        onWinResize();
    });
    $('.tooltip').tooltip();
    $(".ShipSelect").click(function(){
      $("#ShipSelectFrm").submit();
    });
    $("#ShipRegion").change(function(){
      $("#RegionSelectFrm").submit();
    });
    $(window).load(productCat);
});
// when the document loads...
function onDocReady() {
        verticalNav();
        stackedTables();
        navLevelThree();
        filterPop();
        popUps();
        productCat(); // only called by sub-category view
        productPage(); // only called by product page
        thisYear();
        $('.description__tabs').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    }
    // when the window is resized...

function onWinResize() {
        navLevelThree();
    }
    //for tables classed with .stacked add/remove data attributes to tables cells on mobile screens 

function stackedTables() {
        var headertext = [],
            headers = document.querySelectorAll('.stacked th'),
            tablerows = document.querySelectorAll('.stacked th'),
            tablebody = document.querySelector('.stacked tbody');
        if ($('table.stacked').length) {
            for (var i = 0; i < headers.length; i++) {
                var current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
            }
            for (var i = 0, row; row = tablebody.rows[i]; i++) {
                for (var j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        } else {
            //alert('no stacked tables here');
            return
        }
    }
    // call mobile navigation



function productCat() {

    // alternate product listing views ( grid - list - compact )
    $('.listing-controls__layout a').click(function(e) {
        e.preventDefault();
        $('.listing-controls__layout a').removeClass('active');
        $(this).addClass('active');
        var button = $(this).attr('title'),
            sortArea = $('body').find('.js-sortable');
        // call changeLayout below passing the selected button class
        switch (button) {
            case 'compact':
                changeLayout();
                break;
            case 'grid':
                changeLayout();
                break;
            case 'list':
                changeLayout();
                break;
        }
        // fade out, change class of '.grid__item' boxes to layout style, fade back in
        function changeLayout() {
            $(sortArea).animate({
                opacity: 0
            }, function() {
                $('.grid__item').removeClass('compact grid list');
                $('.grid__item').addClass(button);
                $(sortArea).stop().animate({
                    opacity: 1
                });
            });
        }
    });
}

function productPage() {
    // check for product page before running code
    if ($('.product-details').length) {
        // image zoom 
        $('.js-zoom-show:not(.js-zoom-hide)').click(function() {
            var $section = $('.product__images');
            $section.find('.js-main-image').panzoom({
                $zoomIn: $section.find('.js-zoom-in'),
                $zoomOut: $section.find('.js-zoom-out'),
                $reset: $section.find('.js-reset'),
                //startTransform: 'scale(.9)',
                increment: 0.5,
                minScale: 1,
                contain: 'invert'
            }).panzoom('zoom');
        });
        // zoom tools
        $('.js-zoom-show').click(function() {
            $(this).toggleClass('js-zoom-hide');
            $(this).siblings().fadeToggle('fast', "linear");
            
            if(!$(this).hasClass('js-zoom-hide')) {
                $('.js-main-image').panzoom('reset');  
                $('.js-main-image').panzoom("destroy");
                $('.js-main-image').on('mousewheel.focal', function( e ) {
                    return true;
                });

            } 
            else {
                //mouseWheelZoom();
            }
            
            function mouseWheelZoom() {
                // mousewheel zooming...

                $('.js-main-image').on('mousewheel.focal', function( e ) {
                  e.preventDefault();
                  var delta = e.delta || e.originalEvent.wheelDelta;
                  var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                  $(this).panzoom('zoom', zoomOut, {
                    increment: 0.25,
                    focal: e
                  });
                });
            }

        });
        // image thumbs
        $('.images__thumbs > div').on('click',function() {
            $(this).siblings().removeClass('active');
            $('.js-main-image').panzoom('reset');
            imgLocation = $(this).find('img').attr('src');
            $('.js-main-image').attr('src', imgLocation);
            $(this).addClass('active');
        });
        productMod();
        
        var thumbCount = $('.images__thumbs').children().length;
        //stuff for product page
        if ( thumbCount > 4 ) {
            $('.images__thumbs').bxSlider({
                slideWidth: 65,
                minSlides: 3,
                maxSlides: 4,
                slideMargin: 5,
                pager: false,
                hideControlOnEnd:false,
                infiniteLoop:false
            });
        }
    }
}

function DoVarUpdate() {
    var prodID = $("#ID").val();
    var MyURL = '/skus/?ID=' + prodID + '&CK=' + Math.random() * Math.random();
    var F1 = $("#SF1").val();
    var F2 = $("#SF2").val();
    var F3 = $("#SF3").val();
    var F4 = $("#SF4").val();
    var F5 = $("#SF5").val();
    $.ajax({
        url: MyURL,
        type: 'GET',
        data: {
            F1: F1,
            F2: F2,
            F3: F3,
            F4: F4,
            F5: F5
        },
        cache: false,
        dataType: 'text',
        success: function(data) {
            $("#BuyBoxArea").html(data);
            productMod();
        },
        error: function(response) {}
    });
}
// product mod grid

function productMod() {
    // a modField is an radio, droplist or input of some type
    var modField = $('div[class^="product__mod--"] select').add($('div[class^="product__mod--"] input'))
        // a modOther is out colour swatch style buttons
    modOther = $('div[class^="product__mod--"] li a');
    // when a field is changed or a "modOther" is clicked...    
    $(modField).change(modSelect);
    $(modOther).click(modSelect);
    $('.tooltip').tooltip();
    

    $("#Add2basket").submit(function (event) {

        event.preventDefault();

        $.post( '/Add2Basket/?AJ=T', $('#Add2basket').serialize(), function(data) {
        
                var myarray = data.split("|");
                
                $("#BasketItems").html(myarray[0]);
                $("#BasketTotal").html(myarray[1]);
                $('#add-to-basket').prop('title', myarray[2]);
                
                $('#add-to-basket').tooltip().mouseleave(function (event) { 
                    if ($(this).is(':focus') && $(this).attr('title') != 'Add to Basket') { 
                        var mytitle = $(this).attr('title');
                        event.stopImmediatePropagation();
                        $(this).tooltip().tooltip('open');
                    }
                    }).focusout(function () { 
                        $(this).tooltip().tooltip('close').tooltip('destroy');
                    });
                $('#add-to-basket').tooltip("open");
                $("#BasketItems").fadeOut("fast").delay(25).fadeIn("fast");
                $("#BasketTotal").fadeOut("fast").delay(25).fadeIn("fast");
                 


                setTimeout(function () {
                    $('#add-to-basket').tooltip().tooltip('close');$('#add-to-basket').prop('title', 'Add to Basket');$("#add-to-basket").tooltip().tooltip( "destroy" );
                }, 2500);    

         });
       

    });    


    

    function modSelect() {
        if ($(this).parent().hasClass('active')) {
            return
        } else {
            var FieldName = $(this).attr('name');
            if (this.tagName == 'A') {
                var FieldValue = $(this).attr('data-val');
            } else {
                var FieldValue = $(this).val();
            }
            $("#" + FieldName).val(FieldValue);
            
            var ProdImg = $(this).attr('data-image');
            $('.js-main-image').attr('src', ProdImg);
            DoVarUpdate();
        }
    }
    $('div[class^="product__mod--"] li a').each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();
            modLabel = $(this).attr('title');
            modClass = $(this).closest('div').attr('class');
            if ($(this).parent().hasClass('active')) {
                var FieldName = $(this).attr('name');
                $("#" + FieldName).val('0');
                $(this).parent().removeClass('active');
                DoVarUpdate();
            } else {
                // swap active class to clicked variant
                $(this).parent().siblings('li').removeClass('active');
                $(this).parent().toggleClass('active');
                DoVarUpdate();
            }
        });
    });
    $('input[type=radio]').click(function() {
        if (this.previous) {
            var FieldName = $(this).attr('name');
            $("#" + FieldName).val('');
            this.checked = false;
            DoVarUpdate();
        }
        this.previous = this.checked;
    });
}

// calculate the actual width of the user's viewport -- to match media-queries

function viewportWidth() {
    if (typeof window.innerWidth != 'undefined') {
        return window.innerWidth;
    } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        return document.documentElement.clientWidth;
    } else {
        return viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
    }
}



// build third level of nav to left if no room on viewport to right
function navLevelThree() {
    WinW = viewportWidth();
    $('header nav > ul > li').each(function() {
        var xpos = $(this).offset().left,
            width = $(this).width() * 2,
            lev = $(this).find('> ul > li > ul');
        if (width + xpos > WinW) {
            $(lev).addClass('build-left');
        } else {
            $(lev).removeClass('build-left');
        }
    });
}

function thisYear() {
    var currentYear = new Date().getFullYear();
    $('.js-thisYear').html(currentYear);
}

function verticalNav() {
    $('.nav--main.vertical-list ul').hide();
    
    $('.nav--main.vertical-list > li').each(function() {
        if ( $(this).find('ul').length != 0 ) {
           $(this).prepend('<span class="nav-section"></span>'); 
        }
    });
    
    $('.nav-section').on('click',function(e) {
        $(this).parent('li').find('ul').slideToggle();
        $(this).parent('li').toggleClass('section--expanded');
        e.preventDefault();
    });
}

function filterHide() {
    $('.filters').hide();
    
    $('.filter-toggle').on('click',function() {
        $('.filters').slideToggle();
    });
}

function filterPop() {
    // behaviour dictated by class of .filter--pop
    var filters = $('.filters'),
        WinW = viewportWidth(),
        filterTitle = [];
        
        filters.find('ul li h4').each(function() { filterTitle.push($(this).text()) });
        
    var filterNav = $('<ul class="vertical-list filter__nav" />'); // create UL
    extractResult(filterTitle);   // run function and fill the UL with LI's

    function extractResult(result){     
        $.each(result, function(index, value) {
            // create a LI for each iteration and append to the UL
            $('<li />', {text: value}).appendTo(filterNav);
        });
    }
    
    // if '.filters' a child of '.content' and/or window width less than 850 pixels
    if ( filters.parents('.content').length || WinW < 850 ) {
        // hide
        filters.hide();
        
        // add a show(toggle) button
        $('.listing-controls__layout').append('<span class="filter-toggle button"><span>Filter</span></span>');
        
        // display filters in pop out box on button click
        $('.filter-toggle').on('click',function() {
            filters.addClass('popup').wrap('<div class="pop-wrapper"></div>');
            // draw the close button
            $('.popup').append('<div class="popup--close button">x</div>');
            
            $('.popup--close').on('click',function() {
                $('.filter__nav').add('.popup--close').remove();
                $(filters).unwrap().hide();
                $(this).closest('.pop-wrapper').hide();
            });
            
            // create the nav for the popup
            $(filterNav).insertAfter(filters.find('h2'));
            
            $('.filter__nav li').on('click',function() {
                $(this).siblings().removeClass('active');
                var i = $(this).index(),
                    filterList = $('.filters.popup > ul:last-of-type');
                filterList.children('li').hide();
                filterList.children('li:eq('+i+')').show();
                $(this).addClass('active');                
            });
            
            filters.toggle();
        });
        
    } else {
        filter.show();
    }
    
}

function popUps() {
    var popup = $('.popup');
    
    $('.popup--close').on('click',function() {
        alert('test');
        $(this).parent('.popup').hide();
    });
    
    $(popup).each(function() {
        $(this).hide().append('<span class="popup--close">x</span>').wrap('<div class="pop-wrapper"></div>');
        
        $(this).closest('.pop--show').on('click',function() {
            $(this).show();
        });
    });
    
}


//@prepros-append custom.js


