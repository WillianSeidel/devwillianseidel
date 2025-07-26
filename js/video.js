document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.video-carrossel');
    if (!carrossel) return;

    const inner = carrossel.querySelector('.carrossel-inner');
    const items = carrossel.querySelectorAll('.carrossel-item');
    const prevBtn = carrossel.querySelector('.prev');
    const nextBtn = carrossel.querySelector('.next');
    
    let currentIndex = 0;
    let itemsPerSlide = calculateItemsPerSlide();
    let itemWidth = items[0].offsetWidth + 24; // largura + gap
    let intervalId;

    function calculateItemsPerSlide() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }

    function updateCarrossel() {
        const offset = -currentIndex * itemWidth;
        inner.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        if (currentIndex < items.length - itemsPerSlide) {
            currentIndex++;
            updateCarrossel();
        }
        resetInterval();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrossel();
        }
        resetInterval();
    }

    function startAutoRotation() {
        intervalId = setInterval(() => {
            if (currentIndex >= items.length - itemsPerSlide) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarrossel();
        }, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startAutoRotation();
    }

    function handleResize() {
        const newItemsPerSlide = calculateItemsPerSlide();
        if (newItemsPerSlide !== itemsPerSlide) {
            itemsPerSlide = newItemsPerSlide;
            itemWidth = items[0].offsetWidth + 24;
            currentIndex = Math.min(currentIndex, items.length - itemsPerSlide);
            updateCarrossel();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pause on hover
    carrossel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carrossel.addEventListener('mouseleave', startAutoRotation);

    // Window resize
    window.addEventListener('resize', handleResize);

    // Initialize
    startAutoRotation();
    updateCarrossel();
});