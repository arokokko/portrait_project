import modals from './modules/modal';
import sliders from './modules/sliders';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modals();
    sliders('.feedback-slider-item', '', '.main-next-btn', '.main-prev-btn');
    sliders('.main-slider-item', 'vertical');
});