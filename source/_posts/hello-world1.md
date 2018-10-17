---
title: Hello World
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).
<!-- more -->
## Quick Start
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="div" id="div">some</div>
<div class="div" id="div">123</div>
</body>
<script>
    var str = '[{"type":"MT300","userId":8,"e164":"44448892","locations":["[[113.934382,22.580613,1.539239275997E12,2.0,40.0]]"],"id":6,"address":"中国广东省深圳市南山区边检路","deviceType":null}]';
    // console.log(str.parseJSON());
    var userInfo = JSON.parse(str).length > 0 ? JSON.parse(str)[0] : null;
    var locations = userInfo ? JSON.parse(userInfo.locations) : null

    console.log(locations);
    console.log(userInfo.type);
</script>
</html>
```

```css
.div {
  color: #333;
  font: 12px;
}

#div {
  color: #444;
  font: 13px;
}
```

```scss
$color: #123456;

.header {
  position: relative;
  background: $header-background;
  padding: $header-padding;
  box-shadow: $header-shadow;
  font-family: $global-Lato-font-family;
  .header-inner {
    width: $container-main-width;
    margin: 0 auto;
    .header-nav-link {
      display: inline-block;
      line-height: 50px;
      padding: 0 15px;
      font-size: 15px;
      color: $white;
      opacity: 0.7;
      transition: .2s;
      &:hover {
        color: $theme-color-hover;
        opacity: 1;
      }
    }
  }
}
```

```javascript
(function () {
    'use strict';

    function Sky(config) {

    }

    Sky.prototype.init = function () {
        this.tocFixed();
        this.tocActive();
        this.backToTop();
    };

    // make toc stay in the visible area
    Sky.prototype.tocFixed = function () {
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
            });
        }
    };

    // current toc follows the content when scrolling
    Sky.prototype.tocActive = function () {
        var HEADER_OFFSET = 30;
        var $toclink = $('.toc-link');
        var $headerlink = $('.headerlink');

        var headerlinkTop = $.map($headerlink, function (link) {
            return $(link).offset().top;
        });
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            for (var i = 0; i < $toclink.length; i++) {
                var currentHeaderTop = headerlinkTop[i] - HEADER_OFFSET,
                    nextHeaderTop = i + 1 === $toclink.length ? Infinity : headerlinkTop[i + 1] - HEADER_OFFSET;

                if (currentHeaderTop < scrollTop && scrollTop <= nextHeaderTop) {
                    $($toclink[i]).addClass('active');
                } else {
                    $($toclink[i]).removeClass('active');
                }
            }
        });
    };

    // back to top
    Sky.prototype.backToTop = function (val1, val2) {
        var $backToTop = $('#back-to-top');

        $backToTop.click(function () {
            console.log('click');
            $('html,body').animate({ scrollTop: 0 });
        });
    };

    var sky = new Sky();
    sky.init();
})(window);
```
