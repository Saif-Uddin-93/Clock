const digiClock = $("#digital-clock");
//const anaClock = $('#ac-border');
const angleOffset = 180;

function toggleFullscreen() {
    let elem = document.querySelector("html");
  
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

let width = window.innerWidth;

function updateTime(){
    setInterval(()=>{
        if(window.innerWidth!==width){
            $("#hours").remove();
            positionHours();
            width = window.innerWidth;
            // console.log(width);
        }
        if(window.innerWidth>767) {
            showDate('#day', 'ddd D', 'block');
            showDate('#month', 'MMM', 'block');
            showDate('#year', 'YYYY', 'block');
        }
        else {
            showDate('#day', undefined, 'none');
            showDate('#month', undefined, 'none');
            showDate('#year', undefined, 'none');
        }
        let time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
        let clock = new Date();
        let seconds = clock.getSeconds();
        let minutes = clock.getMinutes();
        let hours = clock.getHours();
        let secsAngle = ((360/60)*seconds)+angleOffset;
        let minsAngle = ((360/60)*minutes)+angleOffset;
        let hourAngle = ((360/12)*hours)+angleOffset + (minutes/2);
        
        // console.log(minsAngle);
        calcAngleHand("#wrapper-second-hand", secsAngle);
        calcAngleHand("#wrapper-minute-hand", minsAngle);
        calcAngleHand("#wrapper-hour-hand", hourAngle);
    }, 1000);
}

function calcAngleHand(css, ang){
    $(css).css("transform", `rotate(${ang}deg)`);
}

function showDate(id, format, display){
    if(display==='none') {
        //$(id).removeClass('date');
        $(id).css('display', display);
        return
    }
    //$(id).addClass('date');
    $(id).css('display', display);
    $(id).text(dayjs().format(format));
}

updateTime();

const numArray = [
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  1,
  2,
]

const hourStyle = (index) => {
    const x = btnPosX(index), y = btnPosY(index);
    // console.log(`${y} ${x}`)
    return (`
        "position: absolute;
        top: ${y}rem;
        left: ${x}rem;
        text-align: left;
        width: fit-content;
        height: fit-content;
        font-size: 32px;
        background-color: rgba(190, 190, 190, 0.7);
        border-radius: 10px;
        padding: 1px 3px"`)
}

function calcAngle(arr, index){ // calculate radians not degrees
    return index*Math.PI*2/arr.length
}

const btnPosX = (index, radius = window.innerWidth > 767 ? 14 : 8)=>{
    return radius * Math.cos(calcAngle(numArray, index))
}

const btnPosY = (index, radius = window.innerWidth > 767 ? 14 : 8)=>{
    return radius * Math.sin(calcAngle(numArray, index))
}
//console.log(hourStyle());

function positionHours(){
    $("<div id='hours'>").insertAfter('#year');
    numArray.map((hour, index)=>(
        $('#hours').append($(`<div id="${hour}" style=${hourStyle(index)}>${hour}</div>`))
    ))
}
positionHours();

const canWakeLock = () =>'wakeLock' in navigator;

let wakelock;
async function lockWakeState() {
  if(!canWakeLock()) return;
  try {
    wakelock = await navigator.wakeLock.request();
    wakelock.addEventListener('release', () => {
      console.log('Screen Wake State Locked:', !wakelock.released);
    });
    console.log('Screen Wake State Locked:', !wakelock.released);
  } catch(e) {
    console.error('Failed to lock wake state with reason:', e.message);
  }
}

lockWakeState();