  // ---------- Envelope open ----------
  const envelope = document.getElementById('envelope');
  const envScreen = document.getElementById('envelope-screen');
  const nav = document.getElementById('nav');
  const music = document.getElementById('bg-music');

  envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
      envScreen.classList.add('opened');
      nav.classList.add('show');
      music.play().catch(()=>{});
      document.getElementById('music-toggle').classList.add('spin');
    }, 750);
  });

  // ---------- Music toggle ----------
  const musicBtn = document.getElementById('music-toggle');
  musicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play().catch(()=>{});
      musicBtn.classList.add('spin');
    } else {
      music.pause();
      musicBtn.classList.remove('spin');
    }
  });

  // ---------- Countdown ----------
  const weddingDate = new Date('2026-11-01T08:00:00+07:00').getTime();
  function updateCountdown(){
    const now = Date.now();
    const diff = Math.max(0, weddingDate - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---------- 3D Gallery: tap a photo to rotate it to the front ----------
  const galleryRing = document.getElementById('gallery-ring');
  if (galleryRing) {
    const galleryItems = galleryRing.querySelectorAll('.gal-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const angle = parseInt(item.dataset.angle, 10) || 0;
        galleryRing.style.transform = `rotateY(${-angle}deg)`;
        galleryItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // ---------- RSVP form ----------
  document.getElementById('rsvp-form').addEventListener('submit', function(e){
    e.preventDefault();
    // TODO: thay bằng gọi API / Google Form / email thật của bạn
    this.style.display = 'none';
    document.getElementById('rsvp-msg').style.display = 'block';
  });
