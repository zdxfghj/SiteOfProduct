"use strict"


function timer(){
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
    
}

export default timer;