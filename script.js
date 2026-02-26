// ===== UI Theme Toggle =====
(function () {
    const STORAGE_KEY = 'portfolio-ui-theme';
    const toggleInput = document.getElementById('ui-toggle-input');

    // Read saved theme or default to 'modern'
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 'modern';

    // Apply theme
    function applyTheme(theme) {
        document.body.classList.remove('ui-modern', 'ui-neo-brutalism');
        if (theme === 'neo-brutalism') {
            document.body.classList.add('ui-neo-brutalism');
            if (toggleInput) toggleInput.checked = true;
        } else {
            document.body.classList.add('ui-modern');
            if (toggleInput) toggleInput.checked = false;
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }

    applyTheme(savedTheme);

    // Toggle on checkbox change
    if (toggleInput) {
        toggleInput.addEventListener('change', () => {
            const next = toggleInput.checked ? 'neo-brutalism' : 'modern';
            applyTheme(next);
        });
    }
})();


// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('.section');
const header = document.getElementById('header');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150; // Offset for header height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Handle home section
    if (window.scrollY < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Header Shadow on Scroll =====
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ===== Fade In Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('.section, .project__card, .experience__item, .skills__category').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    } else if (name.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    } else {
        hideError(nameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        hideError(emailInput, emailError);
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    } else if (message.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        return false;
    } else {
        hideError(messageInput, messageError);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Form is valid - in a real application, you would send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();

            // Remove any error states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('error');
            });
            [nameError, emailError, messageError].forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
        } else {
            // Scroll to first error
            if (!isNameValid) {
                nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                emailInput.focus();
            } else if (!isMessageValid) {
                messageInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                messageInput.focus();
            }
        }
    });
}

// ===== Email Link Handler =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        // Try opening Gmail compose window as fallback
        if (!navigator.mailto) {
            e.preventDefault();
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
        }
    });
});

// ===== Resume Download Button =====
const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would link to an actual PDF file
        // For now, we'll show a message
        alert('Resume download will be available soon. Please contact me via email for my resume.');
    });
}

// ===== Close Mobile Menu on Window Resize =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    }
});

// ===== Initialize =====
// Set initial active nav link
updateActiveNavLink();

// Add fade-in class to hero content
const heroContent = document.querySelector('.hero__content');
if (heroContent) {
    heroContent.classList.add('fade-in', 'visible');
}

