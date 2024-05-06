import * as dayjs from 'dayjs';

const digiClockTS = document.getElementById("digital-clock");
const anaClockTS = document.getElementById('ac-border');
const angleOffsetTS = 180;

function updateTimeTS(){
    setInterval(()=>{
        let time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
        let clock = new Date()
        let seconds = clock.getSeconds();
        let minutes = clock.getMinutes();
        let hours = clock.getHours();
        let secsAngle = ((360/60)*seconds)+angleOffset;
        let minsAngle = ((360/60)*minutes)+angleOffset;
        let hourAngle = ((360/12)*hours)+angleOffset + (minutes/2);
        // console.log(minsAngle);
        calcAngleHandTS("wrapper-second-hand", secsAngle);
        calcAngleHandTS("wrapper-minute-hand", minsAngle);
        calcAngleHandTS("wrapper-hour-hand", hourAngle);
    }, 1000);
}

function calcAngleHandTS(css : string, ang : number): void{
    let el = <HTMLElement>document.getElementById(css);
    el.style.transform = `rotate(${ang}deg)`;
}

updateTimeTS();

const numArrayTS: number[] = [
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

const hourStyleTS = (index) => {
    const x = btnPosXTS(index), y = btnPosYTS(index);
    // console.log(`${y} ${x}`)
    return (`
        "position: absolute;
        top: ${y}rem;
        left: ${x}rem;
        text-align: left;
        width: 0px;
        height: 0px;
        font-size: 32px;"`)
}

function calcAngleTS(arr, index){ // calculate radians not degrees
    return index*Math.PI*2/arr.length
}

const btnPosXTS = (index, radius=8)=>{
    return radius * Math.cos(calcAngleTS(numArray, index))
}

const btnPosYTS = (index, radius=8)=>{
    return radius * Math.sin(calcAngleTS(numArray, index))
}
//console.log(hourStyle());
numArrayTS.map(function(hour: number, index: number): void{
    let hours = <HTMLElement>document.getElementById('hours');
    let hr = document.createElement(`<div id="${hour}" style=${hourStyle(index)}>${hour}</div>`);
    hours.appendChild(hr);
})

const canwakelockTSTS = () =>'wakelockTS' in navigator;

let wakelockTS : any;
async function lockWakeStateTS() {
  if(!canwakelockTSTS()) return;
  try {
    wakelockTS = await navigator.wakeLock.request();
    wakelockTS.addEventListener('release', () => {
      console.log('Screen Wake State Locked:', !wakelockTS.released);
    });
    console.log('Screen Wake State Locked:', !wakelockTS.released);
  } catch(e) {
    console.error('Failed to lock wake state with reason:', e.message);
  }
}

lockWakeStateTS();