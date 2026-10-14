// ==========================================================
// 온라인 청첩장 - 바닐라 JS 인터랙션
// ==========================================================
(function () {
  'use strict';

  /* ---------- 미니 캘린더 ---------- */
  function renderCalendar() {
    const el = document.getElementById('mini-calendar');
    if (!el) return;

    const dateStr = el.dataset.date; // YYYY-MM-DD
    const [y, m, d] = dateStr.split('-').map(Number);
    const targetDate = d;

    const firstDay = new Date(y, m - 1, 1).getDay(); // 0=일
    const lastDate = new Date(y, m, 0).getDate();

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dowNames = ['일','월','화','수','목','금','토'];

    let html = `<div class="mini-calendar__month">${monthNames[m - 1]} ${y}</div>`;
    html += '<div class="mini-calendar__grid">';

    dowNames.forEach(function (dow) {
      html += `<div class="mini-calendar__dow">${dow}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="mini-calendar__day mini-calendar__day--empty"></div>';
    }

    for (let day = 1; day <= lastDate; day++) {
      const isTarget = day === targetDate;
      html += `<div class="mini-calendar__day${isTarget ? ' mini-calendar__day--target' : ''}">${day}</div>`;
    }

    html += '</div>';
    el.innerHTML = html;
  }

  /* ---------- 히어로 큰 날짜 뒤에 "토 2시" 이어붙이기 ---------- */
  function initHeroDate() {
    const el = document.getElementById('hero-meta-date');
    if (!el) return;

    const dateStr = el.dataset.date; // YYYY-MM-DD
    const timeStr = el.dataset.time; // HH:MM
    const [y, m, d] = dateStr.split('-').map(Number);
    const dowNames = ['일', '월', '화', '수', '목', '금', '토'];
    let suffix = ' ' + dowNames[new Date(y, m - 1, d).getDay()];

    if (timeStr) {
      const hour = Number(timeStr.split(':')[0]);
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      suffix += ' ' + hour12 + '시';
    }

    el.textContent = el.textContent + suffix;
  }

  /* ---------- 카운트다운 ---------- */
  function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    const target = new Date(el.dataset.target).getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      const now = Date.now();
      let diff = target - now;

      if (diff <= 0) {
        daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00';
        el.querySelector('.countdown__label').innerHTML = '저희 결혼식 날이에요!<br>축하해 주셔서 감사합니다 🤍';
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------- 복사 버튼 (주소 / 계좌번호) ---------- */
  function initCopyButtons() {
    document.querySelectorAll('.btn-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const text = btn.dataset.copy;
        if (!text) return;

        const done = function () { showToast('복사되었습니다'); };
        const fail = function () { showToast('복사에 실패했어요'); };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done).catch(fail);
        } else {
          // Fallback (구형 브라우저 / http 환경)
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand('copy');
            done();
          } catch (e) {
            fail();
          }
          document.body.removeChild(ta);
        }
      });
    });
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 1800);
  }

  /* ---------- 갤러리 라이트박스 ---------- */
  function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    if (!lightbox || !lightboxImg) return;

    document.querySelectorAll('.gallery__item').forEach(function (item) {
      item.addEventListener('click', function () {
        lightboxImg.src = item.dataset.full;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- 페이지 진입 컨페티 애니메이션 ---------- */
  function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    // 모션에 민감한 사용자는 애니메이션을 건너뜀
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.remove();
      return;
    }

    const ctx = canvas.getContext('2d');
    const COLORS = ['#f3dde4', '#e8b9c4', '#ece3f2', '#d9c6ea', '#c7a05f', '#b3667c', '#fffaf8'];
    const PIECE_COUNT = 140;
    const DURATION = 3200; // ms
    const GRAVITY = 0.16;

    let width, height, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // 화면 상단 중앙 부근에서 좌우로 퍼지며 터지는 폭죽 느낌
    const originX = width / 2;
    const originY = height * 0.32;

    function makePiece() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // 살짝 위로 솟구치는 초기 힘
        size: 5 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        drag: 0.985 + Math.random() * 0.01,
      };
    }

    const pieces = [];
    for (let i = 0; i < PIECE_COUNT; i++) pieces.push(makePiece());

    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, width, height);

      pieces.forEach(function (p) {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const fadeStart = 0.65;
        const opacity = progress < fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart));

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, width, height);
        canvas.remove();
      }
    }

    requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
  }

  /* ---------- 첫화면(인트로) → 초대장 본문 자동 전환 ---------- */
  function initIntro() {
    const intro = document.getElementById('intro');
    if (!intro) {
      // 인트로 요소가 없는 예전 캐시 페이지 등 예외 상황 대비
      initConfetti();
      return;
    }

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finish() {
      intro.classList.add('is-hidden');
      document.body.style.overflow = '';
      initConfetti();
    }

    if (reduceMotion) {
      // 모션 최소화 사용자: 오래 붙잡지 않고 바로 넘어감 (컨페티도 스킵됨)
      setTimeout(finish, 400);
      return;
    }

    document.body.style.overflow = 'hidden';

    // 인트로는 항상 페이지 맨 위에서 끝나야 편지지가 메인 사진 자리로 정확히 커짐
    // (새로고침 시 브라우저가 이전 스크롤 위치를 복원하는 것 방지)
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // 편지봉투 연출 타임라인 (ms, 페이지 진입 시점 기준)
    const T_FLIP = 4000;     // 앞면 글씨 읽고 → 봉투 뒤집기 (글씨는 0.18초 만에 먼저 사라짐)
    const T_OPEN = 5300;     // 실링 떨어지고 덮개 열림
    const T_LETTER = 6000;   // 편지지(첫 페이지)가 쭉 빠져나옴 (0.8초, CSS와 동일)
    const T_EXPAND = 6800;   // 다 빠져나온 순간 멈춤 없이 화면 가득 커짐 (1초) + 봉투 사라짐
    const T_HIDE = 7900;     // 남은 배경이 사라지며 실제 페이지가 드러남

    setTimeout(function () { intro.classList.add('is-flipped'); }, T_FLIP);
    setTimeout(function () { intro.classList.add('is-opened'); }, T_OPEN);
    setTimeout(function () { intro.classList.add('is-letter'); }, T_LETTER);
    setTimeout(function () { expandLetter(intro); }, T_EXPAND);
    setTimeout(function () {
      intro.classList.add('is-hiding');
      setTimeout(finish, 800); // CSS transition(0.8s)과 동일하게 맞춤
    }, T_HIDE);
  }

  // 봉투에서 나온 편지지를 실제 페이지의 메인 사진 위치/크기까지 키움
  function expandLetter(intro) {
    const letter = intro.querySelector('.envelope__letter');
    const target = document.querySelector('.hero__photo-frame') || document.querySelector('.hero');
    if (!letter || !target) return;

    const from = letter.getBoundingClientRect();
    const to = target.getBoundingClientRect();

    const page = document.createElement('div');
    page.className = 'intro__page';
    const letterStyle = getComputedStyle(letter);
    page.style.backgroundImage = letterStyle.backgroundImage;
    page.style.left = from.left + 'px';
    page.style.top = from.top + 'px';
    page.style.width = from.width + 'px';
    page.style.height = from.height + 'px';

    intro.appendChild(page);
    letter.style.visibility = 'hidden';
    intro.classList.add('is-expanding');

    // 시작 위치를 먼저 그린 다음 목표 위치로 바꿔야 transition이 동작함
    page.getBoundingClientRect();
    requestAnimationFrame(function () {
      page.classList.add('is-full');
      page.style.left = to.left + 'px';
      page.style.top = to.top + 'px';
      page.style.width = to.width + 'px';
      page.style.height = Math.min(to.height, window.innerHeight - to.top) + 'px';
    });
  }

  /* ---------- Service Worker 등록 (PWA) ---------- */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').catch(function (err) {
          console.warn('Service worker 등록 실패:', err);
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderCalendar();
    initHeroDate();
    initCountdown();
    initCopyButtons();
    initGallery();
    initIntro(); // 인트로가 끝나면 그 안에서 initConfetti()를 호출함
    registerServiceWorker();
  });
})();
