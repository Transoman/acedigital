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
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
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

  $(window).resize(function() {
    var api = $('.client-modal__content').data('jsp');
    api.reinitialise();
  });

});