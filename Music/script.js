document.addEventListener('DOMContentLoaded', function() {
    const infoContainers = document.querySelectorAll('.info-container');
    
    window.addEventListener('scroll', function() {
        // Get current window width
        const windowWidth = window.innerWidth;
        
        infoContainers.forEach(container => {
            const parentSection = container.closest('.music-section');
            const sectionRect = parentSection.getBoundingClientRect();
            
            // Adjust trigger point based on screen size
            let triggerPoint = 150; // Default for large screens
            
            if (windowWidth <= 992) triggerPoint = 130;
            if (windowWidth <= 768) triggerPoint = 110;
            if (windowWidth <= 576) triggerPoint = 90;
            if (windowWidth <= 400) triggerPoint = 70;
            
            let opacity = 1;
            
            if (sectionRect.top <= triggerPoint) {
                // Adjust scroll calculation for different screen sizes
                let scrollMultiplier = 3; // Default
                if (windowWidth <= 768) scrollMultiplier = 2.5;
                if (windowWidth <= 576) scrollMultiplier = 2;
                
                const scrolledPast = Math.abs(sectionRect.top - triggerPoint) / sectionRect.height;
                // Adjust fade start point for smaller screens
                const fadeStart = windowWidth <= 768 ? 0.15 : 0.1;
                
                opacity = 1 - Math.min(1, (scrolledPast - fadeStart) * scrollMultiplier);
            }
            
            container.style.opacity = Math.max(0, opacity);
        });
    });
});