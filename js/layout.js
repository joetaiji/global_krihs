/*-------------------------------------------------
title       : 레이아웃
Author      : 플랜아이 광주
Create date : 2020-02-14
-------------------------------------------------*/

$(function()
{
    // 사이트바로가기
    $('.hnb1').classtoggle
    ({
        'button'            : '.label',     // 이벤트 받을 타겟 선택
        'respond'           : true,         // 반응형일 때 (true 시 반응형일때 가로 사이즈 이하에서만 / click 일때만)
        'respondWidth'      : '1024',       // 반응형 가로 사이즈
    });

    // 언어
    $('.lang').classtoggle
    ({
        'button'            : '.active'  // 이벤트 받을 타겟 선택
    });

    // 검색어
    $('.search').classtoggle();

    // 주메뉴
    $('#gnb1').gnb1();

    // 전체메뉴이자 모바일 메뉴
    $('#gnb2').gnb2();

    // 퀵메뉴
    $('#quick').classtoggle();

    // 위로가기 활성화
    goTop(".btn_top");
    

    // 관련사이트
    $('.related .group').classtoggle
    ({
        'button'            : '.label'  // 이벤트 받을 타겟 선택
    });
});

/*-------------------------------------------------
title       : 메뉴1
Author      : 플랜아이 광주
Create date : 2020-02-14
-------------------------------------------------*/

$.fn.gnb1 = function( options )
{
    var settings = $.extend
    ({
        'actionType'        : 'mouseenter focusin',     // 메뉴가 동작하는 액션 (mouseenter focusin, click)
        'target'            : '#header, #gnb1',                // 활성화 시 클래스가 추가되는 요소 (공란일 경우 오버되는 a 링크 부모 li에만 클래스 추가됨)        
        'class'             : 'active',                 // 추가할 클래스명 (target에 추가됨)
        'depth2'            : '.submenu',               // 서브메뉴
        'closeBtn'          : '.close'                  // 닫기 버튼이 별도로 존재하는 경우 (닫기 버튼은 클릭시에만)
    }, 
    options );

    return this.each(function()
    {
        var $selecter = $(this);

        $selecter.find('a').on(settings.actionType, function()
        {
            if ( $(this).parent('li').hasClass('active') == false )
            {
                $(this).parent('li').addClass('active');
                $(this).parent('li').siblings('li').removeClass('active');

                $(this).parents('li').addClass('active');
                $(this).parents('li').siblings('li').removeClass('active');

                if (settings.target != '')
                {
                    $(settings.target).addClass(settings.class);
                }
            }

            if ( settings.actionType == 'click' )
            {
                if ( $(this).next('*').length > 0 )
                {
                    return false;
                }
            }
        });

        if ($selecter.find(settings.closeBtn).length == 1)
        {
            $selecter.find(settings.closeBtn).on('click', function()
            {
                $selecter.find('li').removeClass(settings.class);
                $(settings.target).removeClass(settings.class);

                return false;
            });
        }
        else
        {
            // 마우스 아웃
            $(document).on('mousemove', function(e)
            {
                cursorY = e.pageY;

                if ( $selecter.find('li.active').length > 0 )
                {
                    if (cursorY > parseInt($selecter.find(settings.depth2).offset().top + $selecter.find('.active').find(settings.depth2).height()) )
                    {
                        setTimeout(function()
                        {
                            $selecter.find('li').removeClass(settings.class);
                            $(settings.target).removeClass(settings.class);

                        }, 200);
                    }
                }
            });
        }

        // 탭 아웃
        $selecter.find('a:last').keydown(function(e) 
        {
            if(e.keyCode === 9) 
            {
                $selecter.find('li').removeClass(settings.class);
                $(settings.target).removeClass(settings.class);
            }
        });

        // 역탭 아웃
        $selecter.find('a:first').keydown(function(e) 
        {
            if(e.keyCode === 9 && e.shiftKey) 
            {
                $selecter.find('li').removeClass(settings.class);
                $selecter.removeClass(settings.classname);
            }
        });
    });
};

/*-------------------------------------------------
title       : 메뉴2
Author      : 플랜아이 광주
Create date : 2020-02-14
-------------------------------------------------*/

