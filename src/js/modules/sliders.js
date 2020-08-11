const sliders = (slides, direction, next, prev) => {
    'use strict';
        // переменная для показа первоначального слайда
    let slideIndex = 0,
        // переменная для остановки автопереключения слайдов
        paused = false;
        // собираем все слайды
    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        // реализация бесконечного перелистывания слайдов 
        if (n >= items.length) {
            slideIndex = 0;
        } else if (n < 0) {
            slideIndex = items.length - 1;
        }
        // перебираем все слайды, задаем класс анимации всем сразу и все скрываем
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
        // показываем только первоначальный слайд по заданному индексу
        items[slideIndex].style.display = 'block';
    }

    showSlides(slideIndex);
    // функция перелистывания слайдов, можем передавать n == 1 или -1
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    // обертка try...catch для кнопок ручного переключения слайдов
    try {
        // кнопки ручного переключения
        const nextBtn = document.querySelector(next),
              prevBtn = document.querySelector(prev);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            //удаляем/добавляем классы анимации в зависимости от направления перелистывания слайдов
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
    // фукция включения/отключения анимации слайдов
    function activateAnimation() {
        // если передам параметр вертикального слайдера 
        if (direction === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.add('slideInDown');
            }, 5000);
            // если другой параметр или вообще не передан
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.remove('slideInRight');
                items[slideIndex].classList.add('slideInLeft');
            }, 5000);
        }
        //при наведении на слайдер останавливаем setInterval
        items[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(paused);
        });
        // при убирании мышки запускаем вновь
        items[0].parentNode.addEventListener('mouseleave', () => {
            activateAnimation();
        });
    }

    
};

export default sliders;