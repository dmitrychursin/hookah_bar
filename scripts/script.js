$(document).ready(function () {


    $('.header__burger').click(() => {
        $("html,body").css("overflow", "hidden");
    });

    $('.menu__close').click(() => {
        $("html,body").css("overflow", "auto");
    });

    $('.menu-link').click(() => {
        $("html,body").css("overflow", "auto");
    });

    $('.slider').slick({
        dots: false,
        arrows: true,
        slidesToShow: 3,
        dotsClass: 'slick-dots',
        appendArrows: '.slider-arrows',
        prevArrow: '<img class="slider-arrow-1" src="../images/prev.png">',
        nextArrow: '<img class="slider-arrow-2" src="../images/next.png">',
        adaptiveHeight: true,
        responsive: [
            {

                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                }
            }
        ]
    });
    $('.stocks-list').slick({
        dots: false,
        arrows: false,
        slidesToShow: 3,
        infinite: false,
        dotsClass: 'slick-dots',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $(window).on('load resize', function () {
        if ($(window).width() < 730) {
            $('.gallery-images:not(.slick-initialized)').slick({
                arrows: false,
                dots: true,
                infinite: false,
                slidesToShow: 1,
                dotsClass: 'slick-dots',
            });
        } else {
            $(".gallery-images.slick-initialized").slick("unslick");
        }
    });

    $('.main-btn').click(() => {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    });

    $('.footer-btn').click(() => {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    });

    const name = $('.name');
    const phone = $('.phone-main');
    const btn = $('.order-btn');
    const orderForm = $('.order-form');
    const loader = $('.loader');
    const orderInfo = $('.order-info-form');
    const borderRed = $('.order-input');


    btn.click(function () {
        borderRed.each(function () {
            if (this.value.trim().length === 0)
                $(this).css('border-color', 'red');
            else
                $(this).css('border-color', '');
        });
    });


    btn.click(function () {
        let hasError = false;
        $('.error-input').hide();

        if (!name.val()) {
            name.next().show();
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
        }
        if (!hasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: " https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        orderForm.hide();
                        orderInfo.css('display', 'flex');
                    } else {
                        alert("Возникла ошибка при бронирования столика, позвоните нам и сделайте заказ");
                    }
                });
        }

    });


    phone.bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('.gallery-images-1').magnificPopup({
        type: 'image'
    });

    $('.gallery-images-2').magnificPopup({
        type: 'image'
    });
    $('.gallery-images-3').magnificPopup({
        type: 'image'
    });
    $('.gallery-images-4').magnificPopup({
        type: 'image'
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();

// Плавный скрол
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1500, function () {
                window.location.hash = hash;
            });
        }
    });


    $('.menu-link-products').click(function (e) {
        e.preventDefault();
        const dataMenu = $(e.target).data('menu');
        const menuItem = $(`#${dataMenu}`);
        $('.triggers').css("display", "none");
        menuItem.css("display", "flex")
    });

    $(function () {
        $('.menu-link-products').click(function () {
            $('.menu-item-products .active').removeClass('active'); // remove the class from the currently selected
            $(this).addClass('active'); // add the class to the newly clicked link
        });
    });


    $('body').append('<div class="upbtn"></div>');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.upbtn').css({
                bottom: '15px'
            });
        } else {
            $('.upbtn').css({
                bottom: '-80px'
            });
        }
    });
    $('.upbtn').on('click',function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});