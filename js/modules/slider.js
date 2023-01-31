"use strict"


function slider(){
        
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
        slider = document.querySelector(".offer__slider"),
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


}

export default slider;