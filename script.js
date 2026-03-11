/* ============================================================
   PABASARA STUDIO — script.js
   All JavaScript for pabasara-studio website
============================================================ */

// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
  });
  function animateRing() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(3)';
      ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.opacity = '1';
    });
  });

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Gallery filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form submit feedback
  // Form Submit — Formspree
document.querySelector('.btn-submit').addEventListener('click', function() {
  const btn = this;
  const data = {
    name    : document.querySelector('input[placeholder="Dilshan"]').value + ' ' 
            + document.querySelector('input[placeholder="Perera"]').value,
    email   : document.querySelector('input[type="email"]').value,
    phone   : document.querySelector('input[type="tel"]').value,
    service : document.querySelector('select').value,
    date    : document.querySelector('input[type="date"]').value,
    message : document.querySelector('textarea').value,
  };

  if (!data.email) { alert('pabasaraweerasinghapersonal@gmail.com'); return; }

  btn.querySelector('span').textContent = 'Sending...';

  fetch('https://formspree.io/f/xbdzoabb', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      btn.querySelector('span').textContent = '✓ Message Sent!';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--dark)';
      setTimeout(() => {
        btn.querySelector('span').textContent = 'Send Inquiry →';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }
  })
  .catch(() => {
    btn.querySelector('span').textContent = '✗ Failed. Try Again';
    setTimeout(() => {
      btn.querySelector('span').textContent = 'Send Inquiry →';
    }, 3000);
  });
});
  

  /* ══════════════════════════════════════
     SYSTEM MONITOR
  ══════════════════════════════════════ */
  const sysMonitor = document.getElementById('sysMonitor');
  const sysToggle  = document.getElementById('sysToggle');

  sysToggle.addEventListener('click', () => sysMonitor.classList.toggle('open'));

  // Simulate realistic CPU / RAM / Disk values (browser has no real access)
  let cpuBase = 18, ramBase = 52, diskBase = 67;
  let startTime = Date.now();

  function updateStats() {
    // Simulate gentle fluctuation
    cpuBase  = Math.max(5,  Math.min(95,  cpuBase  + (Math.random() - 0.5) * 8));
    ramBase  = Math.max(30, Math.min(90,  ramBase  + (Math.random() - 0.5) * 3));
    diskBase = Math.max(20, Math.min(95,  diskBase + (Math.random() - 0.5) * 0.5));

    const cpu  = Math.round(cpuBase);
    const ram  = Math.round(ramBase);
    const disk = Math.round(diskBase);

    document.getElementById('cpuVal').textContent  = cpu  + '%';
    document.getElementById('ramVal').textContent  = ram  + '%';
    document.getElementById('diskVal').textContent = disk + '%';
    document.getElementById('cpuBar').style.width  = cpu  + '%';
    document.getElementById('ramBar').style.width  = ram  + '%';
    document.getElementById('diskBar').style.width = disk + '%';

    // Color warning
    const cpuBar = document.getElementById('cpuBar');
    cpuBar.style.background = cpu > 80
      ? 'linear-gradient(90deg,#c96e6e,#e8a3a3)'
      : 'linear-gradient(90deg,#c9a96e,#e8d5a3)';

    // Uptime
    const secs  = Math.floor((Date.now() - startTime) / 1000);
    const mins  = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const uptimeStr = hours > 0
      ? `${hours}h ${mins % 60}m ${secs % 60}s`
      : mins > 0 ? `${mins}m ${secs % 60}s` : `${secs}s`;
    document.getElementById('sysUptime').textContent = 'Session: ' + uptimeStr;
  }

  // Open by default after a moment
  setTimeout(() => { sysMonitor.classList.add('open'); updateStats(); }, 1500);
  setInterval(updateStats, 2000);

  /* ══════════════════════════════════════
     MUSIC PLAYER
  ══════════════════════════════════════ */
  const audioEl       = document.getElementById('audioEl');
  const musicBar      = document.getElementById('musicBar');
  const musicFab      = document.getElementById('musicFab');
  const playBtn       = document.getElementById('playBtn');
  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');
  const shuffleBtn    = document.getElementById('shuffleBtn');
  const repeatBtn     = document.getElementById('repeatBtn');
  const progressFill  = document.getElementById('progressFill');
  const progressTrack = document.getElementById('progressTrack');
  const curTimeEl     = document.getElementById('curTime');
  const durTimeEl     = document.getElementById('durTime');
  const musicTitle    = document.getElementById('musicTitle');
  const musicArtist   = document.getElementById('musicArtist');
  const musicThumb    = document.getElementById('musicThumb');
  const musicInput    = document.getElementById('musicInput');
  const uploadBtn     = document.getElementById('uploadBtn');
  const playlistBtn   = document.getElementById('playlistBtn');
  const playlistPanel = document.getElementById('playlistPanel');
  const playlistItems = document.getElementById('playlistItems');
  const playlistCount = document.getElementById('playlistCount');
  const volTrack      = document.getElementById('volTrack');
  const volFill       = document.getElementById('volFill');
  const volIcon       = document.getElementById('volIcon');

  let playlist    = [];
  let currentIdx  = 0;
  let isPlaying   = false;
  let isShuffle   = false;
  let isRepeat    = false;
  let volume      = 0.7;

  audioEl.volume = volume;
  volFill.style.width = (volume * 100) + '%';

  // FAB — handled by PIN lock below

  // Upload songs
  uploadBtn.addEventListener('click', () => musicInput.click());
  musicInput.addEventListener('change', e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, '');
      playlist.push({ url, name, artist: 'Local File', duration: '—' });
    });
    renderPlaylist();
    if (playlist.length === files.length) loadTrack(0); // first load
    playlistCount.textContent = playlist.length + ' song' + (playlist.length !== 1 ? 's' : '');
  });

  function loadTrack(idx) {
    if (!playlist.length) return;
    currentIdx = (idx + playlist.length) % playlist.length;
    const track = playlist[currentIdx];
    audioEl.src = track.url;
    musicTitle.textContent  = track.name;
    musicArtist.textContent = track.artist;
    musicThumb.innerHTML    = '🎵';
    if (isPlaying) audioEl.play();
    renderPlaylist();
  }

  function togglePlay() {
    if (!playlist.length) { uploadBtn.click(); return; }
    if (isPlaying) {
      audioEl.pause();
      playBtn.textContent = '▶';
      isPlaying = false;
    } else {
      audioEl.play();
      playBtn.textContent = '⏸';
      isPlaying = true;
    }
  }

  playBtn.addEventListener('click', togglePlay);

  prevBtn.addEventListener('click', () => {
    loadTrack(currentIdx - 1);
    if (isPlaying) audioEl.play();
  });
  nextBtn.addEventListener('click', () => {
    const next = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : currentIdx + 1;
    loadTrack(next);
    if (isPlaying) audioEl.play();
  });

  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
  });
  repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    audioEl.loop = isRepeat;
  });

  // Progress bar
  audioEl.addEventListener('timeupdate', () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    progressFill.style.width = pct + '%';
    curTimeEl.textContent = fmtTime(audioEl.currentTime);
  });
  audioEl.addEventListener('loadedmetadata', () => {
    durTimeEl.textContent = fmtTime(audioEl.duration);
    // Update playlist duration
    if (playlist[currentIdx]) {
      playlist[currentIdx].duration = fmtTime(audioEl.duration);
      renderPlaylist();
    }
  });
  audioEl.addEventListener('ended', () => {
    if (!isRepeat) {
      const next = isShuffle
        ? Math.floor(Math.random() * playlist.length)
        : currentIdx + 1;
      if (next < playlist.length || isShuffle) {
        loadTrack(next);
        audioEl.play();
      } else {
        isPlaying = false;
        playBtn.textContent = '▶';
      }
    }
  });

  progressTrack.addEventListener('click', e => {
    if (!audioEl.duration) return;
    const rect = progressTrack.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audioEl.currentTime = pct * audioEl.duration;
  });

  // Volume
  volTrack.addEventListener('click', e => {
    const rect = volTrack.getBoundingClientRect();
    volume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEl.volume   = volume;
    volFill.style.width = (volume * 100) + '%';
    volIcon.textContent = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';
  });

  // Playlist panel
  playlistBtn.addEventListener('click', () => {
    playlistPanel.classList.toggle('open');
  });

  function renderPlaylist() {
    playlistItems.innerHTML = '';
    playlist.forEach((track, i) => {
      const item = document.createElement('div');
      item.className = 'playlist-item' + (i === currentIdx ? ' active' : '');
      item.innerHTML = `
        <span class="pl-num">${i === currentIdx && isPlaying
          ? '<span class="pl-eq"><span></span><span></span><span></span></span>'
          : (i + 1)}</span>
        <div class="pl-info">
          <div class="pl-title">${track.name}</div>
          <div class="pl-dur">${track.duration}</div>
        </div>`;
      item.addEventListener('click', () => {
        loadTrack(i);
        isPlaying = true;
        audioEl.play();
        playBtn.textContent = '⏸';
      });
      playlistItems.appendChild(item);
    });
    playlistCount.textContent = playlist.length + ' song' + (playlist.length !== 1 ? 's' : '');
  }

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  // Close playlist when clicking outside
  document.addEventListener('click', e => {
    if (!playlistPanel.contains(e.target) && e.target !== playlistBtn) {
      playlistPanel.classList.remove('open');
    }
  });

  /* ══════════════════════════════════════
     MUSIC PIN LOCK
  ══════════════════════════════════════ */
  const musicPinOverlay = document.getElementById('musicPinOverlay');
  const pinDots         = document.getElementById('pinDots').querySelectorAll('span');
  const pinError        = document.getElementById('pinError');
  const pinClose        = document.getElementById('pinClose');

  const CORRECT_PIN = '6969'; // ← change your PIN here
  let pinEntry   = '6969';
  let unlocked   = false;

  // FAB click — show PIN if locked, toggle bar if unlocked
  musicFab.addEventListener('click', () => {
    if (unlocked) {
      const open = musicBar.classList.toggle('visible');
      musicFab.textContent = open ? '✕' : '🎵';
      musicFab.classList.toggle('bar-open', open);
    } else {
      pinEntry = '';
      updatePinDots();
      pinError.textContent = '';
      musicPinOverlay.classList.add('open');
    }
  });

  pinClose.addEventListener('click', () => {
    musicPinOverlay.classList.remove('open');
  });

  document.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.k;
      if (k === 'clear') {
        pinEntry = pinEntry.slice(0, -1);
        pinError.textContent = '';
        updatePinDots();
      } else if (k === 'enter') {
        checkPin();
      } else {
        if (pinEntry.length < 4) {
          pinEntry += k;
          updatePinDots();
          if (pinEntry.length === 4) setTimeout(checkPin, 200);
        }
      }
    });
  });

  function updatePinDots() {
    pinDots.forEach((d, i) => {
      d.className = '';
      if (i < pinEntry.length) d.classList.add('filled');
    });
  }

  function checkPin() {
    if (pinEntry === CORRECT_PIN) {
      unlocked = true;
      musicPinOverlay.classList.remove('open');
      musicBar.classList.add('visible');
      musicFab.textContent = '✕';
      musicFab.classList.add('bar-open');
    } else {
      pinDots.forEach(d => { d.className = 'error'; });
      pinError.textContent = 'Wrong PIN. Try again.';
      setTimeout(() => {
        pinEntry = '';
        updatePinDots();
        pinError.textContent = '';
      }, 800);
    }
  }

  /* ══════════════════════════════════════
     CAMERA LENS PARALLAX
  ══════════════════════════════════════ */
  (function() {
    const lensWrap = document.getElementById('lensWrap');
    if (!lensWrap) return;
    let lensX = 0, lensY = 0;
    let targetLX = 0, targetLY = 0;

    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetLX = (e.clientX - cx) / cx * 18;
      targetLY = (e.clientY - cy) / cy * 12;
    });

    function lensLoop() {
      lensX += (targetLX - lensX) * 0.06;
      lensY += (targetLY - lensY) * 0.06;
      lensWrap.style.transform = `translateY(-50%) translate(${lensX}px, ${lensY}px)`;
      requestAnimationFrame(lensLoop);
    }
    lensLoop();

    // Click to animate aperture
    lensWrap.addEventListener('click', () => {
      const blades = lensWrap.querySelectorAll('.lens-blade');
      blades.forEach(b => {
        b.style.transition = 'transform 0.4s ease';
        const cur = parseFloat(b.style.transform?.replace(/[^0-9.-]/g,'') || b.getAttribute('data-rot') || 0);
      });
      lensWrap.classList.toggle('clicked');
      const center = lensWrap.querySelector('.lens-center');
      center.style.transition = 'all 0.5s ease';
      if (lensWrap.classList.contains('clicked')) {
        center.style.background = 'radial-gradient(circle at 38% 35%, rgba(201,169,110,0.4) 0%, rgba(255,200,50,0.1) 40%, rgba(0,0,0,0.95) 100%)';
        center.style.boxShadow = '0 0 0 1px rgba(201,169,110,0.6), 0 0 40px rgba(201,169,110,0.4), inset 0 0 15px rgba(0,0,0,0.8)';
      } else {
        center.style.background = '';
        center.style.boxShadow = '';
      }
    });
  })();

  /* ══════════════════════════════════════
     WHATSAPP BUSINESS WORKSPACE
  ══════════════════════════════════════ */
  (function() {
    // ⚠️ Replace with your real WhatsApp Business number (international format, no +)
    const WA_NUMBER = '94772578848';

    const waFab       = document.getElementById('waFab');
    const waWorkspace = document.getElementById('waWorkspace');
    const waClose     = document.getElementById('waClose');
    const waChat      = document.getElementById('waChat');
    const waInput     = document.getElementById('waInput');
    const waSendBtn   = document.getElementById('waSendBtn');
    const waTyping    = document.getElementById('waTyping');
    const waOpenLink  = document.getElementById('waOpenLink');

    // Toggle workspace
    waFab.addEventListener('click', () => {
      waWorkspace.classList.toggle('open');
      if (waWorkspace.classList.contains('open')) {
        waChat.scrollTop = waChat.scrollHeight;
      }
    });
    waClose.addEventListener('click', () => waWorkspace.classList.remove('open'));

    // Quick reply buttons
    document.querySelectorAll('.wa-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.dataset.msg;
        waInput.value = msg;
        sendMessage(msg);
        waInput.value = '';
      });
    });

    // Send button
    waSendBtn.addEventListener('click', () => {
      const msg = waInput.value.trim();
      if (msg) { sendMessage(msg); waInput.value = ''; }
    });

    // Enter key to send
    waInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const msg = waInput.value.trim();
        if (msg) { sendMessage(msg); waInput.value = ''; }
      }
    });

    // Auto-resize textarea
    waInput.addEventListener('input', () => {
      waInput.style.height = 'auto';
      waInput.style.height = Math.min(waInput.scrollHeight, 80) + 'px';
    });

    function getTime() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const sl  = new Date(utc + 5.5 * 3600000);
      return sl.getHours().toString().padStart(2,'0') + ':' + sl.getMinutes().toString().padStart(2,'0');
    }

    function sendMessage(text) {
      // Add outgoing bubble
      const outMsg = document.createElement('div');
      outMsg.className = 'wa-msg wa-msg-out';
      outMsg.innerHTML = `${text}<span class="wa-msg-time">${getTime()}</span>`;
      waChat.appendChild(outMsg);
      waChat.scrollTop = waChat.scrollHeight;

      // Update WhatsApp link with message
      const encoded = encodeURIComponent(text);
      waOpenLink.href = `https://wa.me/${94772578848}?text=${encoded}`;

      // Show typing indicator
      setTimeout(() => {
        waTyping.classList.add('show');
        waChat.scrollTop = waChat.scrollHeight;
      }, 500);

      // Auto reply after delay
      setTimeout(() => {
        waTyping.classList.remove('show');
        const replies = [
          'Message us to book your photography session or to get pricing details. We’ll reply as soon as possible! 🙏',
          'Thank you! We will get back to you shortly "click open in whatsapp and DM Me". 📸',
          'Your inquiry Send. Pabasara soon will contact you! "click open in whatsapp and DM Me"✨',
          'Hi! Thanks for reaching out. Please click "Open in WhatsApp" to continue our chat! 💬'
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        const inMsg = document.createElement('div');
        inMsg.className = 'wa-msg wa-msg-in';
        inMsg.innerHTML = `${reply}<span class="wa-msg-time">${getTime()}</span>`;
        waChat.appendChild(inMsg);
        waChat.scrollTop = waChat.scrollHeight;
      }, 2200);
    }
  })();

  /* ══════════════════════════════════════
     REAL-TIME CLOCK (UTC+5:30 Sri Lanka)
  ══════════════════════════════════════ */
  function updateClock() {
    const now = new Date();
    // Convert to UTC+5:30
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const slTime = new Date(utc + (5.5 * 3600000));
    const h = String(slTime.getHours()).padStart(2,'0');
    const m = String(slTime.getMinutes()).padStart(2,'0');
    const s = String(slTime.getSeconds()).padStart(2,'0');
    document.getElementById('clockTime').textContent = h + ':' + m + ':' + s;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ══════════════════════════════════════
     SLOW VIBE SMOOTH SCROLL (Lenis-style)
  ══════════════════════════════════════ */
  (function() {
    let currentY   = window.scrollY;
    let targetY    = window.scrollY;
    let ease       = 0.07; // lower = slower/smoother vibe
    let ticking    = false;
    let lastScrollY = window.scrollY;

    // Override native scroll with wheel event
    window.addEventListener('wheel', e => {
      e.preventDefault();
      targetY += e.deltaY * 0.9;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    }, { passive: false });

    // Touch support
    let touchStartY = 0;
    window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetY += delta * 1.5;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    }, { passive: true });

    function smoothLoop() {
      currentY += (targetY - currentY) * ease;
      if (Math.abs(targetY - currentY) < 0.5) currentY = targetY;
      window.scrollTo(0, currentY);

      // Navbar scroll class
      document.getElementById('navbar').classList.toggle('scrolled', currentY > 60);

      // System monitor hide when scrolling down, show on up
      const sysEl = document.getElementById('sysMonitor');
      if (currentY > lastScrollY + 5) {
        sysEl.classList.add('hide-up');
      } else if (currentY < lastScrollY - 2) {
        sysEl.classList.remove('hide-up');
      }
      lastScrollY = currentY;

      requestAnimationFrame(smoothLoop);
    }
    requestAnimationFrame(smoothLoop);

    // Nav link smooth jump
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          targetY = target.getBoundingClientRect().top + currentY - 60;
          targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
        }
      });
    });
  })();

  /* ══════════════════════════════════════
     SYSTEM MONITOR — sticky top, hides on scroll down
  ══════════════════════════════════════ */
  // (handled inside smooth scroll loop above)