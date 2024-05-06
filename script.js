const digiClock = $(".digital-clock");
const anaClock = $('.ac-border');
// let time = dayjs().format('HH:mm:ss');

// let hours = clock.getHours();
// let minutes = clock.getMinutes();

function updateTime(){
    setInterval(()=>{
        let time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
        let clock = new Date()
        let seconds = clock.getSeconds()-30;
        let minutes = clock.getMinutes()-30;
        let hours = clock.getHours()-30;
        let secsAngle = (360/60)*seconds;
        let minsAngle = (360/60)*minutes;
        let hourAngle = (360/12)*hours;
        // console.log(angle);
        $(".wrapper-second-hand").css("transform", `rotate(${secsAngle}deg)`)
        $(".wrapper-minute-hand").css("transform", `rotate(${minsAngle}deg)`)
        $(".wrapper-hour-hand").css("transform", `rotate(${hourAngle}deg)`)
    }, 1000);
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

const btnPosX = (index, radius=14)=>{
    return radius * Math.cos(calcAngle(numArray, index))
}

const btnPosY = (index, radius=14)=>{
    return radius * Math.sin(calcAngle(numArray, index))
}
//console.log(hourStyle());
numArray.map((hour, index)=>(
    $('.hours').append($(`<div class="${hour}" style=${hourStyle(index)}>${hour}</div>`))
))