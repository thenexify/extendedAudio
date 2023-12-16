const toggleButton = document.getElementById('togglePlayer');
const player = document.getElementById('player');
const nowPlayingStatus = player.getElementsByClassName('status')[0]
const coverImage = document.getElementById('songImage');
const songDetailsElem = document.getElementById('xgxce')
const songNameElem = document.getElementById('songName')
const controlButtons = document.getElementsByClassName('controls')[0].getElementsByClassName('btn-play')
const mediaControlBtns = document.getElementsByClassName('mediaControl')[0].getElementsByClassName('flex-row')[0]



toggleButton.addEventListener('click', ()=>{
    player.classList.toggle('player-fullHeight')
    nowPlayingStatus.classList.toggle('vizib')
    coverImage.classList.toggle('img-fullsize')
    songDetailsElem.classList.toggle('flex-column')
    songNameElem.classList.toggle('lgf2')
    mediaControlBtns.classList.toggle('vizz')
    toggleButton.classList.toggle('rotate')
})