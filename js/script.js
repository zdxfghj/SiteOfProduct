"use strict"

window.addEventListener('DOMContentLoaded', function() {

let tabMenu = document.querySelector('.tabheader__items'),
    tabItemMenu = document.querySelectorAll('.tabheader__item'),
    tabElems = document.querySelectorAll('.tabcontent')

function hiddenTabContent(){
   tabElems.forEach((item)=>{
      item.classList.add('display__none');
      item.classList.remove('display__block');
   });
   tabItemMenu.forEach((item)=>{
      item.classList.remove("tabheader__item_active");
   });
}

function showTabContent(i = 0){
   tabElems[i].classList.add('display__block','transition__element');
   tabItemMenu[i].classList.add("tabheader__item_active")
}

hiddenTabContent();
showTabContent();

tabMenu.addEventListener('click', (event) =>{
   const target = event.target
   if(target && target.classList.contains('tabheader__item')){
      tabItemMenu.forEach((item,i)=>{
         if(target == item){
            hiddenTabContent();
            showTabContent(i);
         }
      });
   }
});

///timer

const deadtime = '2023-03-12';

function getTimeRemaining(endtime){
   const t = Date.parse(endtime)-Date.parse(new Date());
   const days = Math.floor(t/(1000*60*60*24)),
         hours = Math.floor(t/(1000*60*60)%24),
         minutes = Math.floor(t/(1000*60)%60),
         seconds = Math.floor(t/(1000)%60);
         return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
         };
}

function setClock(selector,endtime){
   const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector("#hours"),
         minutes = timer.querySelector("#minutes"),
         seconds = timer.querySelector("#seconds"),
         timeInterval = setInterval(updateClock,1000);

         updateClock();

         function updateClock(){
            const t = getTimeRemaining(endtime);
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            
         }
   
}

setClock('.timer',deadtime);

//form 

const forms = document.querySelectorAll('form');
const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
   bindPostData(item);
});

function postData(form){

}


function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}


// modal
   const btns = document.querySelectorAll('.btn'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('.modal__close');
   btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
         modal.classList.add('display__block');
         modal.classList.remove('display__none')
      });
   });
   modalCloseBtn.addEventListener('click', ()=>{

         modal.classList.remove('display__block');
         modal.classList.add('display__none');

   });

   modal.addEventListener('click', (e)=>{
      if(e.target === modal){
         modal.classList.remove('display__block');
         modal.classList.add('display__none');
      }
      
   });


   // Use class for creat card

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.classes = classes;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 27;
          this.changeToUAH(); 
      }

      changeToUAH() {
          this.price = this.price * this.transfer; 
      }

      render() {
          const element = document.createElement('div');

          if (this.classes.length === 0) {
              this.classes = "menu__item";
              element.classList.add(this.classes);
          } else {
              this.classes.forEach(className => element.classList.add(className));
          }

          element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
          `;
          this.parent.append(element);
      }
  }

//   getResource('http://localhost:3000/menu')
//       .then(data => {
//           data.forEach(({img, altimg, title, descr, price}) => {
//               new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//           });
//       });


//slider

 const slides = document.querySelectorAll('.offer__slide'),
       prev = document.querySelector('.offer__slider-prev'),
       next = document.querySelector('.offer__slider-next'),
       currentSlide = document.querySelector('#current'),
       totalSlide = document.querySelector('#total');
       let sliderIndex = 1;
      
       /////slider_carusel
       let offset = 0; ///отступ
 const   sliderWrapper = document.querySelector(".offer__slider-wrapper"),
         dots = [],
         sliderField = document.querySelector(".offer__slider-inner"),
         slider = this.document.querySelector(".offer__slider"),
         width = window.getComputedStyle(sliderWrapper).width;

         totalSlide.textContent = (slides.length>10)?  slides.length: '0'+slides.length;
         currentSlide.textContent = (sliderIndex>10)?  sliderIndex: '0'+sliderIndex;

         sliderField.style.width = 100 * slides.length + '%';
         sliderField.style.display = 'flex';
         sliderField.style.transition = "0.5s all";
         sliderWrapper.style.overflow = 'hidden';

         slides.forEach(slide=>{
            slide.style.width = width;
         });

////////navigation for slider
         slider.style.position = 'relative';

         const indicators = document.createElement('ol');
         indicators.classList.add('carousel-indicators');
         slider.append(indicators);
        
         for(let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i+1);
            dot.classList.add("dot");
            if(i == 0){
               dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
         }
////
         
         prev.addEventListener('click', ()=>{
            if(offset  == 0){ ///500px
               offset = +width.slice(0,width.length - 2)*(slides.length-1);
            } else {
               offset -= +width.slice(0,width.length - 2)
            }
           
           (sliderIndex == 1) ?  (sliderIndex = slides.length) : sliderIndex--;
            currentSlide.textContent = (sliderIndex<10)?  `0${sliderIndex}`: sliderIndex;
            sliderField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot=> dot.style.opacity = '.5');
            dots[sliderIndex-1].style.opacity = '1';

         });
         next.addEventListener('click', ()=>{
            if(offset  == +width.slice(0,width.length - 2)*(slides.length-1)){ ///500px
               offset = 0;
            } else {
               offset += +width.slice(0,width.length - 2)
            }
            (sliderIndex == slides.length) ?  (sliderIndex = 1) : sliderIndex++;
            currentSlide.textContent = (sliderIndex<10)?  `0${sliderIndex}` : sliderIndex;
            sliderField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot=> dot.style.opacity = '.5');
            dots[sliderIndex-1].style.opacity = '1';

         });

         dots.forEach(dot =>{
            dot.addEventListener('click', (e) =>{
               const slideTo = e.target.getAttribute('data-slide-to');

               sliderIndex = slideTo;
               offset = +width.slice(0,width.length - 2)*(slideTo-1);

               sliderField.style.transform = `translateX(-${offset}px)`;

               currentSlide.textContent = (sliderIndex<10)?  `0${sliderIndex}` : sliderIndex;

               dots.forEach(dot=> dot.style.opacity = '.5');
               dots[sliderIndex-1].style.opacity = '1';
            });
         })

       /////


// showSlides(sliderIndex);

// function showSlides(n){
//    totalSlide.textContent = (slides.length>10)?  slides.length: '0'+slides.length;
//    if(n > slides.length){
//       sliderIndex = 1;
//    }
//    if(n < 1){
//       sliderIndex = slides.length;
//    }
//    slides.forEach(item => item.style.display = 'none');

//    slides[sliderIndex-1].style.display = 'block'
//    currentSlide.textContent = (sliderIndex>10)?  sliderIndex: '0'+sliderIndex;
  
  
// }
// function plusSlides(n){
//    showSlides(sliderIndex += n)
// }

// prev.addEventListener('click', ()=>{
//    plusSlides(-1);
// });
// next.addEventListener('click', ()=>{
//    plusSlides(1);
// })


 // Calculator
 const result = document.querySelector('.calculating__result span');
    
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = "female";
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    console.log(ratio);
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    console.log(sex);
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});