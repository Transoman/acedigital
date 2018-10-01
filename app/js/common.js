jQuery(document).ready(function($) {

  // Sticky header
  var h = $('.header').innerHeight();

  function stickyHeader() {
    if($(this).scrollTop() > (h/2)) {
      $('.header').addClass('sticky');
    }
    else {
      $('.header').removeClass('sticky');
    }
  }

  stickyHeader();

  $(window).scroll(function() {
    stickyHeader();
  });

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav-list').toggleClass('open');
  });

  // Modal
  $('.modal, .client-modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    },
    onopen: function() {
      $('.client-modal__content').jScrollPane();
      $(window).resize(function() {
        var api = $('.client-modal__content').data('jsp');
        api.reinitialise();
      });
    }
  });

  $('input[name="phone"]').mask('+7 (000) 000-00-00');

  // Parallax
  $('html').mousemove(function(e){
      
      var wx = $(window).width();
      var wy = $(window).height();

      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;

      var newx = x - wx/2;
      var newy = y - wy/2;

      $('img[class*="meteor"]').each(function(){
          var speed = 0.03;
          if($(this).attr('data-revert')) speed *= -1;
          TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
          
      });
      
  });

  $(window).scroll(function(event) {
    var wScroll = $(this).scrollTop();

    $('.rock-1').css({'transform': 'translate(0px, ' + wScroll /15 + '%)'});
    $('.rock-2').css({'transform': 'translate(0px, ' + wScroll /20 + '%)'});
    $('.rock-3').css({'transform': 'translate(0px, ' + wScroll /100 + '%)'});
    $('.rock-4').css({'transform': 'translate(0px, ' + wScroll /100 + '%)'});
    $('.planet-1').css({'transform': 'translate(0px, -' + wScroll /10 + '%)'});
    $('.moon-1').css({'transform': 'translate(0px, -' + wScroll /30 + '%)'});
  });

  $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('.nav-toggle').removeClass('active');
        $('.nav-list').removeClass('open');
        var hOffset =  $('.header').outerHeight();
        console.log(hOffset);
        $('html, body').animate({
          scrollTop: target.offset().top - hOffset
        }, 500, function() {
        });
      }
    }
  });

  var clientsSlider = new Swiper ('.clients-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  var testimonialsSlider = new Swiper ('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  // Rate slider
  const breakpoint = window.matchMedia( '(min-width: 992px)' );
  var rateSlider;

  const breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( rateSlider !== undefined ) {
          $('.rate__list').removeClass('swiper-container').addClass('row');
          $('.rate__item').parent().unwrap('.swiper-wrapper');
          $('.rate__item').parent().removeClass('swiper-slide').addClass('col-lg-4');
          $('.rate__list .swiper-button-prev').remove();
          $('.rate__list .swiper-button-next').remove();
          rateSlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  const enableSwiper = function() {
    $('.rate__list').addClass('swiper-container').removeClass('row');
    if (! $('.rate__list .swiper-wrapper').length ) {
      $('.rate__item').parent().wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.rate__item').parent().addClass('swiper-slide').removeClass('col-lg-4');
    $('.rate__list').append('<div class="swiper-button-prev"><i class="fas fa-angle-left"></i></div>' +
      '<div class="swiper-button-next"><i class="fas fa-angle-right"></i></div>');

    rateSlider = new Swiper ('.rate__list', {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  $('.form__file').change(function(event) {
    var fileName = this.files[0].name;
    $(this).next().find('span').text(fileName);
  });

  /* Валидация телефона */
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $('.rate__item .customer_open').click(function() {
    var title = $(this).parents('.rate__item').find('.rate__title').text();
    $('.customer-form input[name="subject"]').val('Стать клиентом: ' + title);
  });

  $(".customer-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
      email: "Введите Ваш e-mail",
      term: "Это поле обязательное",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = new FormData($('.customer-form').get(0));
      ajaxSend('.customer-form', t);
    }
  });

  $(".form-project__form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
      email: "Введите Ваш e-mail",
      term: "Это поле обязательное",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      // var t = $('.form-project__form').serialize();
      var t = new FormData($('.form-project__form').get(0));
      ajaxSend('.form-project__form', t);
    }
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "/wp-content/themes/acedigital/sendmail.php",
      contentType: false,
      processData: false,
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
          $(formName).find('.form__label--file span').text('Прикрепить файл');
        }, 2000);
      }
    });
  }

});