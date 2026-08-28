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
    initCountdown();
    initCopyButtons();
    initGallery();
    registerServiceWorker();
  });
})();
