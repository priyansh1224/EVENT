// Initialize Swiper for review section
const reviewSwiper = new Swiper('.review-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  loopAdditionalSlides: 2,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
});
