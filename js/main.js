/*-------------------------------------------------
title       : 메인
Author      : JYC
Create date : 2023-11-27
-------------------------------------------------*/

$(function()
{
    setTimeout(function()
    {
        $('#visual').addClass('active');

    }, 100);

    const notice = new Swiper(".notice .swiper",  {
        slidesPerView: 1,
        direction: "vertical",
        autoplay: {
            delay: 3000,
            //disableOnInteraction: true,
        },
        //spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        /* breakpoints: {
            1400: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        } */
    });

    const nav = ['국토계획 · 지역연구본부', '도시연구본부', '주택 · 부동산연구본부', '국토인프라 · 공간정보연구본부'];
    const webzine = new Swiper(".what_we_do .swiper",  {
        slidesPerView: 1,
        /* autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }, */
        spaceBetween: 40,
        loop: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            dragSize: "100%"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<button class="' + className + '"><span>' + (nav[index]) + '</span></button>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1280: {
                slidesPerView: 2
            }
        }
    });

});