"use strict"

require('es6-promise').polyfill;

import tabs from './modules/tabs.js';
import card from './modules/card.js';
import modal from './modules/modal.js';
import timer from './modules/timer.js';
import form from './modules/form.js';
import calculator from './modules/calculator.js';
import slider from './modules/slider.js';


window.addEventListener('DOMContentLoaded', function() {


    tabs();
    card();
    modal();
    calculator();
    timer();
    form();
    slider();
});