const modals = () => {

    let btnPressed = false;

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
                    windows.forEach(item => {
					    item.style.display = 'none';
                    });
                    
                    if(destroy) {
                        item.remove();
                    }
                    btnPressed = true;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                };

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
            if (e.target === modal) {

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

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if ( !btnPressed && (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight) >= scrollHeight) {
                
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