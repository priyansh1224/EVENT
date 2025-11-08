// Background Slideshow for Home Section
document.addEventListener('DOMContentLoaded', function() {
  const homeSection = document.querySelector('.home');
  
  if (homeSection) {
    const backgrounds = [
      'images/background1.jpg',
      'images/background2.jpeg',
      'images/background3.jpg',
      'images/background4.jpg',
      'images/background.webp'
    ];
    
    let currentIndex = 0;
    
    // Set initial background
    homeSection.style.backgroundImage = `url('${backgrounds[0]}')`;
    homeSection.style.backgroundSize = 'cover';
    homeSection.style.backgroundPosition = 'center';
    homeSection.style.transition = 'background-image 1s ease-in-out';
    
    // Change background every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      homeSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    }, 5000);
  }
});
