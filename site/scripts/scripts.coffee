#Place all functions to init the page inside pageLoad
pageLoad = ->
  #If a user is at the bottom of the page and refreshes, scroll back to the top and start all animations
  $('html,body').velocity(
    'scroll'
    ,
      complete: ->
        animateMainIntroHeader()
  )

#Place animations inside functions to call them using Velocity callbacks
animateMainIntroHeader = ->
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
  $('#main-intro-slider').velocity(
    'transition.fadeIn'
  ,
    complete: ->
      startSlider($('#main-intro-slider'))
  )


#Handle navigation
links    = $('.main-nav').find('a')

$('.main-nav').on 'click', 'a', (e) ->
  section = $(@).attr('href')
  e.preventDefault()
  $(section).velocity 'scroll'
  links.removeClass 'active'
  $(@).addClass 'active'


#Slider
startSlider = ($container) ->
  $slideIndexContainer = $container.find('.slider-index')
  $slides              = $container.find('p')
  $slidesLength        = $slides.length
  i                    = 1


  gotoSlide = ($slideIndex) ->
    $this       = $(@)
    $slideIndex = $this.index()
    i           = $slideIndex

    $this.addClass 'active'
    $this.siblings().removeClass 'active'

    $slides.removeClass 'active'
    $slides.eq($slideIndex).addClass 'active'


  autoSlide = ->
    #Increment i, the setInterval below will handle "auto" clicking
    if i < $slidesLength
      $slideIndexContainer.find('li:eq('+i+')').click()
      i++ 
    #At the end of the slideshow, reset to the first slide
    else if i = $slidesLength
      i = 0


  $slideIndexContainer.on 'click', 'li', gotoSlide
  setInterval(autoSlide, 3000)

#Waypoints
#http://imakewebthings.com/jquery-waypoints/#get-started
$('.section').waypoint ->
  sectionId = $(@).attr('id')
  $('#logo').removeClass 'active'
  links.removeClass 'active'

  #Find out why I can't use the global variable I set earlier (links)
  $('.main-nav').find('a[href="#'+sectionId+'"]').addClass('active')

$('#home').waypoint ->
  $('#logo').addClass 'active'

#Page Load (init)
pageLoad()