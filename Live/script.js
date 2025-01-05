document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.bg-video');
    const overlay = document.querySelector('.live-overlay');
    let lastScrollTop = 0;
    const fadeStart = 50; // When to start fading (pixels from top)
    const fadeUntil = 400; // When to complete fade (pixels from top)

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate opacity
        let opacity = 1;
        
        if (scrollTop >= fadeStart) {
            opacity = 1 - Math.min((scrollTop - fadeStart) / (fadeUntil - fadeStart), 1);
        }

        // Apply transformations and opacity
        video.style.transform = `translateY(${scrollTop}px)`;
        overlay.style.transform = `translateY(${scrollTop}px)`;
        
        video.style.opacity = opacity;
        overlay.style.opacity = opacity;
        
        lastScrollTop = scrollTop;
    });
});