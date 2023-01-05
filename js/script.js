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



var c='helo.pdf';
console.log(c.substr(  c.lastIndexOf('.')  ) .toLowerCase() );
switch (  c.substr(  c.lastIndexOf('.')  ) .toLowerCase()  )
{
case '.pdf' : console.log(`<div class="fileinfoImg" style="background:url('/template/rawr_blue/images/pdf.png') center center no-repeat ;height:60px;"></div>`);break;
														
default: console.log('<div class="fileinfoImg" style="background:url(`/template/rawr_blue/images/Document.png`) center center no-repeat;height:60px;"></div>');}
													

									