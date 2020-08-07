const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]');

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
				}
                
                // let warning = document.createElement('div');
                // warning.classList.add('status1');
                // let warning1 = document.createElement('div');
                // warning1.classList.add('status2');

				const hideAndShow = () => {
                    windows.forEach(item => {
					    item.style.display = 'none';
				    });
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                };

                // проверка на заполненность полей ввода
                // проверка через наличие или отсутствие соответствующих свойств у объекта modalState
                // if (modalSelector == '.popup_calc_profile' && ( !state.width || !state.height)) {
                // если поля поля ширины и высоты в первом модальном незаполнены, то добавляется warning с требованием 
                //     item.parentNode.appendChild(warning);
                //     document.querySelector('.status1').textContent = 'Укажите форму и размеры окна';
                // } else if (modalSelector == '.popup_calc_end' && (!state.type || !state.profile)) {
                // если не выбран тип и профиль, то добавляется warning1   
                //     item.parentNode.appendChild(warning1);
                //     document.querySelector('.status2').textContent = 'Укажите тип и профиль остекления';
                // } else {
                    
                //     hideAndShow();
                // }
                hideAndShow();
            });
        });
        
        close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

				windows.forEach(item => {
					item.style.display = 'none';
				});

                modal.style.display = 'none';
                document.body.style.overflow = ''; 
            }
        });
    }

    function callModalByTime(selector, time) {

        setTimeout(() => {

            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            
        }, time);
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    callModalByTime('.popup-consultation', 60000);

};

export default modals;