(function ($) {

    'use strict';

    // Extend jQuery easings with easeOutCubic
    $.easing = Object.assign({}, $.easing, {
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
    }) 

    // $(document).bind('mousewheel', function (e) {
    //     const nt = $(document.body).scrollTop() - (e.deltaY * e.deltaFactor * 100);
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(document.body).stop().animate({
    //         scrollTop: nt
    //     }, 500, 'easeInOutCubic');
    // });

    function initMobMenu() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('.header .navigation__sub').prependTo('.mobile__navi .top-nav');
            $('.mobile__navi .icon-svg-question').remove();
            $('.mobile__navi .btn__bordered').insertBefore('.mobile__navi .lang-menu');
            $('.header .navigation').appendTo('.mobile__navi .navi-wrapper');
            $('.section__footer-contacts > .col').clone().appendTo('.mobile__navi .contacts-wrapper').wrapAll('<div class="block__contacts" />');
            // $('.mobile__navi .contacts-wrapper > .col').appendTo('.mobile__navi .section__footer-contacts');
            $('.section__trigger .reception-girl').wrap('<div class="reception-girl__wrapper" />');
            $('.section__footer-contacts').prependTo('.section__footer-copyright .copyright');
        }
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('.arrow-wrapper .icon-svg-btn-arrow-right').clone().appendTo('.arrow-wrapper');
        }
    }

    $(document).ready(function () {

        initMobMenu();

        $(window).bind('resize orientationchange', function () {
            initMobMenu();
            window.location.reload();
        });

        $('.btn__hamburger').on('click', function () {
            $('html').addClass('no-scroll');
            $('.mobile__navi').addClass('shown scroll-on');
        });

        $('.mobile__navi .btn__close').on('click', function () {
            $('html').removeClass('no-scroll');
            $('.mobile__navi').removeClass('shown scroll-on');
        });

        if ($('.navigation>ul>li').has('ul')) {
            $('.navigation>ul>li>ul').addClass('dropdown');
        }

        const dropdown = $('.navigation .dropdown');
        const dropdownLiA = dropdown.find('li>a');
        dropdown.each(function () {
            if (window.matchMedia('(min-width: 992px)').matches) {
                $(this).css('width', $(this).width() + 3);
            }
            $(this).parent('li').addClass('dropdown-container');
        });

        $('.mobile__navi .dropdown-container').each(function () {
            $(this).prepend('<button class="btn btn__dropdown"></button>');
        });

        $('.btn__dropdown').click(function () {
            $('.btn__dropdown').not(this).each(function () {
                $(this).removeClass('shown').parent().removeClass('shown').find('.dropdown').slideUp(500, 'easeInOutQuart');
            });
            $(this).toggleClass('shown').parent().toggleClass('shown').find('.dropdown').slideToggle(500, 'easeInOutQuart');
        });

        let maxWidth = 0;
        let widestA = null;
        let currentA;
        dropdownLiA.each(function () {
            currentA = $(this).parent();
            if (currentA.width() > maxWidth) {
                maxWidth = currentA.width();
                widestA = currentA;
                currentA.addClass('overflow');
            } else {
                currentA.removeClass('overflow');
            }
        });

        $('.header .navigation .dropdown-container').on('mouseover', function () {
            $(this).addClass('shown');
        }).on('mouseout', function () {
            $(this).removeClass('shown');
        });
        
        $('.accordion__title').on('click', function () {
            if ($('.accordion__wrapper').hasClass('one')) {
                $('.accordion__title').not($(this)).removeClass('active');
                $('.accordion__text').not($(this).next()).slideUp(350);
            }
            $(this).toggleClass('active').next().slideToggle(350);
        });

        $('.pagination>.pagination__list>li>a').each(function () { 
            if ($(this).is('active')) {
                $(this).removeAttr('href');
            }
        });


        const header = $('#main-header');
        let lastScrollTop = 0;

        $(window).on('scroll', function () {
            const scrollTop = $(this).scrollTop();

            if (scrollTop > lastScrollTop) {
                // Скроллируем вниз
                header.addClass('scroll-down').removeClass('scroll-up');
            } else {
                // Скроллируем вверх
                header.removeClass('scroll-down').addClass('scroll-up');
            }

            if ($('body').hasClass('homepage') && scrollTop >= 20) {
                $('body').addClass('scrolled');
            } else {
                $('body').removeClass('scrolled');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Не даем значению быть отрицательным
        });

        const modal = $('#myModal');
        const closeModalBtn = $('#closeModal');
        const modalForm = $('#myForm');
        const toggleMenuBtn = $('#toggle-menu');
        const navigation = $('.navigation');

        toggleMenuBtn.on('click', function () {
            navigation.toggleClass('active');
        });

        $('#modal-btn').on('click', function () {
            modal.addClass('opened');
            $('body').css('overflow', 'hidden');
        });

        closeModalBtn.on('click', function () {
            modal.removeClass('opened');
            $('body').css('overflow', 'auto');
        });

        $(window).on('click', function (event) {
            if (event.target === modal[0]) {
            modal.removeClass('opened');
            $('body').css('overflow', 'auto');
            }
        });

        $(document).on('keydown', function (event) {
            if (event.key === 'Escape' && modal.hasClass('opened')) {
                modal.removeClass('opened');
                $('body').css('overflow', 'auto');
            }
        });

        // $('#phone').inputmask('+7 (999) 999-99-99');

        modalForm.on('submit', function (event) {
            event.preventDefault();
            // Добавьте здесь код для обработки отправки формы
        });

    });

})(jQuery);