import {bastards} from './cards.js';
import {randomCompMove} from './random.js';
let max=0;
let x;
let timer=0;
const highscore=()=>{
    let high=timer;
    let highpara=document.querySelector('.highestnumber');
    let currentHigh=parseFloat(highpara.innerHTML);
    if(currentHigh===0.00||high<currentHigh) {
        highpara.innerHTML=high.toFixed(2);
    }
}

const putiles=()=>{
    let bastardsback=[...bastards];
    let uidefault='';
    while(bastardsback.length!=0){
        let player=randomCompMove(bastardsback);
        uidefault+=`
            <button class="box">
                <img class="characterimg" src=${player.image}>
                <p class="boxtext">${player.id}</p>
            </button>`;
    }
    document.querySelector('.game').innerHTML=uidefault;
}
const showsecond=()=>{
    let boxes=document.querySelectorAll('.box');
    boxes.forEach((box)=>{
        box.querySelector('.characterimg').style.opacity='1';
    });
    setTimeout(function(){
        boxes.forEach((box)=>{
            box.querySelector('.characterimg').style.opacity='0';
        });
    },1300);
}
const setup=()=>{
    let boxes=document.querySelectorAll('.box');
    let boxcount=0;
    let choicefirst,choicesecond;
    boxes.forEach((option)=>{
        option.addEventListener('click',()=>{
            if(boxcount===0){
                choicefirst=option;
                boxcount++;
                choicefirst.querySelector('.characterimg').style.opacity='1';
                choicefirst.disabled=true;
                if(max===0){
                    timerscore();
                }
            }
            else if(boxcount===1){
                choicesecond=option;
                boxcount++;
                choicesecond.querySelector('.characterimg').style.opacity='1';
                choicesecond.disabled=true;
                performGame(choicefirst,choicesecond);
            }
        });
    });
    const performGame=(box1,box2)=>{
        if(box1.innerText===box2.innerText){
            console.log('Pair Matched');
            max=max+2;
            if(max===bastards.length){
                clearInterval(x);
                highscore();
            }
        }
        else{
            console.log('Pair Not Matched');
            box1.disabled=false;
            box2.disabled=false;
            setTimeout(function(){
                box1.querySelector('.characterimg').style.opacity='0';
                box2.querySelector('.characterimg').style.opacity='0';
            },500);
        }
        boxcount=0;
        choicefirst=null;
        choicesecond=null;
    }
}
const timerscore=()=>{
    x=setInterval(function(){
        timer=timer+0.01;
        document.querySelector('.currentnumber').innerHTML=timer.toFixed(2);
    },10);
}
const again=document.querySelector('.reset');
again.addEventListener('click',()=>{
    clearInterval(x);
    max=0;
    document.querySelector('.currentnumber').innerHTML='0.00';
    timer=0;
    putiles();
    showsecond();
    setup();
});

putiles();
showsecond();
setup();
