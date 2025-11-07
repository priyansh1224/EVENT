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
    
    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
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
  const eventType = document.getElementById('event-type');
  const guestCount = document.getElementById('guest-count');
  const guestDisplay = document.getElementById('guest-display');
  const eventDate = document.getElementById('event-date');
  const estimatedCost = document.querySelector('.cost-amount');

  if (eventType && guestCount && guestDisplay && eventDate && estimatedCost) {
    // Update guest count display immediately on any change
    guestCount.addEventListener('input', function() {
      guestDisplay.textContent = this.value;
      updateEstimate();
    });
    
    guestCount.addEventListener('change', function() {
      guestDisplay.textContent = this.value;
      updateEstimate();
    });

    // Update estimate when any input changes
    eventType.addEventListener('change', updateEstimate);
    eventDate.addEventListener('change', updateEstimate);

    function updateEstimate() {
      const basePrices = {
        wedding: 5000,
        corporate: 4000,
        birthday: 3000,
        social: 3500
      };
      
      const guestFactor = guestCount.value / 100;
      const basePrice = basePrices[eventType.value] || 4000;
      
      // Add date premium (20% if within 3 months)
      const today = new Date();
      const selectedDate = new Date(eventDate.value);
      const timeDiff = selectedDate - today;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      
      let datePremium = 1;
      if (daysDiff < 90 && daysDiff > 0) {
        datePremium = 1.2;
      }
      
      // Calculate total estimate
      const totalEstimate = basePrice * guestFactor * datePremium;
      
      // Update display
      estimatedCost.textContent = `$${Math.round(totalEstimate).toLocaleString()}`;
    }

    // Initialize estimate and display
    guestDisplay.textContent = guestCount.value;
    updateEstimate();
  }



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
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });
  }


  // ===== Current Year for Footer =====
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

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