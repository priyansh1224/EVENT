// Main JavaScript File for Celebrazo Events

document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Menu Toggle =====
  const mobileMenu = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.nav');

  if (mobileMenu && nav) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // ===== Sticky Header on Scroll =====
  window.onscroll = () => {
    if (mobileMenu && nav) {
      mobileMenu.classList.remove('active');
      nav.classList.remove('active');
    }

    if (window.scrollY > 60) {
      document.querySelector('.header').classList.add('scrolled');
    } else {
      document.querySelector('.header').classList.remove('scrolled');
    }
  };

  // ===== Home Slider =====
  const homeSlider = new Swiper('.home-slider', {
    effect: 'fade',
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // ===== Review Slider =====
  const reviewSlider = new Swiper('.review-container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // ===== Gallery Filter =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-box');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Initialize lightbox for gallery
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': true
  });

  // ===== Price Calculator =====
  window.updatePriceCalc = function() {
    const calcEventType = document.getElementById('calc-event-type');
    const calcGuestCount = document.getElementById('calc-guest-count');
    const guestDisplay = document.getElementById('guest-display');
    const estimatedCost = document.querySelector('.cost-amount');
    
    if (calcEventType && calcGuestCount && guestDisplay && estimatedCost) {
      const basePrices = { wedding: 50, corporate: 40, birthday: 30, social: 35 };
      const perPersonCost = basePrices[calcEventType.value] || 50;
      const totalEstimate = perPersonCost * parseInt(calcGuestCount.value);
      
      estimatedCost.textContent = `$${totalEstimate.toLocaleString()}`;
      guestDisplay.textContent = calcGuestCount.value;
    }
  };
  
  setTimeout(() => { if (document.getElementById('calc-guest-count')) updatePriceCalc(); }, 100);



  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Form Validation =====
  const contactForm = document.getElementById('event-inquiry');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const eventType = document.getElementById('event-type');
      
      let isValid = true;
      
      // Reset error states
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });
      
      // Validate name
      if (name.value.trim() === '') {
        name.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate phone (simple check)
      if (phone.value.trim() === '') {
        phone.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      // Validate event type
      if (eventType.value === '') {
        eventType.closest('.form-group').classList.add('error');
        isValid = false;
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For demo, we'll just show a success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });
  }

  // ===== Video Review Modal =====
  const videoReview = document.querySelector('.video-review');
  if (videoReview) {
    videoReview.addEventListener('click', function() {
      // In a real implementation, this would open a modal with the video
      alert('This would open a video testimonial in a modal or lightbox.');
    });
  }

  // ===== Current Year for Footer =====
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // ===== Scroll Reveal Animations =====
  // Using Intersection Observer for scroll animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize scroll animations
  animateOnScroll();
});

// Additional helper functions
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}