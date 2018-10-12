(function () {
    'use strict';
    function Sky(config) {

    }

    Sky.prototype.init = function () {
        this.scrollToc();
    };

    // 保持toc在可视区
    Sky.prototype.scrollToc = function () {
        var $toc = $('#post-toc');

        if ($toc.length) {
            var minScrollTop = $toc.offset().top;

            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();

                if (scrollTop < minScrollTop) {
                    $toc.css({'position': 'absolute'});
                } else {
                    $toc.css({'position': 'fixed'});
                }
            })
        }
    };

    var sky = new Sky();
    sky.init();
})(window);