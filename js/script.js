// audio player.. by Nikhil Roy Dev
// contact +8801774372294;
// don't copy all the code without credit me;
'use strict';
document.title = 'Music Player by Nikhil Roy';
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let previous = document.querySelector('#previous');
let volume = document.querySelector('#volume');
let duration = document.querySelector('#duration');
let d_text = document.querySelector('#d_text');
let circleRound = document.querySelector('#circleRound');
let songTitle = document.querySelector('.songTitle');
let songsList = [
  "Tui_aka_aka_bose_keno_acho.mp3", 
  "Chokher_arale_sopne_jorale.mp3",
  "Khache_aso_na.mp3",
  "Pothe_hete_hete_khuje_berai.mp3",
  "Somoy_katena_dore_theko_na.mp3",
  "Jeona_jeona_avabe_chole.mp3",
  "Oi_akasher_bukhe.mp3",
  "Ratee_adhare_ojana_choya.mp3",
  "Amar_shathe.mp3",
  "Tomay_ami_nijer_kore.mp3"
];
let songmp3 = new Audio();
let currentSong = 0;


function nextSong(){
    currentSong = currentSong + 1;
    currentSong = (currentSong > songsList.length - 1) ? 0 : currentSong;
    songLoad();
    songmp3.play();
}
setInterval(function(){
    if (songmp3.ended){
        currentSong = currentSong + 1 % songsList.length;
        songLoad();
        songmp3.play();
    };
    songTitle.innerHTML = currentSong + 1 +'. ' +  songsList[currentSong];

},10)
function previousSong(){
    currentSong--;
    currentSong =  (currentSong < 0) ? songsList.length - 1 : currentSong;
    songLoad();
    songmp3.play();
}
function songLoad(){
    songmp3.play();
    songmp3.src='./songs/'+songsList[currentSong];
    // be sure that ../songs is too back so ./songs
}

window.onload = function(){
    songmp3.pause();
    songmp3.src = './songs/' + songsList[currentSong];

}


play.onclick = function(){
    (songmp3.paused) ? songmp3.play() : songmp3.pause();
    if (songmp3.paused) {
        play.innerHTML = '&#9658;'
    } else {
        play.innerHTML = '&#9738;'
    }
};
// volume
    setInterval(function(){
        songmp3.volume = volume.value/100;
        console.log(volume.value/100 )
    }, 100);
 
// duration
    setInterval(function(){
        duration.value = songmp3.currentTime;
        duration.max = songmp3.duration;
    },100);

    duration.oninput = function(){
        songmp3.currentTime = duration.value;
    }
    function nextRate(){
        songmp3.currentTime += 10;
    }
    function prevRate(){
        songmp3.currentTime -= 10;
    }


// duration showing d_text;
let setd_text = setInterval(function(){
    let floorCurrent = Math.floor(songmp3.currentTime);
    let d_min = Math.floor(floorCurrent/60);
    let d_sec = (floorCurrent > 59)  ? floorCurrent % 60 : floorCurrent;
   
    d_text.innerHTML = ((d_min < 10) ? '0' + d_min : d_min)  +' : '
                     + ((d_sec < 10) ? '0' + d_sec : d_sec) ;


}, 1000);

setInterval(function(){
    circleRound.setAttribute('style', `stroke-dashoffset: calc(400 - (${songmp3.currentTime/ songmp3.duration * 157}))`); 
    /* math bug has been fixed, 
    idea I have to decrease dashoffset to
     243, so 400-157= 243 and its decrease the currentTime 
     of songmp3.currentTime/songmp3.duration */
   console.log(400 - ((songmp3.currentTime/ songmp3.duration) * 157))
}, 1000)