$(document).ready(function () {
    // Init Lenis Smooth Scroll
    // Init Lenis Smooth Scroll (Desktop Only)
    if (typeof Lenis !== 'undefined' && window.innerWidth > 768) {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect Lenis to AOS
        lenis.on('scroll', AOS.refresh);
    }

    // Init AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // 2. Navbar Scroll Effect & Scroll Progress
    $(window).scroll(function () {
        // Navbar
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('bg-dark').css('padding', '0.5rem 0');
        } else {
            $('.navbar').removeClass('bg-dark').css('padding', '1rem 0');;
        }

        // Progress Bar
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        $('#scrollProgress').css('width', scrolled + "%");
    });

    // 4. Countdown Timer
    // Target: March 5, 2026 6:30 AM
    const weddingDate = new Date("March 5, 2026 06:30:00").getTime();

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            $('#countdown-timer').addClass('d-none');
            $('#countdown-msg').removeClass('d-none');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#days').text(days < 10 ? '0' + days : days);
        $('#hours').text(hours < 10 ? '0' + hours : hours);
        $('#minutes').text(minutes < 10 ? '0' + minutes : minutes);
        $('#seconds').text(seconds < 10 ? '0' + seconds : seconds);
    }, 1000);

    // 5. RSVP Form Submission
    $('#rsvpForm').on('submit', function (e) {
        e.preventDefault();
        // Simulate processing
        const btn = $(this).find('button');
        const originalText = btn.text();
        btn.prop('disabled', true).text('Sending...');

        setTimeout(function () {
            $('#rsvpForm').fadeOut(500, function () {
                $('.success-animation').fadeIn();
            });
        }, 1500);
    });

    // 6. Music Toggle
    const audio = document.getElementById("bgMusic");
    let isPlaying = false;

    $('#musicToggle').click(function () {
        if (isPlaying) {
            audio.pause();
            $(this).html('<i class="fas fa-music"></i>');
            $(this).removeClass('btn-warning').addClass('btn-outline-warning');
        } else {
            audio.play().catch(function (e) {
                console.log("Audio play failed: ", e);
                alert("Please interact with the document first to play audio in some browsers.");
            });
            $(this).html('<i class="fas fa-pause"></i>');
            $(this).removeClass('btn-outline-warning').addClass('btn-warning');
        }
        isPlaying = !isPlaying;
    });

    // Init Jarallax
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
        });
    }
});
