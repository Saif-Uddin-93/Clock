const digiClock = $(".digital-clock");
const anaClock = $('.ac-border');

function updateTime(){
    setInterval(()=>{
        let time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
        let clock = new Date()
        let seconds = clock.getSeconds();
        let minutes = clock.getMinutes();
        let hours = clock.getHours();
        let secsAngle = ((360/60)*seconds)+180;
        let minsAngle = ((360/60)*minutes)+180;
        let hourAngle = ((360/12)*hours)+180 + (minutes/2);
        console.log(minsAngle);
        calcAngleHand(".wrapper-second-hand", secsAngle);
        calcAngleHand(".wrapper-minute-hand", minsAngle);
        calcAngleHand(".wrapper-hour-hand", hourAngle);
    }, 1000);
}

function calcAngleHand(css, ang){
    $(css).css("transform", `rotate(${ang}deg)`)
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
    console.log(`${y} ${x}`)
    return (`
        "position: absolute;
        top: ${y}rem;
        left: ${x}rem;
        text-align: left;
        width: 0px;
        height: 0px;
        font-size: 32px;"`)
}

function calcAngle(arr, index){ // calculate radians not degrees
    return index*Math.PI*2/arr.length
}

const btnPosX = (index, radius=8)=>{
    return radius * Math.cos(calcAngle(numArray, index))
}

const btnPosY = (index, radius=8)=>{
    return radius * Math.sin(calcAngle(numArray, index))
}
//console.log(hourStyle());
numArray.map((hour, index)=>(
    $('.hours').append($(`<div class="${hour}" style=${hourStyle(index)}>${hour}</div>`))
))

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