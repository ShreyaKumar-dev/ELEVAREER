const carouselSlide = document.querySelector('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalItems = document.querySelectorAll('.carousel-item').length;

let currentIndex = 0;
let autoSlideTimer;

// Function to update the carousel and active dot
function updateCarousel() {
  // Move the carousel to the current slide
  carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Function to show the next slide
function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}

// Auto-slide the carousel every 250ms plus the transition duration
function startAutoSlide() {
  autoSlideTimer = setInterval(showNextSlide, 3500);  // Adjust the interval to 750ms (250ms display time + 500ms transition)
}

// Initialize the carousel and start auto-sliding
updateCarousel();
startAutoSlide();