$.fn.gnb2 = function( options )
{
    var settings = $.extend
    ({
        'btnOpen'           : '.open',      // 최초 메뉴를 여는 버튼
        'btnClose'          : '.close',     // 닫기 버튼이 별도로 존재하는 경우
        'classAdd'          : '#gnb2',      // 활성화 시 클래스가 추가되는 요소
        'className'         : 'active',     // 추가할 클래스명 (classAdd에 추가됨)
        'siblings'			: true,		    // active 될 때 형제요소의 반응 여부
        'responsive'        : true,         // 반응형일 때 (true 시 반응형일때 가로 사이즈 이하에서만 / false 시 반응형 아닐 때도 클릭 동작함)
        'responsiveWidth'   : '1024'        // 반응형 가로 사이즈
    }, 
    options );

    return this.each(function()
    {
        var $selecter = $(this);

        // 열기
        $selecter.find(settings.btnOpen).on('click', function()
        {
            if ( $selecter.find(settings.btnClose).length > 0 )
            {            
                $(settings.classAdd).addClass(settings.className);
            }
            else
            {
                if ( $(settings.classAdd).hasClass(settings.className) == false )
                {
                    $(settings.classAdd).addClass(settings.className);
                }
                else
                {
                    $(settings.classAdd).removeClass(settings.className);
                }
            }

            return false;
        });
        
        // 닫기
        if ( $selecter.find(settings.btnClose).length > 0 )
        {
            $selecter.find(settings.btnClose).on('click', function()
            {
                $(settings.classAdd).removeClass(settings.className);

                return false;
            });
        };

        // 메뉴 클릭 이벤트
        function menuAction($this)
        {
            if ( $this.next('*').length > 0 && $this.next('*').css('display') != 'none' )
            {
                if ( $this.parent('li').hasClass('active') == false )
                {
                    $this.parent('li').addClass('active');

                    if ( settings.siblings == true )
                    {
                        $this.parent('li').siblings('li').removeClass('active');
                    }
                }
                else
                {
                    $this.parent('li').removeClass('active');
                }

                event.preventDefault();
            }      
        }

        // 메뉴
        $selecter.find('li a').on('click', function(e)
        {
            if ( settings.responsive == true )
            {
                if ( $(window).width() <= settings.responsiveWidth )
                {
                    menuAction($(this));
                }
            }
            else
            {
                menuAction($(this));
            }
        });
    });
};

/*-------------------------------------------------
title       : 클래스를 넣고 빼고
Author      : 플랜아이 광주
Create date : 2020-02-14
-------------------------------------------------*/

$.fn.classtoggle = function( options )
{
    var settings = $.extend
    ({
        'button'            : '.open',      // 이벤트 받을 타겟 선택
        'action'            : 'click',      // 액션 선택 (click | over)
        'classname'         : 'active',     // 추가할 클래스명
        'accordion'			: false,		// active 될 때 형제요소의 반응 여부
        'respond'           : false,        // 반응형일 때 (true 시 반응형일때 가로 사이즈 이하에서만 / click 일때만)
        'respondWidth'      : '768',        // 반응형 가로 사이즈
        'close'             : '.close'      // 닫기 버튼이 별도로 존재하는 경우 (닫기 버튼은 클릭시에만)
    }, 
    options );

    return this.each(function()
    {
        var $selecter = $(this);

        function clickActive()
        {
            if ( $selecter.hasClass(settings.classname) == false )
            {
                $selecter.addClass(settings.classname);

                if (settings.accordion == true)
                {
                    $selecter.siblings().removeClass(settings.classname);
                }
            }
            else
            {
                // 닫기 버튼 존재할 경우 토글되지 않음
                if ( $selecter.find(settings.close).length == 0 )
                {
                    $selecter.removeClass(settings.classname);
                }
            }
        }

        if ( settings.action == 'click' )
        {
            $selecter.find(settings.button).on(settings.action, function()
            {
                if ( settings.respond == false )
                {
                    clickActive();

                    return false;
                }
                else
                {
                    if ( $(window).width() <= settings.respondWidth )
                    {
                        clickActive();

                        return false;
                    }
                    else
                    {
                        $selecter.find(settings.button).off();
                    }
                }
            });
        }
        else
        {
            $selecter.find(settings.button).on
            ({
                mouseenter  : function()
                {
                    $selecter.addClass(settings.classname);
                },
                focusin     : function()
                {
                    $selecter.addClass(settings.classname);
                },
                mouseleave  : function()
                {
                    $selecter.removeClass(settings.classname);
                },
                focusout    : function()
                {
                    $selecter.removeClass(settings.classname);
                }
            });
        }

        // 닫기 버튼이 별도로 존재하는 경우
        if ( $selecter.find(settings.close).length > 0 )
        {
            $selecter.find(settings.close).on('click', function()
            {
                $selecter.removeClass(settings.classname);

                return false;
            });
        }
        else
        {
            // 탭 아웃
            $selecter.find('a:last').keydown(function(e) 
            {
                if(e.keyCode === 9) 
                {
                    $selecter.removeClass(settings.classname);
                }
            });

            // 역탭 아웃
            $selecter.find('a:first').keydown(function(e) 
            {
                if(e.keyCode === 9 && e.shiftKey) 
                {
                    $selecter.removeClass(settings.classname);
                }
            });
        }
    });
};