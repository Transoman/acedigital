jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
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
          $('.rate__list .swiper-pagination').remove();
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

});