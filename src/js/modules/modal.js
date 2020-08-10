const modals = () => {
    //проверка кликались ли кнопки
    let btnPressed = false;
    //вычисляем ширину скролла страницы
    const scroll = window.innerWidth - document.documentElement.clientWidth,
    //получает элемент иконка подарка
        gift = document.querySelector('.fixed-gift');
    
    //основная функция открытия модального окна
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
				}

				const hideAndShow = () => {
                    //закрываем все открытые модальные окна
                    windows.forEach(item => {
					    item.style.display = 'none';
                    });
                    //если передан аргумент destroy, то убираем триггер со страницы
                    if(destroy) {
                        item.remove();
                    }
                    //определяем что какая-то из кнопок кликалась
                    btnPressed = true;
                    //открываем выбранное модальное окно
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    //задаем странице margin-right на ширину скрола, чтобы не дергалась
                    document.body.style.marginRight = `${scroll}px`;
                    //задаем иконке подарка margin-right на ширину скрола, чтобы не дергался
                    if (gift) {
                        gift.style.right = parseInt(getComputedStyle(gift).right) + scroll + 'px';
                    }
                };

                hideAndShow();
            });
        });
        //закрытие модалки 
        let closeModal = () => {
            //проверяем остальные окна чтобы были закрытыми
            windows.forEach(item => {
				item.style.display = 'none';
			});
            //закрываем модалку
            modal.style.display = 'none';
            document.body.style.overflow = '';
            //убираем отступ справа
            document.body.style.marginRight = '0px';
            //проверяем наличие иконки подарка и убираем отступ справа
            if (gift) {
                gift.style.right = (parseInt(getComputedStyle(gift).right) - scroll) + 'px';
            }
        };
        //закрываем модалку кликом на крестик
        close.addEventListener('click', closeModal);
        //закрываем модалку кликом на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {

				closeModal();
            }
        });
    }
    //вызов модалки по времени
    function callModalByTime(selector, time) {
        setTimeout(() => {
            //проверяем есть ли открытые модальные окна
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });
            //если нет открытых модалок то открываем по времени
            if (!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }
            
        }, time);
    }
    //открываем модалку с подарком при прокрутке до конца страницы
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            //для кроссбраузерности - одно из значений должно сработать
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            //проверяем что не нажимались кнопки и страница прокручена до конца
            if ( !btnPressed && (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight) >= scrollHeight) {
                //программно кликаем по кнопке вызова модалки
                document.querySelector(selector).click();
            }
            
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    callModalByTime('.popup-consultation', 60000);

};

export default modals;