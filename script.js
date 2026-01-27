// ============================================
// Theme Toggle Functionality
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Initialize theme
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
} else if (prefersDark) {
    body.classList.add('dark-mode');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update quote image theme
    updateQuoteTheme(isDark);
});

// Update quote image based on theme
function updateQuoteTheme(isDark) {
    const quoteImg = document.querySelector('.quote-img');
    if (quoteImg) {
        const theme = isDark ? 'dark' : 'light';
        const currentSrc = quoteImg.src;
        const newSrc = currentSrc.replace(/theme=\w+/, `theme=${theme}`);
        if (currentSrc !== newSrc) {
            quoteImg.src = newSrc;
        }
    }
}

// ============================================
// Typing Animation
// ============================================
const typingText = document.getElementById('typing-text');
const phrases = [
    'A person who struggles with life.',
    'Learning Python, AI & ML',
    'Exploring Cybersecurity',
    'Building cool projects',
    'A passionate developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animating
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ============================================
// Dynamic Year in Footer
// ============================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// Navigation Background on Scroll
// ============================================
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Prevent Flash of Unstyled Content
// ============================================
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});

// ============================================
// Handle External Links
// ============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Ensure external links have proper security attributes
    if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ============================================
// Performance: Lazy Loading Enhancement
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Hello, curious developer!', 'color: #58a6ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #30a5f7; font-size: 14px;');
console.log('%chttps://github.com/DibyajyotiBiswal57', 'color: #c9d1d9; font-size: 12px;');

// ============================================
// Keyboard Accessibility
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
});

// ============================================
// Add ripple effect to buttons
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// Parallax effect for hero background
// ============================================
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// ============================================
// Preload critical resources
// ============================================
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Preload GitHub avatar for favicon
preloadImage('https://github.com/DibyajyotiBiswal57.png');
