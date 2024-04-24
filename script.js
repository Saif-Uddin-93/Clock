let digiClock = $(".digital-clock");
let time = dayjs().format('HH:mm:ss');

function updateTime(){
    setInterval(()=>{
        time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
    }, 1000);
}

updateTime();