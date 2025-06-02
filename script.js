let isMuted = false;
let musicInitialized = false;

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

document.addEventListener('DOMContentLoaded', function() {
    const particleCount = isMobile ? 40 : 80;
    const particleSpeed = isMobile ? 1 : 2;
    
    particlesJS('particles-js', {
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 800 } },
            color: { value: "#ff3e3e" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#4a00e0", opacity: 0.4, width: 1 },
            move: { enable: true, speed: particleSpeed, direction: "none", random: true }
        },
        interactivity: {
            detect_on: isMobile ? "window" : "canvas",
            events: {
                onhover: { enable: !isMobile, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
    
    // Use touchend event for mobile devices
    if (isMobile) {
        document.getElementById('intro-screen').addEventListener('touchend', handleIntroClick);
        document.getElementById('mute-btn').addEventListener('touchend', handleMuteToggle);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize();
});

function handleResize() {
    const card = document.querySelector('.card');
    if (card) {
        if (window.innerHeight < 700) {
            card.style.overflowY = 'auto';
            card.style.maxHeight = 'calc(100vh - 40px)';
        } else {
            card.style.overflowY = 'visible';
            card.style.maxHeight = 'none';
        }
    }
}

function handleIntroClick() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const musicPlayer = document.getElementById('music-player');
    
    if (!musicInitialized) {
        // YouTube video ID for the music - this is just an example, replace with your desired music
        const youtubeVideoId = "zIwaiK1IXTc"; // Replace with your preferred YouTube music video ID
        const autoplayParam = isIOS ? '0' : '1';
        
        musicPlayer.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${autoplayParam}&mute=0&controls=0&loop=1&playlist=${youtubeVideoId}`;
        musicInitialized = true;
        
        console.log("YouTube music initialized");
        
        if (isIOS) {
            alert("For the best experience, please unmute your device!");
        }
    }
    
    introScreen.style.opacity = '0';
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);
    }, 1000);
}

function handleMuteToggle() {
    const muteBtn = document.getElementById('mute-btn');
    const musicPlayer = document.getElementById('music-player');
    
    isMuted = !isMuted;
    
    if (isMuted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        
        if (musicPlayer.src.includes('&mute=0')) {
            musicPlayer.src = musicPlayer.src.replace('&mute=0', '&mute=1');
        } else {
            musicPlayer.src = musicPlayer.src + '&mute=1';
        }
    } else {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        
        if (musicPlayer.src.includes('&mute=1')) {
            musicPlayer.src = musicPlayer.src.replace('&mute=1', '&mute=0');
        } else {
            musicPlayer.src = musicPlayer.src + '&mute=0';
        }
    }
}

// Event listeners
document.getElementById('intro-screen').addEventListener('click', handleIntroClick);
document.getElementById('mute-btn').addEventListener('click', handleMuteToggle);
