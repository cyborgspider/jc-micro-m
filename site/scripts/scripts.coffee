$('#main-intro-header').velocity(
  'transition.slideLeftBigIn'
  ,
    duration: 800
    complete: ->
      animateIntroBar()
)

animateIntroBar = ->
  $('#main-intro-bar').velocity(
    'width' : '750px'
  ,
    duration: 400
    easing:   'ease-out'
    complete: ->
      animateIntroSlider()
  )  

animateIntroSlider = ->
  $('#main-intro-slider').velocity 'transition.fadeIn'


#Navigation
links    = $('.main-nav').find('a')

$('.main-nav').on 'click', 'a', (e) ->
  section = $(@).attr('href')
  e.preventDefault()
  $(section).velocity 'scroll'
  links.removeClass 'active'
  $(@).addClass 'active'