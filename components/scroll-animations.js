// Scroll Animation Script
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes only to key elements (excluding home section)
  const sections = document.querySelectorAll('section:not(.home)');
  
  sections.forEach(section => {
    // Animate section headers only
    const headers = section.querySelectorAll('.section-title, .section-subtitle');
    headers.forEach(header => header.classList.add('animate-on-scroll'));
    
    // Animate boxes and cards
    const boxes = section.querySelectorAll('.box, .blog-card, .team-member');
    boxes.forEach((box, index) => {
      if (index % 2 === 0) {
        box.classList.add('fade-in-left');
      } else {
        box.classList.add('fade-in-right');
      }
    });
  });
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-left, .fade-in-right');
  animatedElements.forEach(el => observer.observe(el));
});
