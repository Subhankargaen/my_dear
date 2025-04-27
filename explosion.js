document.addEventListener('DOMContentLoaded', function() {
    function createRocket() {
        const rocket = document.createElement('div');
        rocket.className = 'rocket';
        rocket.style.left = `${Math.random() * 80 + 10}%`;
        rocket.style.bottom = '0';
        document.body.appendChild(rocket);

        // Add rocket trail
        const trail = document.createElement('div');
        trail.className = 'rocket-trail';
        rocket.appendChild(trail);

        // Animate rocket
        setTimeout(() => {
            rocket.style.transform = 'translateY(-100vh)';
        }, 100);

        return rocket;
    }

    function createExplosion() {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        document.body.appendChild(explosion);

        // Create and launch rockets
        const rockets = [];
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rocket = createRocket();
                rockets.push(rocket);
                
                // Create explosion when rocket reaches top
                setTimeout(() => {
                    rocket.remove();
                    createRocketExplosion(rocket.style.left);
                }, 2000);
            }, i * 500);
        }

        // Create main explosion after rockets
        setTimeout(() => {
            // Create initial flash
            const flash = document.createElement('div');
            flash.className = 'flash';
            explosion.appendChild(flash);

            // Create main particles
            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.setProperty('--x', x);
                particle.style.setProperty('--y', y);
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                explosion.appendChild(particle);
            }

            // Create sparkles
            for (let i = 0; i < 50; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.top = `${Math.random() * 100}%`;
                sparkle.style.animationDelay = `${Math.random() * 2}s`;
                explosion.appendChild(sparkle);
            }
        }, 2500);

        // Remove explosion after animation
        setTimeout(() => {
            explosion.remove();
            window.location.href = 'romantic.html';
        }, 7000);
    }

    function createRocketExplosion(leftPosition) {
        const rocketExplosion = document.createElement('div');
        rocketExplosion.className = 'rocket-explosion';
        rocketExplosion.style.left = leftPosition;
        rocketExplosion.style.top = '10%';
        document.body.appendChild(rocketExplosion);

        // Create rocket explosion particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'rocket-particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', x);
            particle.style.setProperty('--y', y);
            
            rocketExplosion.appendChild(particle);
        }

        // Remove rocket explosion after animation
        setTimeout(() => {
            rocketExplosion.remove();
        }, 2000);
    }

    // Add click event to surprise link
    const surpriseLink = document.querySelector('.surprise-link');
    if (surpriseLink) {
        surpriseLink.addEventListener('click', function(e) {
            e.preventDefault();
            createExplosion();
        });
    }
}); 