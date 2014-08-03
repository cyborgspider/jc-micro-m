(function() {
  var animateHeroBG, animateIntroBar, animateIntroSlider, animateMainIntroHeader, pageLoad, slideTestimony, startSlider;

  pageLoad = function() {
    var links, questionButton;
    $('body').scrollspy({
      target: '#main-nav'
    });
    $('#home').height($(window).height());
    animateHeroBG();
    slideTestimony();
    $(window).scroll(function() {
      console.log('scrolling');
      if ($(window).scrollTop() > 0) {
        return $('nav').removeClass('top');
      } else {
        return $('nav').addClass('top');
      }
    });
    links = $('.nav').find('a');
    $('.nav').on('click', 'a', function(e) {
      var section;
      section = $(this).attr('href');
      e.preventDefault();
      return $(section).velocity('scroll');
    });
    questionButton = $('.btn-question');
    return questionButton.hover(function() {
      return $(this).text('Contact Us');
    }, function() {
      return $(this).text('Question?');
    }).click(function() {
      return $('#contact').velocity('scroll');
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
