document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Header Component
    fetch('header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header not found');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            placeholder.innerHTML = data;
            // Make the placeholder itself sticky so the injected header stays on top
            placeholder.style.position = 'sticky';
            placeholder.style.top = '0';
            placeholder.style.zIndex = '1050';

            // Set active menu link based on current URL
            let currentPath = window.location.pathname.split('/').pop();
            if (currentPath === '') currentPath = 'index.html'; // Default to index if at root
            
            const navLinks = placeholder.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPath) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.warn('Could not load header.html (If running locally without server, CORS might block fetch).', error));

    // 2. Load Footer Component
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.warn('Could not load footer.html', error));

    // 3. Initialize AOS Animations
    setTimeout(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-in-out'
        });
    }, 300);

    // 4. Initialize Swiper Carousels
    initSwipers();
});

function initSwipers() {
    // Featured Favorites Carousel
    if(document.querySelector('.featured-swiper')) {
        new Swiper('.featured-swiper', {
            slidesPerView: 2,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-button-next-featured',
                prevEl: '.swiper-button-prev-featured',
            },
            pagination: {
                el: '.swiper-pagination-featured',
                clickable: true,
            },
            breakpoints: {
                576: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
            }
        });
    }

    // Testimonial Carousel
    if(document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next-testi',
                prevEl: '.swiper-button-prev-testi',
            },
            pagination: {
                el: '.swiper-pagination-testi',
                clickable: true,
            }
        });
    }

    // Social Media / Brand On You Carousel
    if(document.querySelector('.social-swiper')) {
        new Swiper('.social-swiper', {
            slidesPerView: 2,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next-social',
                prevEl: '.swiper-button-prev-social',
            },
            breakpoints: {
                576: { slidesPerView: 3, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 15 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
            }
        });
    }
}
