(function() {
  var animateIntroBar, animateIntroSlider, links;

  $('#main-intro-header').velocity('transition.slideLeftBigIn', {
    duration: 800,
    complete: function() {
      return animateIntroBar();
    }
  });

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
    return $('#main-intro-slider').velocity('transition.fadeIn');
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

}).call(this);
