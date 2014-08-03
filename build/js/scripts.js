(function() {
  var $win, animateHeroBG, animateIntroBar, animateIntroSlider, animateMainIntroHeader, checkTop, contactButtonLoader, navHandler, pageLoad, sectionSizer, slideTestimony, startSlider, winHeight, winWidth;

  $win = $(window);

  winHeight = $win.height();

  winWidth = $win.width();

  pageLoad = function() {
    $('html,body').velocity('scroll');
    sectionSizer();
    animateHeroBG();
    slideTestimony();
    checkTop();
    navHandler();
    return contactButtonLoader();
  };

  $win.resize(function() {
    if ($win.width() === winWidth) {
      return sectionSizer();
    }
  });

  contactButtonLoader = function() {
    var questionButton;
    questionButton = $('.btn-question');
    return questionButton.hover(function() {
      return $(this).text('Contact Us');
    }, function() {
      return $(this).text('Question?');
    }).click(function() {
      return $('#contact').velocity('scroll');
    });
  };

  checkTop = function() {
    return $win.scroll(function() {
      if ($win.scrollTop() > 0) {
        return $('nav').removeClass('top');
      } else {
        return $('nav').addClass('top');
      }
    });
  };

  navHandler = function() {
    var links;
    $('body').scrollspy({
      target: '#main-nav'
    });
    links = $('nav').find('a');
    return $('nav').on('click', 'a', function(e) {
      var section;
      section = $(this).attr('href');
      e.preventDefault();
      return $(section).velocity('scroll');
    });
  };

  sectionSizer = function() {
    winHeight = $win.height();
    return $('.section').each(function() {
      var $section, $sectionChildren, $subSectionHeight;
      $section = $(this);
      $sectionChildren = $section.children('.section-child');
      if ($sectionChildren.length) {
        $subSectionHeight = winHeight / $section.children('.section-child').length;
        return $sectionChildren.height($subSectionHeight);
      } else if ($section.hasClass('section-half')) {
        return $section.height(winHeight / 2);
      } else {
        return $section.height(winHeight);
      }
    });
  };

  slideTestimony = function() {
    var $container, $quoteArrow, $quotes, $quotesLength, autoSlide, gotoQuote, i, timer;
    $container = $('.quote-slider');
    $quoteArrow = $container.find('.quote-arrow');
    $quotes = $container.find('.quote');
    $quotesLength = $quotes.length;
    i = 0;
    gotoQuote = function(direction) {
      if (direction === 'forward') {
        i++;
        if (i === $quotes.length) {
          i = 0;
        }
      }
      if (direction === 'back') {
        i--;
        if (i < 0) {
          i = $quotes.length - 1;
        }
      }
      $quotes.removeClass('active');
      return $quotes.eq(i).addClass('active');
    };
    autoSlide = function() {
      if (i <= $quotes.length) {
        return gotoQuote('forward');
      }
    };
    $quoteArrow.on('click', function() {
      var direction;
      direction = $(this).data('direction');
      if (direction === 'forward') {
        return gotoQuote('forward');
      } else {
        return gotoQuote('back');
      }
    });
    return timer = setInterval(autoSlide, 3000);
  };

  animateHeroBG = function() {
    return $('#home').velocity({
      'opacity': '1'
    }, {
      duration: 800,
      easing: 'ease-out',
      complete: function() {
        return animateMainIntroHeader();
      }
    });
  };

  animateMainIntroHeader = function() {
    return $('#main-intro-header').velocity('transition.slideLeftBigIn', {
      duration: 800,
      complete: function() {
        return animateIntroBar();
      }
    });
  };

  animateIntroBar = function() {
    return $('#main-intro-bar').velocity({
      'width': '750px'
    }, {
      duration: 400,
      easing: 'ease-out',
      complete: function() {
        return animateIntroSlider();
      }
    });
  };

  animateIntroSlider = function() {
    return $('#main-intro-slider').velocity('transition.fadeIn', {
      complete: function() {
        return startSlider($('#main-intro-slider'));
      }
    });
  };

  startSlider = function($container) {
    var $slideIndexContainer, $slides, $slidesLength, autoSlide, gotoSlide, i;
    $slideIndexContainer = $container.find('.slider-index');
    $slides = $container.find('.slide');
    $slidesLength = $slides.length;
    i = 1;
    gotoSlide = function($slideIndex) {
      var $this;
      $this = $(this);
      $slideIndex = $this.index();
      i = $slideIndex;
      $this.addClass('active');
      $this.siblings().removeClass('active');
      $slides.removeClass('active');
      return $slides.eq($slideIndex).addClass('active');
    };
    autoSlide = function() {
      if (i < $slidesLength) {
        $slideIndexContainer.find('li:eq(' + i + ')').click();
        return i++;
      } else if (i = $slidesLength) {
        return i = 0;
      }
    };
    $slideIndexContainer.on('click', 'li', gotoSlide);
    return setInterval(autoSlide, 3000);
  };

  pageLoad();

}).call(this);
