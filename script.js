// ── NAV STICKY ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('sticky', window.scrollY > 30);
}, { passive: true });

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── PARALLAX ORBS ──
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const sy = window.scrollY;
            document.querySelectorAll('.hero-orb').forEach((orb, i) => {
                const speed = [0.08, 0.12, 0.06][i];
                orb.style.transform = `translateY(${sy * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ── FORM SUBMIT ──
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> Sent! Thank you.`;
    btn.style.background = 'var(--sage-mid)';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 3500);
}

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? 'var(--sage)' : '';
            });
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── CURSOR SUBTLE TRAIL (light devices only) ──
if (window.matchMedia('(pointer: fine)').matches) {
    let cursor;
    document.addEventListener('mousemove', (e) => {
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.style.cssText = `
        position:fixed;width:8px;height:8px;border-radius:50%;
        background:rgba(122,170,136,0.35);pointer-events:none;z-index:9999;
        transform:translate(-50%,-50%);transition:transform 0.15s ease;
        mix-blend-mode:multiply;
      `;
            document.body.appendChild(cursor);
        }
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}