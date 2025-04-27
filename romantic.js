document.addEventListener('DOMContentLoaded', function() {
    const romanticMusic = document.getElementById('romanticMusic');
    const musicToggle = document.getElementById('musicToggle');
    const heartButton = document.querySelector('.heart-button');
    let isMusicPlaying = false;

    // Music control functionality
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            romanticMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
        } else {
            romanticMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = '0';
        heart.style.transform = 'translateY(0)';
        heart.style.transition = 'all 6s ease-in-out';
        document.querySelector('.floating-hearts').appendChild(heart);

        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = 'translateY(-100vh)';
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create twinkling stars
    function createStar() {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'fixed';
        star.style.fontSize = Math.random() * 15 + 5 + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = '0';
        star.style.transition = 'all 3s ease-in-out';
        document.querySelector('.twinkling-stars').appendChild(star);

        setTimeout(() => {
            star.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            star.style.opacity = '0';
            setTimeout(() => {
                star.remove();
            }, 3000);
        }, 3000);
    }

    // Create initial animations
    setInterval(createHeart, 300);
    setInterval(createStar, 500);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to the heart button
    heartButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    heartButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.story-content, .wish-content, .dream-item, .gallery-item, .quote-item').forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Try to play the music automatically
    const playMusic = () => {
        romanticMusic.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Show a play button if autoplay is prevented
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i> Play Music';
            playButton.className = 'music-button';
            playButton.style.position = 'fixed';
            playButton.style.top = '20px';
            playButton.style.right = '20px';
            playButton.style.zIndex = '1000';
            document.body.appendChild(playButton);

            playButton.addEventListener('click', () => {
                romanticMusic.play();
                playButton.remove();
            });
        });
    };

    // Try to play when the page loads
    playMusic();

    // Also try to play when the user interacts with the page
    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
}); 