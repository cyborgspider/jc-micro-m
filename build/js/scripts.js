(function() {
  var animateIntroBar, animateIntroSlider, animateMainIntroHeader, links, pageLoad, startSlider;

  pageLoad = function() {
    return $('html,body').velocity('scroll', {
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

  links = $('.main-nav').find('a');

  $('.main-nav').on('click', 'a', function(e) {
    var section;
    section = $(this).attr('href');
    e.preventDefault();
    $(section).velocity('scroll');
    links.removeClass('active');
    return $(this).addClass('active');
  });

  startSlider = function($container) {
    var $slideIndexContainer, $slides, $slidesLength, autoSlide, gotoSlide, i;
    $slideIndexContainer = $container.find('.slider-index');
    $slides = $container.find('p');
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

  $('.section').waypoint(function() {
    var sectionId;
    sectionId = $(this).attr('id');
    $('#logo').removeClass('active');
    links.removeClass('active');
    return $('.main-nav').find('a[href="#' + sectionId + '"]').addClass('active');
  });

  $('#home').waypoint(function() {
    return $('#logo').addClass('active');
  });

  pageLoad();

}).call(this);
