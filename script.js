// Nhạc nền
const audio = document.getElementById("bg-music");
const songs = ["music/song1.mp3","music/song2.mp3"];
let currentSong = 0;
audio.src = songs[currentSong];
audio.volume = 0.8;
audio.play().catch(() => {
  document.body.addEventListener("click",()=>audio.play(),{once:true});
});
audio.addEventListener("ended",()=>{
  currentSong = (currentSong+1)%songs.length;
  audio.src = songs[currentSong];
  audio.play();
});

// Volume control
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
volumeIcon.addEventListener("click",(e)=>{
  e.stopPropagation();
  if(audio.muted||audio.volume===0){
    audio.muted=false;
    audio.volume=volumeSlider.value||0.8;
    volumeIcon.className="fa-solid fa-volume-high";
  }else{
    audio.muted=true;
    volumeIcon.className="fa-solid fa-volume-xmark";
  }
});
volumeSlider.addEventListener("input",()=>{
  audio.volume=volumeSlider.value;
  if(audio.volume==0){
    audio.muted=true;
    volumeIcon.className="fa-solid fa-volume-xmark";
  }else{
    audio.muted=false;
    volumeIcon.className="fa-solid fa-volume-high";
  }
});

// Fade-in/out khi scroll
const fadeElements = document.querySelectorAll(".fade");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
    else entry.target.classList.remove("show");
  });
},{threshold:0.5});
fadeElements.forEach(el=>observer.observe(el));

// Copy Discord
function copyDiscord(){
  const tag=document.getElementById("discord-tag").innerText;
  navigator.clipboard.writeText(tag);
  alert("Đã copy Discord: "+tag);
}
