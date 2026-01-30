/**
 * The Gamer's Hideout - Main JS
 * Nav, floating button, booking form, WhatsApp
 */

(function () {
  'use strict';

  // ----- Nav: set active link -----
  function setActiveNav() {
    const path = window.location.pathname || '/';
    const page = path === '/' || path.endsWith('index.html') ? 'index' : path.replace(/\.html$/, '').replace(/^\//, '');
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      const href = a.getAttribute('href');
      const linkPage = href === '/' || href === 'index.html' ? 'index' : href.replace(/\.html$/, '').replace(/^\//, '');
      a.classList.toggle('active', linkPage === page || (page === '' && linkPage === 'index'));
    });
  }

  // ----- Header scroll effect -----
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
      lastY = window.scrollY;
    }, { passive: true });
  }

  // ----- Floating Book Now -----
  function initFloatingBook() {
    const floating = document.getElementById('floating-book');
    if (!floating) return;
    const btn = floating.querySelector('a');
    if (btn) btn.setAttribute('href', 'booking.html');
  }

  // ----- Booking: slot availability (localStorage) -----
  var BOOKING_STORAGE_KEY = 'gamerHideoutBookings';
  var TIME_SLOTS = [
    { value: '09:00', label: '9 AM' }, { value: '10:00', label: '10 AM' }, { value: '11:00', label: '11 AM' },
    { value: '12:00', label: '12 PM' }, { value: '13:00', label: '1 PM' }, { value: '14:00', label: '2 PM' },
    { value: '15:00', label: '3 PM' }, { value: '16:00', label: '4 PM' }, { value: '17:00', label: '5 PM' },
    { value: '18:00', label: '6 PM' }, { value: '19:00', label: '7 PM' }, { value: '20:00', label: '8 PM' },
    { value: '21:00', label: '9 PM' }, { value: '22:00', label: '10 PM' }, { value: '23:00', label: '11 PM' },
    { value: '24:00', label: '12 AM' }
  ];

  function getBookedSlots(dateKey) {
    try {
      var raw = localStorage.getItem(BOOKING_STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return list.filter(function (s) { return s.dateKey === dateKey; }).map(function (s) { return s.time; });
    } catch (e) {
      return [];
    }
  }

  function saveBookedSlot(dateKey, time) {
    var list = [];
    try {
      var raw = localStorage.getItem(BOOKING_STORAGE_KEY);
      if (raw) list = JSON.parse(raw);
    } catch (e) {}
    list.push({ dateKey: dateKey, time: time });
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(list));
  }

  function renderSlotAvailability(dateKey, dateLabel) {
    var container = document.getElementById('slot-list');
    var titleEl = document.querySelector('.slot-availability-title');
    if (!container) return;
    var booked = getBookedSlots(dateKey);
    if (titleEl) titleEl.textContent = dateLabel ? 'Slots for ' + dateLabel + ' — green = available, red = booked' : 'Select date above to see available & booked slots';
    container.innerHTML = '';
    TIME_SLOTS.forEach(function (slot) {
      var isBooked = booked.indexOf(slot.value) !== -1;
      var div = document.createElement('div');
      div.className = 'slot-item ' + (isBooked ? 'booked' : 'available');
      div.textContent = slot.label + (isBooked ? ' (Booked)' : ' (Available)');
      container.appendChild(div);
    });
  }

  function buildDateKey(day, month, year) {
    if (!day || !month || !year) return '';
    var m = parseInt(month, 10);
    var d = parseInt(day, 10);
    return year + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
  }

  // ----- Booking form -----
  function initBookingForm() {
    var form = document.getElementById('booking-form');
    var confirmEl = document.getElementById('booking-confirm');
    if (!form || !confirmEl) return;

    var daySel = form.querySelector('[name="day"]');
    var monthSel = form.querySelector('[name="month"]');
    var yearSel = form.querySelector('[name="year"]');
    var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function updateSlotDisplay() {
      var day = daySel?.value;
      var month = monthSel?.value;
      var year = yearSel?.value;
      if (!day || !month || !year) {
        renderSlotAvailability('', '');
        return;
      }
      var dateKey = buildDateKey(day, month, year);
      var dateLabel = day + ' ' + (monthNames[parseInt(month, 10) - 1] || '') + ' ' + year;
      renderSlotAvailability(dateKey, dateLabel);
    }

    if (daySel) daySel.addEventListener('change', updateSlotDisplay);
    if (monthSel) monthSel.addEventListener('change', updateSlotDisplay);
    if (yearSel) yearSel.addEventListener('change', updateSlotDisplay);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var day = form.querySelector('[name="day"]')?.value;
      var month = form.querySelector('[name="month"]')?.value;
      var year = form.querySelector('[name="year"]')?.value;
      var dateStr = (day && month && year) ? (day + ' ' + (monthNames[parseInt(month, 10) - 1] || '') + ' ' + year) : '';
      var time = form.querySelector('[name="time"]')?.value;
      var players = form.querySelector('[name="players"]')?.value;
      var gamingType = form.querySelector('[name="gaming_type"]')?.value;

      var dateKey = buildDateKey(day, month, year);
      if (dateKey && time) saveBookedSlot(dateKey, time);
      updateSlotDisplay();

      var dateEl = confirmEl.querySelector('[data-slot-date]');
      var timeEl = confirmEl.querySelector('[data-slot-time]');
      var playersEl = confirmEl.querySelector('[data-slot-players]');
      var typeEl = confirmEl.querySelector('[data-slot-type]');
      if (dateEl) dateEl.textContent = dateStr || '–';
      if (timeEl) timeEl.textContent = time || '–';
      if (playersEl) playersEl.textContent = players || '–';
      if (typeEl) typeEl.textContent = gamingType || '–';

      confirmEl.classList.add('visible');
      form.style.display = 'none';

      confirmEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      var phone = '918422808422';
      var msg = 'Hi! I want to book a slot at The Gamer\'s Hideout.\nDate: ' + (dateStr || '') + '\nTime: ' + (time || '') + '\nPlayers: ' + (players || '') + '\nType: ' + (gamingType || '');
      var waLink = document.getElementById('whatsapp-confirm');
      if (waLink) waLink.setAttribute('href', 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg));
    });
  }

  // ----- Smooth scroll for anchor links -----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      a.addEventListener('click', function (e) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ----- Scroll reveal (home & sections) -----
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .section-title, .gallery-item, .contact-card, .about-content p');
    if (!revealEls.length) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
    revealEls.forEach(function (el) {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // ----- Init -----
  function init() {
    setActiveNav();
    initHeaderScroll();
    initFloatingBook();
    initBookingForm();
    initSmoothScroll();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
