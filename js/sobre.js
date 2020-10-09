

/*
Na execusão da pagina Sobre.html queriamos, inicialmente, implementar um video que desse para que o jogador, ao dar scroll, navegasse pela pagina de forma mais facil replicando a pagina dos airpods da apple (https://www.apple.com/pt/airpods-pro/)
No entanto acabamos por alterar a forma como a pagina se apresenta. 
Codigo Abandonado do Scroll
*/

/*
var frameNumber = 0, // start video at frame 0
    // lower numbers = faster playback
    playbackConst = 500, 
    // get page height from video duration
    setHeight = document.getElementById("set-height"), 
    // select video element         
    vid = document.getElementById('v0'); 
    // var vid = $('#v0')[0]; // jquery option

// dynamically set the page height according to video length
vid.addEventListener('loadedmetadata', function() {
  setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
});


// Use requestAnimationFrame for smooth playback
setInterval(function scrollPlay(){  
  
  
  frameNumber  = window.pageYOffset/playbackConst;

  vid.currentTime  = frameNumber;
  console.log(vid.currentTime);
  
}, window.pageYOffset);

*/