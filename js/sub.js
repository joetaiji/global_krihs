/*-------------------------------------------------
title       : 메인
Author      : 플랜아이 광주
Create date : 2020-03-06
-------------------------------------------------*/

$(function()
{
    // snb 3차 메뉴 가지고 있는 li에 클래스 추가
    $('#snb .list > ul > li').each(function(i)
    {
        if ( $(this).find('ul').length > 0 )
        {
            $(this).addClass('type1');
        }
    });
    
    // snb 3차 메뉴 펼치기
    $('#snb > .list > ul > li > a').on('click', function()
    {
        if ( $(this).next('ul').length > 0 )
        {
            if ( $(this).parent('li').hasClass('active') == false )
            {
                $(this).parent('li').addClass('active');
            }
            else
            {
                $(this).parent('li').removeClass('active');
            }

            return false;
        }
    });

    // 탭메뉴(4차) 반응형일 때
    $('.depth4_tab').classtoggle
    ({
        'button'            : '.active a',  // 이벤트 받을 타겟 선택
        'respond'           : true          // 반응형일 때 (true 시 반응형일때 가로 사이즈 이하에서만 / click 일때만)
    });

    // location 중 list만 메뉴로 사용
    $('.location .list > li').classtoggle
    ({
        'button'        : 'button'   // 이벤트 받을 타겟 선택
    });

    // 공유하기
    $('.share').classtoggle();
});