// document.addEventListener('DOMContentLoaded', () => {
//     const videoSections = document.querySelectorAll('.video-section');
//     const videos = document.querySelectorAll('.parallax-video');
//     const sections = document.querySelectorAll('.section');
//     const loadingIndicator = document.querySelector('.loading');
    
//     let lastScrollY = window.pageYOffset;
//     let ticking = false;
//     let animationFrameId = null;
//     let videosReady = 0;
//     const totalVideos = videos.length;

//     // Smooth scroll configuration
//     const smoothScroll = {
//         factor: 0.1,
//         lerp: (start, end, factor) => start + (end - start) * factor,
//         targetY: lastScrollY,
        
//         update() {
//             lastScrollY = this.lerp(lastScrollY, this.targetY, this.factor);
//             return Math.abs(this.targetY - lastScrollY) > 0.1;
//         }
//     };

//     // Utility functions
//     const debounce = (func, wait) => {
//         let timeout;
//         return function(...args) {
//             clearTimeout(timeout);
//             timeout = setTimeout(() => func.apply(this, args), wait);
//         };
//     };

//     // Section observer
//     const sectionObserver = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('active');
//             } else {
//                 entry.target.classList.remove('active');
//             }
//         });
//     }, {
//         threshold: 0.5
//     });

//     sections.forEach(section => sectionObserver.observe(section));

//     // Video section visibility handler
//     const handleVideoSectionVisibility = () => {
//         const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
//         const totalSections = videoSections.length;
//         const currentSectionIndex = Math.floor(scrollPercent * totalSections);
        
//         videoSections.forEach((section, index) => {
//             const videoContainer = section.querySelector('.video-container');
//             if (index === currentSectionIndex) {
//                 videoContainer.classList.add('active');
//             } else {
//                 videoContainer.classList.remove('active');
//             }
//         });
//     };

//     // Animation function
//     const animate = () => {
//         if (smoothScroll.update()) {
//             const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//             const totalSections = videoSections.length;
//             const sectionHeight = scrollHeight / totalSections;
    
//             videoSections.forEach((section, index) => {
//                 const video = section.querySelector('video');
//                 if (video.readyState > 3) {  // Ensure the video is ready to play
//                     const sectionScrollStart = sectionHeight * index;
//                     const sectionScrollEnd = sectionHeight * (index + 1);
//                     const sectionScrollPercent = (lastScrollY - sectionScrollStart) / (sectionScrollEnd - sectionScrollStart);
    
//                     if (sectionScrollPercent >= 0 && sectionScrollPercent <= 1 && video.duration) {
//                         video.currentTime = sectionScrollPercent * video.duration;
//                     }
//                 }
//             });
    
//             handleVideoSectionVisibility();
//             animationFrameId = requestAnimationFrame(animate);
//         } else {
//             ticking = false;
//         }
//     };
    

//     // Scroll handler
//     const handleScroll = debounce(() => {
//         smoothScroll.targetY = window.pageYOffset;
        
//         if (!ticking) {
//             ticking = true;
//             animationFrameId = requestAnimationFrame(animate);
//         }
//     }, 5);

//     // Touch handling
//     const touchHandler = {
//         startY: 0,
//         sensitivity: 2,
        
//         start(e) {
//             this.startY = e.touches[0].clientY;
//             cancelAnimationFrame(animationFrameId);
//         },
        
//         move(e) {
//             const touchY = e.touches[0].clientY;
//             const deltaY = (this.startY - touchY) * this.sensitivity;
            
//             smoothScroll.targetY = Math.max(0, Math.min(
//                 smoothScroll.targetY + deltaY,
//                 document.documentElement.scrollHeight - window.innerHeight
//             ));
            
//             this.startY = touchY;
            
//             if (!ticking) {
//                 ticking = true;
//                 animationFrameId = requestAnimationFrame(animate);
//             }
//         }
//     };

//     // Video loading handler
//     videos.forEach(video => {
//         video.addEventListener('loadedmetadata', () => {
//             videosReady++;
//             if (videosReady === totalVideos) {
//                 loadingIndicator.classList.add('hidden');
//                 handleVideoSectionVisibility();
//             }
//         });

