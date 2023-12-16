const musicContainer = document.getElementById('music-container');
const masterPlay = document.getElementById('masterplay');
const backwardSkip = document.getElementById('backward');
const forwardSkip = document.getElementById('forward');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime')
const durationElement = document.getElementById('duration');
const prevTrack = document.getElementById('prev');
const nextTrack = document.getElementById('next');
const songName = document.getElementById('songName');
const songImage = document.getElementById('songImage');
const loopAllButton = document.getElementById('loop');


fetch('http://localhost:9000/')
    .then(res => res.json())
    .then(data => {
        // do this after fetch
        console.log('Data correct');

        let songIndex = 0
        let songStr = `${data[songIndex].source}`
        let audioElement = new Audio(songStr);
        
        // Volume
        audioElement.volume = 0.1 // 10%

        // Masterplay Play/Pause Click
        masterPlay.addEventListener('click', ()=>{
            if(audioElement.paused || audioElement.currentTime<=0){
                audioElement.play()
                masterPlay.classList.remove('bi-play-fill')
                masterPlay.classList.add('bi-pause-fill')

            }
            else{
                audioElement.pause()
                masterPlay.classList.add('bi-play-fill')
                masterPlay.classList.remove('bi-pause-fill')
            }
        })

        // data = array && populate the music cards
        data.forEach((music, i) => {
            const musicItem = document.createElement('div');
            musicItem.className = 'music-item'
            const innerhtml = `<div class="music-item-img">
            <img src="${music.cover_image}" alt="${music.title}">
        </div>
        <div class="info-play">
            <p class="title">${music.title}</p>
            <button class="btn-play ind-play"><i id="${i}" class="bi bi-play-fill"></i></button>
        </div>`
        musicItem.innerHTML = innerhtml
        musicContainer.append(musicItem)
        });

        // forward or backward 10s
        backwardSkip.addEventListener('click', ()=>{
            if(!audioElement.currentTime<=0){
                audioElement.currentTime-=10
            }
        })

        forwardSkip.addEventListener('click', ()=>{
            if(audioElement.duration-audioElement.currentTime>=11){
                audioElement.currentTime+=10
            }
        })
        
        // seekbar / progressbar
        audioElement.addEventListener('timeupdate', ()=>{
            let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
            progressBar.value = progress
        });
        // Change timing on clicking seekbar at some point
        progressBar.addEventListener('change', ()=>{
            audioElement.currentTime = (progressBar.value*audioElement.duration)/100
        })
        
        // currentime or duration 
        audioElement.addEventListener('timeupdate', () => {
            const currentTime = audioElement.currentTime;
            const duration = audioElement.duration;
        
            // Convert seconds to minutes and seconds
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
        
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = Math.floor(duration % 60);
        
            // Display the formatted time
            const formattedCT = `${currentMinutes}:${currentSeconds}`;
            const formattedDuration = `${durationMinutes}:${durationSeconds}`
            currentTimeElement.innerText = formattedCT
            durationElement.innerText = formattedDuration
        });

        // change the other btns to bi-play-fill
        const individualPlayBtns = document.getElementsByClassName('ind-play');
        const makeAllPlays = ()=>{
            Array.from(individualPlayBtns).forEach(element=>{
                element.classList.remove('bi-pause-fill')
                element.classList.add('bi-play-fill')
            })
        }
        // loop on the same thing
        audioElement.addEventListener('timeupdate', ()=>{
            if(audioElement.currentTime == audioElement.duration){
                audioElement.currentTime = 0
                audioElement.play()
            }
        })

        // play on individual clicking
        Array.from(individualPlayBtns).forEach((btn, i)=>{
            btn.addEventListener('click', (e)=>{
                if(audioElement.paused || audioElement.currentTime >0){
                    songIndex = i
                    masterPlay.classList.add('bi-pause-fill')
                    masterPlay.classList.remove('bi-play-fill')
                    e.target.classList.add('bi-pause-fill')
                    e.target.classList.remove('bi-play-fill')
                    audioElement.src = `${data[songIndex].source}`
                    audioElement.play()
                    songName.innerText = `${data[songIndex].title}`
                    songImage.src = `${data[songIndex].cover_image}`
                }
                else{
                    masterPlay.classList.remove('bi-pause-fill')
                    masterPlay.classList.add('bi-play-fill')
                    e.target.classList.remove('bi-pause-fill')
                    e.target.classList.add('bi-play-fill')
                    audioElement.pause()
                }
            })
        })
        prevTrack.addEventListener('click', ()=>{
                songIndex = (songIndex - 1 + data.length) % data.length;
                console.log('songindex', songIndex);
                audioElement.src = `${data[songIndex].source}`
                audioElement.currentTime = 0
                audioElement.play()
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });