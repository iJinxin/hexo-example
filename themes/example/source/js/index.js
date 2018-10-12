(function () {
    'use strict';
    function Sky(config) {
        this.config = config;
    }

    Sky.prototype.init = function () {
        this.scrollToc();
    };

    // 保持toc在可视区
    Sky.prototype.scrollToc = function () {
        var $toc = $('#post-toc');

        if ($toc.length) {
            console.log($toc.offset().top);
            console.log($(window).scrollTop());
            var minScrollTop = $toc.offset().top;

            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                console.log(scrollTop);
                console.log(minScrollTop);
                if (scrollTop < minScrollTop) {
                    $toc.css({
                        'position': 'absolute',
                    });
                } else {
                    $toc.css({
                        'position': 'fixed',
                    });
                }
            })
        }
    };

    var sky = new Sky(window.config);
    sky.init();
})(window);