//         video.addEventListener('error', () => {
//             console.error('Video loading error:', video.error);
//         });

//         video.load();
//         video.play().then(() => {
//             video.pause();
//         }).catch(err => {
//             console.log('Auto-play prevented:', err);
//         });
//     });

//     // Event listeners
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     document.addEventListener('touchstart', e => touchHandler.start(e), { passive: true });
//     document.addEventListener('touchmove', e => touchHandler.move(e), { passive: true });

//     // Cleanup
//     window.addEventListener('beforeunload', () => {
//         cancelAnimationFrame(animationFrameId);
//         sectionObserver.disconnect();
//     });

//     setTimeout(() => {
//         window.scrollTo(0, 20);
//     }, 50);
    
// });


document.addEventListener('DOMContentLoaded', () => {
    const videoSections = document.querySelectorAll('.video-section');
    const videos = document.querySelectorAll('.parallax-video');
    const sections = document.querySelectorAll('.section');
    const loadingIndicator = document.querySelector('.loading');
    
    let lastScrollY = window.pageYOffset;
    let touchStartY = 0;
    let isScrolling = false;

    const handleVideoSectionVisibility = () => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const totalSections = videoSections.length;
        const currentSectionIndex = Math.floor(scrollPercent * totalSections);
        
        videoSections.forEach((section, index) => {
            const videoContainer = section.querySelector('.video-container');
            if (index === currentSectionIndex) {
                videoContainer.classList.add('active');
            } else {
                videoContainer.classList.remove('active');
            }
        });
    };

    const syncVideoToScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const totalSections = videoSections.length;
        const sectionHeight = scrollHeight / totalSections;

        videoSections.forEach((section, index) => {
            const video = section.querySelector('video');
            if (video.readyState > 3) {
                const sectionScrollStart = sectionHeight * index;
                const sectionScrollEnd = sectionHeight * (index + 1);
                const sectionScrollPercent = (window.pageYOffset - sectionScrollStart) / (sectionScrollEnd - sectionScrollStart);

                if (sectionScrollPercent >= 0 && sectionScrollPercent <= 1 && video.duration) {
                    video.currentTime = sectionScrollPercent * video.duration;
                }
            }
        });

        handleVideoSectionVisibility();
    };

    const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
        isScrolling = true;
    };

    const handleTouchMove = (e) => {
        if (!isScrolling) return;

        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY;
        
        window.scrollBy(0, deltaY);
        touchStartY = touchCurrentY;
        
        syncVideoToScroll();
    };

    const handleTouchEnd = () => {
        isScrolling = false;
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // Video loading logic
    videos.forEach(video => {
        video.load();
        video.play().then(() => video.pause()).catch(console.error);
    });

    // Event listeners
    window.addEventListener('scroll', syncVideoToScroll, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Initial scroll
    setTimeout(() => window.scrollTo(0, 20), 50);
});

//////////////////////////////////////////////

function updateAllVideoSources() {
    const videoElements = document.querySelectorAll('video');

    if (!videoElements.length) {
        console.error('No video elements found!');
        return;
    }

    videoElements.forEach(video => {
        const sourceElement = video.querySelector('source');

        if (!sourceElement) {
            console.warn('No source element found for video:', video);
            return;
        }

        const currentSrc = sourceElement.getAttribute('src');

        if (!currentSrc) {
            console.warn('Source element has no src attribute:', sourceElement);
            return;
        }

        const baseSrc = currentSrc.replace(/mobile\.mp4$/, '').replace(/\.mp4$/, '');
        const mobileSrc = `${baseSrc}mobile.mp4`;
        const desktopSrc = `${baseSrc}.mp4`;

        if (window.innerWidth <= 468) {
            if (currentSrc !== mobileSrc) {
                sourceElement.setAttribute('src', mobileSrc);
                video.load(); // Reload the video element
            }
        } else {
            if (currentSrc !== desktopSrc) {
                sourceElement.setAttribute('src', desktopSrc);
                video.load(); // Reload the video element
            }
        }
    });
}

// Initial check on page load
updateAllVideoSources();

// Listen for window resize events
window.addEventListener('resize', updateAllVideoSources);
