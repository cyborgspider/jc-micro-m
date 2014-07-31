#Place all functions to init the page inside pageLoad
pageLoad = ->
  #If a user is at the bottom of the page and refreshes, scroll back to the top and start all animations
  #hashId = window.location.hash

  # if hashId != '#home'
  #   $('.nav').find('a[href="'+hashId+'"]').click()
    
  # else
  #   $('html,body').velocity 'scroll'

  # $('body').scrollspy(
  #   target : '#main-nav'
  # )

  animateHeroBG()  
  startSlider($('#intro-slider'))


#Place animations inside functions to call them using Velocity callbacks
animateHeroBG = ->
  $('#home').velocity(
    'backgroundPositionY':'60%'
  ,
    duration: 800
    easing:   'ease-out'
    complete: ->
      animateMainIntroHeader()
  )

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
links = $('.nav').find('a')

$('.nav').on 'click', 'a', (e) ->
  section = $(@).attr('href')
  e.preventDefault()
  $(section).velocity 'scroll'
  window.location.hash = section


#Slider
startSlider = ($container) ->
  $slideIndexContainer = $container.find('.slider-index')
  $slides              = $container.find('.slide')
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
#This didn't work very well. TODO: Make it better, I still prefer over ScrollSpy
#http://imakewebthings.com/jquery-waypoints/#get-started
# $('.section').waypoint
#   handler: ->
#     sectionId = $(@).attr('id')
#     $('#logo').removeClass 'active'
#     links.removeClass 'active'

#     #Find out why I can't use the global variable I set earlier (links)
#     $('nav').find('a[href="#'+sectionId+'"]').addClass('active')
#     window.location.hash = sectionId
  
#   continuous: false


#Page Load (init)
pageLoad()