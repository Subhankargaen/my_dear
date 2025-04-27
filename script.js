document.addEventListener('DOMContentLoaded', function() {
    const romanticMusic = document.getElementById('romanticMusic');
    const musicToggle = document.getElementById('musicToggle');
    const heartButton = document.querySelector('.heart-button');
    const hiddenMessages = document.querySelector('.hidden-messages');
    const messageItems = document.querySelectorAll('.message-item');
    let currentMessageIndex = 0;
    let isMusicPlaying = false;
    const footer = document.querySelector('footer');

    // Show footer when scrolled to end
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    });

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
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = 'translateY(-100vh)';
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create floating kisses
    function createKiss() {
        const kiss = document.createElement('div');
        kiss.innerHTML = '💋';
        kiss.style.position = 'fixed';
        kiss.style.fontSize = Math.random() * 20 + 10 + 'px';
        kiss.style.left = Math.random() * 100 + 'vw';
        kiss.style.top = '100vh';
        kiss.style.opacity = '0';
        kiss.style.transform = 'translateY(0) rotate(0deg)';
        kiss.style.transition = 'all 8s ease-in-out';
        document.body.appendChild(kiss);

        setTimeout(() => {
            kiss.style.opacity = '1';
            kiss.style.transform = 'translateY(-100vh) rotate(360deg)';
        }, 100);

        setTimeout(() => {
            kiss.remove();
        }, 8000);
    }

    // Create initial animations
    setInterval(createHeart, 300);
    setInterval(createKiss, 500);

    // Handle heart button click
    heartButton.addEventListener('click', function() {
        // Show hidden messages container
        hiddenMessages.classList.add('visible');

        // Show messages one by one
        if (currentMessageIndex < messageItems.length) {
            messageItems[currentMessageIndex].classList.add('visible');
            currentMessageIndex++;

            // Create extra hearts and kisses
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createHeart();
                    createKiss();
                }, i * 100);
            }
        }

        // Reset after all messages are shown
        if (currentMessageIndex >= messageItems.length) {
            setTimeout(() => {
                messageItems.forEach(item => item.classList.remove('visible'));
                hiddenMessages.classList.remove('visible');
                currentMessageIndex = 0;
            }, 10000);
        }
    });

    // Add hover effect to the heart button
    heartButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    heartButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}); 