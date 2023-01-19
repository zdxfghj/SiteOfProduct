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
   loading: 'Загрузка',
   success: 'Спасибо! Скоро мы с вами свяжемся',
   failure:'Что-то не так'
};



forms.forEach(item=>{
   postData(item);
});
 

function postData(form){
   form.addEventListener('submit',(e)=>{
      e.preventDafault();
   });
   const statusMessage = document.createElement('div');
   statusMessage.classList.add('status');
   statusMessage.textContent = message.loading;
   form.append(statusMessage);

   const request = new XMLHttpRequest();
   request.open('post','server.php');
   
   request.setRequestHeader("Content-type","application/json");
   const formData = new FormData(form);

   const object = {};
   formData.forEach(function(value,key){
      object[key] = value;
   });
   const json = JSON.stringify(object);
   
   //request.send(json);

   request.addEventListener('load',()=>{
      if(request.status === 200){
         console.log('Sucsses')
      }
   });

};


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

showSlides(sliderIndex);

function showSlides(n){
   totalSlide.textContent = (slides.length>10)?  slides.length: '0'+slides.length;
   if(n > slides.length){
      sliderIndex = 1;
   }
   if(n < 1){
      sliderIndex = slides.length;
   }
   slides.forEach(item => item.style.display = 'none');

   slides[sliderIndex-1].style.display = 'block'
   currentSlide.textContent = (sliderIndex>10)?  sliderIndex: '0'+sliderIndex;
  
  
}
function plusSlides(n){
   showSlides(sliderIndex += n)
}

prev.addEventListener('click', ()=>{
   plusSlides(-1);
});
next.addEventListener('click', ()=>{
   plusSlides(1);
});

});