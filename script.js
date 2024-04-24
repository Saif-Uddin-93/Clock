let digiClock = $(".digital-clock");
let time = dayjs().format('HH:mm:ss');
let anaClock = $('.ac-border');

function updateTime(){
    setInterval(()=>{
        time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
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
        width: 10px;
        height: 10px;
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