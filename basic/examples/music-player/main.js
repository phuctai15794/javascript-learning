/* Document */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* Variables */
const player = $('.player');
const heading = $('header h2');
const singer = $('header h5');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const togglePlay = $('.btn-toggle-play');
const toggleRepeat = $('.btn-repeat');
const toggleRandom = $('.btn-random');
const toggleAutoNav= $('.btn-autonav input[type=checkbox]');
const btnVolume = $('.btn-volume');
const iconVolumes = $$('.btn-volume i');
const volume = $('#volume');
const btnPrev = $('.btn-prev');
const btnNext = $('.btn-next');
const playlists = $('.playlists');
const progress = $('#progress');
var listsRanded = [];

/* App */
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isAutoNav: false,
    isMuted: false,
    nowVolume: audio.volume,
    isVolumeChange: false,
    thumbsAnimation: [],
    songs: [
        {
            name: "Stay",
            singer: "The Kid LAROI, Justin Bieber",
            path: "https://aredir.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3",
            image: "https://i.ytimg.com/vi/kTJczUoc26U/maxresdefault.jpg"
        },
        {
            name: "Easy On Me",
            singer: "Adele",
            path: "https://aredir.nixcdn.com/Sony_Audio93/EasyOnMe-Adele-7107614.mp3",
            image: "https://i.ytimg.com/vi/X-yIEMduRXk/maxresdefault.jpg"
        },
        {
            name: "Peaches",
            singer: "Justin Bieber, Daniel Caesar, Giveon",
            path: "https://aredir.nixcdn.com/Unv_Audio197/Peaches-JustinBieberDanielCaesarGiveon-6993755.mp3",
            image: "https://i.ytimg.com/vi/tQ0yjYUFKAE/maxresdefault.jpg"
        },
        {
            name: "Industry Baby",
            singer: "Lil Nas X, Jack Harlow",
            path: "https://aredir.nixcdn.com/NhacCuaTui1018/IndustryBaby-LilNasXJackHarlow-7053307.mp3",
            image: "https://i.ytimg.com/vi/UTHLKHL_whs/maxresdefault.jpg"
        },
        {
            name: "My Universe",
            singer: "Coldplay, BTS (Bangtan Boys)",
            path: "https://aredir.nixcdn.com/Warner_Audio72/MyUniverse-ColdplayXBTS-7096238.mp3",
            image: "https://i.ytimg.com/vi/3YqPKLZF_WU/maxresdefault.jpg"
        },
        {
            name: "Bad Habits",
            singer: "Ed Sheeran",
            path: "https://aredir.nixcdn.com/Warner_Audio71/BadHabits-EdSheeran-7037077.mp3?st=1CVF6etqLIfgxTzNb69Qtw&e=1643078146",
            image: "https://i.ytimg.com/vi/orJSJGHjBLI/maxresdefault.jpg"
        },
        {
            name: "You Right",
            singer: "Doja Cat, The Weeknd",
            path: "https://aredir.nixcdn.com/NhacCuaTui1017/YouRight-DojaCatTheWeeknd-7037205.mp3",
            image: "https://i.ytimg.com/vi/JXgV1rXUoME/maxresdefault.jpg"
        }
    ],
    defineProperties() {
        Object.defineProperties(this, {
            'currentSong': {
                get() {
                    return this.songs[this.currentIndex];
                }
            }
        });
    },
    render() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });

        playlists.innerHTML = htmls.join('');
    },
    handleEvents() {
        const _thisApp = this;
        const cdWidth = cd.offsetWidth;

        // Make poster animation
        const cdThumbAnimate = this.cdAnimation(cdThumb);
        
        // Default pause poster animation onload
        if(cdThumbAnimate) {
            cdThumbAnimate.pause();
        }

        // Scroll
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Play/Pause
        togglePlay.onclick = () => {
            if(_thisApp.isPlaying == true) {
                audio.pause();
            }
            else if(_thisApp.isPlaying == false) {
                audio.play();
            }
        };

        // Repeat
        toggleRepeat.onclick = () => {
            _thisApp.isRepeat = !_thisApp.isRepeat;
            audio.loop = _thisApp.isRepeat;
            toggleRepeat.classList.toggle('active');
        };

        // Random
        toggleRandom.onclick = () => {
            _thisApp.isRandom = !_thisApp.isRandom;
            toggleRandom.classList.toggle('active');
        };
        
        // AutoNav
        toggleAutoNav.onchange = () => {
            _thisApp.isAutoNav = !_thisApp.isAutoNav;
        };
        
        // Prev
        btnPrev.onclick = () => {
            if(_thisApp.isRandom) {
                _thisApp.random();
            } else {
                _thisApp.prev();
            }

            _thisApp.activeSong();
            _thisApp.resetSeekbar();
            _thisApp.loadRange(progress);
            _thisApp.scrollToActive();

            if(_thisApp.isPlaying) {
                audio.play();
            }
        };
        
        // Next
        btnNext.onclick = () => {
            if(_thisApp.isRandom) {
                _thisApp.random();
            } else {
                _thisApp.next();
            }

            _thisApp.activeSong();
            _thisApp.resetSeekbar();
            _thisApp.loadRange(progress);
            _thisApp.scrollToActive();

            if(_thisApp.isPlaying) {
                audio.play();
            }
        };
        
        // Volumes icon
        iconVolumes.forEach(volume => {
            volume.onclick = () => {
                _thisApp.isMuted = !_thisApp.isMuted;
                audio.volume = _thisApp.isMuted ? 0 : ((_thisApp.nowVolume > 0) ? _thisApp.nowVolume : 1);
                _thisApp.volume(audio.volume);
            }
        });
        
        // Volume mouse over
        btnVolume.onmouseover = () => {
            volume.style.opacity = 1;
            volume.style.bottom = 0;
            volume.style.visibility = 'visible';
            volume.style.transition = "all 0.5s";
        };
        
        // Volume mouse out
        btnVolume.onmouseout = () => {
            volume.style.opacity = 0;
            volume.style.bottom = '15px';
            volume.style.visibility = 'hidden';
            volume.style.transition = "all 0.5s";
        };

        // Check audio onplay
        audio.onplay = () => {
            _thisApp.isPlaying = true;
            cdThumbAnimate.play();
            player.classList.add('playing');
        };
        
        // Check audio onpause
        audio.onpause = () => {
            _thisApp.isPlaying = false;
            cdThumbAnimate.pause();
            player.classList.remove('playing');
        };
        
        // Check audio onended
        audio.onended = () => {
            if(_thisApp.isAutoNav) {
                if(_thisApp.isRandom) {
                    _thisApp.random();
                } else {
                    _thisApp.next();
                }
                
                _thisApp.activeSong();
                _thisApp.resetSeekbar();
                _thisApp.loadRange(progress);
                _thisApp.scrollToActive();
                audio.play();
            }
        };

        // Check audio change time
        audio.ontimeupdate = () => {
            if(_thisApp.isPlaying) {
                const progressPercent = Math.floor((audio.currentTime * 100) / audio.duration);
                progress.value = progressPercent;
                _thisApp.loadRange(progress);
            }
        };

        // Check audio change volume
        audio.onvolumechange = () => {
            if(audio.src && (!this.isMuted || this.isVolumeChange)) {
                this.isVolumeChange = this.isMuted = false;
                _thisApp.volume(audio.volume);
            }
        };
        
        // Check change volume song when drag
        volume.oninput = () => {
            if(audio.src) {
                const newVolume = volume.value / 100;
                audio.volume = newVolume >= 0 ? newVolume : 0;
                _thisApp.nowVolume = audio.volume;
                _thisApp.isVolumeChange = true;
                _thisApp.loadRange(volume);
                _thisApp.volume(audio.volume);
            }
        };

        // Check change seek song
        progress.oninput = () => {
            if(audio.src) {
                const seekTime = (progress.value * audio.duration) / 100;
                audio.currentTime = seekTime >= 0 ? seekTime : 0;
                _thisApp.loadRange(progress);
            }
        };

        // Delegate: Change song when user click one of song in the playlists
        playlists.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)');
            const optionNode = e.target.closest('.option');

            // Song click
            if(songNode && !optionNode) {
                const index = songNode.dataset.index;
                this.currentIndex = index;
                this.activeSong();
                this.loadSong();
                this.resetSeekbar();
                this.loadRange(progress);
                this.scrollToActive();
                audio.play();
            }

            // Option click
            if(optionNode) {
                console.log('This is an option');
            }
        };
    },
    loadSong() {
        heading.innerText = this.currentSong.name;
        singer.innerText = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    activeSong() {
        playlists.querySelector('.song.active').classList.remove('active');
        playlists.querySelector('.song[data-index="' + this.currentIndex + '"]').classList.add('active');
    },
    thumbAnimation() {
        // Init animation for all thumb
        const items = playlists.querySelectorAll('.song');
        
        if(items && items.length) {
            items.forEach((item, index) => {
                const thumb = item.querySelector('.thumb');
            
                if(thumb) {
                    const thumbAnimate = this.cdAnimation(thumb);
            
                    if(thumbAnimate) {
                        this.thumbsAnimation.push({
                            [index]: thumbAnimate
                        });
                        
                        thumbAnimate.pause();
                    }
                }
            });
        }
    },
    scrollToActive() {
        setTimeout(() => {
            playlists.querySelector('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 300);
    },
    resetSeekbar() {
        progress.value = 0;
    },
    prev() {
        this.currentIndex--;

        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }

        this.loadSong();
    },
    next() {
        this.currentIndex++;

        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }

        this.loadSong();
    },
    random() {
        let newIndex;

        if(listsRanded.length === 0) {
            listsRanded.push(this.currentIndex);
        }

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex || listsRanded.includes(newIndex));

        listsRanded.push(newIndex);
        this.currentIndex = newIndex;

        if(listsRanded.length === this.songs.length) {
            listsRanded = [];
        }

        this.loadSong();
    },
    volume(newVolume = 0) {
        let iconVolume = 'fa-volume-';

        if(newVolume === 0) {
            iconVolume += 'off';
        } else if(newVolume > 0 && newVolume <= 0.5) {
            iconVolume += 'down';
        } else if(newVolume > 0.5 && newVolume <= 1) {
            iconVolume += 'up';
        }

        // Check range volume
        if (!this.isMuted) {
            volume.value = newVolume * 100;
        }

        // Check icon volume
        btnVolume.querySelector('i.active').classList.remove('active');

        if(this.isMuted) {
            btnVolume.querySelector('i.fa-volume-mute').classList.add('active');
        } else {
            btnVolume.querySelector('i.' + iconVolume).classList.add('active');
        }
    },
    loadRange(obj = null) {
        if(obj) {
            const percent = (obj.value - obj.min) / (obj.max - obj.min) * 100;
            obj.style.backgroundImage = 'linear-gradient(to right, #ec1f55 0%, #ec1f55 ' + percent + '%, #dddddd ' + percent + '%, #dddddd 100%)';
        }
    },
    cdAnimation(obj = null) {
        let objAnimation;

        if (obj) {
            objAnimation = obj.animate([
                {
                    transform: 'rotate(360deg)'
                }
            ], {
                duration: 8000,
                iterations: Infinity
            });
        }

        return objAnimation;
    },
    start() {
        // Define properties for object
        this.defineProperties();

        // Handle
        this.handleEvents();

        // Load first song
        this.loadSong();

        // Render playlists
        this.render();

        // Init thumb animation
        this.thumbAnimation();
    }
};

app.start();