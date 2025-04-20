 // Create floating particles
 function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['rgba(74, 108, 250, 0.2)', 'rgba(142, 45,, 226, 0.2)', 'rgba(255, 107, 107, 0.2)'];
    const totalParticles = 15;
    
    for (let i = 0; i < totalParticles; i++) {
        const size = Math.random() * 30 + 10;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${15 + Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Toggle FAQ items with ripple effect
function setupFaqItems() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', (e) => {
            const item = question.parentElement;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(74, 109, 250, 0.47)';
            ripple.style.top = `${e.offsetY}px`;
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.animation = 'ripple 0.6s linear';
            question.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Toggle active state
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight matching text if there's a search term
                if (searchTerm.length > 0) {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const questionText = item.querySelector('.faq-question').textContent;
                    const answerText = item.querySelector('.faq-answer').textContent;
                    
                    item.querySelector('.faq-question').innerHTML = questionText.replace(regex, '<mark style="background-color: rgba(74, 108, 250, 0.2); color: inherit; padding: 0 2px; border-radius: 3px;">$1</mark>');
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // If search is cleared, restore original text
        if (searchTerm.length === 0) {
            document.querySelectorAll('.faq-item').forEach(item => {
                const questionEl = item.querySelector('.faq-question');
                const questionText = questionEl.textContent;
                const toggleEl = questionEl.querySelector('.faq-toggle').outerHTML;
                questionEl.innerHTML = questionText + toggleEl;
            });
        }
    });
}

// Add scroll reveal animation
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.faq-item, .contact-section').forEach(item => {
        observer.observe(item);
    });
}

// Interactive ripple effect for buttons
function setupButtonEffects() {
    document.querySelectorAll('.contact-btn, .back-to-home').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        // button.addEventListener('click', (e) => {
        //     if (button.classList.contains('back-to-home')) {
        //         e.preventDefault();
        //         alert('Navigating back to home page...');
        //     }
        // });
    });
}

// Typing effect for title
function typeEffect() {
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupFaqItems();
    setupSearch();
    setupScrollAnimation();
    setupButtonEffects();
    // Uncomment the line below if you want the typing effect for the title
    // typeEffect();
});