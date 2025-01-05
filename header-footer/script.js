const menuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');
const logoImg = document.querySelector('.logo img');

// Function to set logo size based on screen width and scroll position
function setLogoSize() {
    const scrolled = window.scrollY > 100;
    const screenWidth = window.innerWidth;
    
    // Original and scrolled sizes for different breakpoints
    if (screenWidth > 1200) {
        logoImg.style.width = scrolled ? '100px' : '120px';
    } else if (screenWidth > 992) {
        logoImg.style.width = scrolled ? '90px' : '110px';
    } else if (screenWidth > 768) {
        logoImg.style.width = scrolled ? '80px' : '100px';
    } else if (screenWidth > 576) {
        logoImg.style.width = scrolled ? '70px' : '90px';
    } else if (screenWidth > 400) {
        logoImg.style.width = scrolled ? '60px' : '80px';
    } else {
        logoImg.style.width = scrolled ? '50px' : '70px';
    }
}

// Set initial logo size and transition
logoImg.style.transition = 'width 0.3s ease';
setLogoSize();

// Add scroll event listener
window.addEventListener('scroll', setLogoSize);

// Add resize event listener
window.addEventListener('resize', setLogoSize);

// Menu open/close handlers
menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Connect button functionality
const connectBtn = document.querySelector('.connect-btn');
connectBtn.addEventListener('click', () => {
    console.log('Connect button clicked');
});




// progress-bar.js///////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    
    const updateProgressBar = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = window.pageYOffset / scrollHeight;
        progressFill.style.width = `${scrollPercent * 100}%`;
    };

    // Debounce function to optimize scroll performance
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Add scroll event listener with debouncing
    window.addEventListener('scroll', debounce(updateProgressBar, 5), { passive: true });
});



/////////////////////////////////////////////////////////////////////////////////////////////

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

document.querySelectorAll('button, a').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});
