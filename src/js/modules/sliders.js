const sliders = (slides, direction, next, prev) => {
    'use strict';
    let slideIndex = 0,
        paused = false;

    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n >= items.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = items.length - 1;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex].style.display = 'block';
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const nextBtn = document.querySelector(next),
              prevBtn = document.querySelector(prev);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex].classList.remove('slideInLeft');
            items[slideIndex].classList.add('slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex].classList.remove('slideInRight');
            items[slideIndex].classList.add('slideInLeft');
        });
    }
    catch(err) {}

    activateAnimation();

    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.remove('slideInRight');
                items[slideIndex].classList.add('slideInLeft');
            }, 5000);
        }

        items[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(paused);
        });
        items[0].parentNode.addEventListener('mouseleave', () => {
            activateAnimation();
        });
    }

    
};

export default sliders;