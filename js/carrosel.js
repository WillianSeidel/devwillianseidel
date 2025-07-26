document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos os carrosséis na página
    document.querySelectorAll('.carrossel-projetos, .carrossel-videos').forEach(initCarrossel);
    
    function initCarrossel(carrossel) {
        const inner = carrossel.querySelector('.carrossel-inner');
        const items = carrossel.querySelectorAll('.carrossel-item');
        const prevBtn = carrossel.querySelector('.prev');
        const nextBtn = carrossel.querySelector('.next');
        const indicatorsContainer = carrossel.querySelector('.carrossel-indicators');
        
        let currentIndex = 0;
        let intervalId;
        const intervalDuration = 5000; // 5 segundos
        
        // Cria indicadores
        items.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carrossel-indicator';
            if (index === currentIndex) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = carrossel.querySelectorAll('.carrossel-indicator');
        
        function updateCarrossel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Atualiza indicadores
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarrossel();
            resetInterval();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarrossel();
            resetInterval();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarrossel();
            resetInterval();
        }
        
        function startAutoRotation() {
            intervalId = setInterval(nextSlide, intervalDuration);
        }
        
        function resetInterval() {
            clearInterval(intervalId);
            startAutoRotation();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carrossel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, {passive: true});
        
        carrossel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (difference > 50) nextSlide(); // Swipe para esquerda
            if (difference < -50) prevSlide(); // Swipe para direita
        }
        
        // Pause on hover
        carrossel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carrossel.addEventListener('mouseleave', startAutoRotation);
        
        // Initialize
        startAutoRotation();
        updateCarrossel();
    }
});