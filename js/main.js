/* =====================================================================
   Eeshan Londhe — site script
   Vanilla JS. No frameworks. Handles:
     - typed hero effect
     - mobile nav drawer
     - active-section nav highlight
     - close drawer on link click
     - footer year
   ===================================================================== */
(function () {
    'use strict';

    /* ---------- Typed hero effect ---------- */
    function typeText(el, text, speed) {
        if (!el) return;
        let i = 0;
        el.textContent = '';
        const tick = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i += 1;
                window.setTimeout(tick, speed);
            }
        };
        tick();
    }

    /* ---------- Mobile nav drawer ---------- */
    function setupNav() {
        const toggle = document.getElementById('navToggle');
        const sidebar = document.getElementById('sidebar');
        if (!toggle || !sidebar) return;

        const close = () => {
            sidebar.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };
        const open = () => {
            sidebar.classList.add('is-open');
            toggle.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        };

        toggle.addEventListener('click', () => {
            sidebar.classList.contains('is-open') ? close() : open();
        });

        // Close drawer when a nav link is clicked (mobile)
        sidebar.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 900px)').matches) close();
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    /* ---------- Active nav link based on scroll position ---------- */
    function setupScrollSpy() {
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        const links = Array.from(document.querySelectorAll('.nav__link'));
        if (!sections.length || !links.length) return;

        const linkMap = new Map();
        links.forEach((link) => {
            const id = (link.getAttribute('href') || '').replace('#', '');
            if (id) linkMap.set(id, link);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    links.forEach((l) => l.classList.remove('is-active'));
                    const active = linkMap.get(id);
                    if (active) active.classList.add('is-active');
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));
    }

    /* ---------- Footer year ---------- */
    function setYear() {
        const el = document.getElementById('year');
        if (el) el.textContent = String(new Date().getFullYear());
    }

    /* ---------- Boot ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        typeText(
            document.getElementById('typed'),
            'Sr. Software Engineer @\nMicrosoft | Ex-Apple',
            55
        );
        setupNav();
        setupScrollSpy();
        setYear();
    });
})();
