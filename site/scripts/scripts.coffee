#Place all functions to init the page inside pageLoad
pageLoad = ->
  #If a user is at the bottom of the page and refreshes, scroll back to the top and start all animations
  #hashId = window.location.hash

  # if hashId != '#home'
  #   $('.nav').find('a[href="'+hashId+'"]').click()
    
  # else
  #   $('html,body').velocity 'scroll'

  $('body').scrollspy(
    target : '#main-nav'
  )
  
  $('#home').height($(window).height())
  animateHeroBG()  
  slideTestimony()


  #Check scroll positioning, move the navigation bar if not at the top
  $(window).scroll ->
    console.log 'scrolling'
    if $(window).scrollTop() > 0
      $('nav').removeClass 'top'
    else
      $('nav').addClass 'top'

  #Handle navigation
  links = $('.nav').find('a')

  $('.nav').on 'click', 'a', (e) ->
    section = $(@).attr('href')
    e.preventDefault()
    $(section).velocity 'scroll'
    #window.location.hash = section

  #Contact Buttons 
  questionButton = $('.btn-question')

  questionButton.hover(->
    $(@).text 'Contact Us'
  , ->
    $(@).text 'Question?'
  ).click ->
    $('#contact').velocity 'scroll'      

#Testimony Transitions
slideTestimony = () ->
  $container    = $('.quote-slider')
  $quoteArrow   = $container.find('.quote-arrow')
  $quotes       = $container.find('.quote')
  $quotesLength = $quotes.length
  i             = 0

  gotoQuote = (direction) ->
    if direction is 'forward'
      i++
      if i == $quotes.length
        i = 0
    if direction is 'back'
      i--
      if i < 0
        i = $quotes.length-1

    $quotes.removeClass 'active'
    $quotes.eq(i).addClass 'active'

  autoSlide = ->
    if i <= $quotes.length
      gotoQuote('forward')

  $quoteArrow.on 'click', ->
    direction = $(@).data('direction')
    #clearInterval(timer)
    #timer = setInterval(autoSlide, 3000)

    if direction is 'forward'
      gotoQuote('forward')
    else 
      gotoQuote('back')

  timer = setInterval(autoSlide, 3000)

#Place animations inside functions to call them using Velocity callbacks
animateHeroBG = ->
  $('#home').velocity(
    'opacity':'1'
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