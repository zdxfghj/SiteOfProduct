"use strict"


function modal(){


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

}

export default modal;