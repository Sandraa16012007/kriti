function go(name) {
    const pill = document.getElementById('pill');
    const tl = document.getElementById('t-login'), ts = document.getElementById('t-signup');
    const pl = document.getElementById('p-login'), ps = document.getElementById('p-signup');
    if (name === 'login') {
        pill.classList.remove('signup');
        tl.classList.add('active'); ts.classList.remove('active');
        pl.classList.add('on'); ps.classList.remove('on');
    } else {
        pill.classList.add('signup');
        ts.classList.add('active'); tl.classList.remove('active');
        ps.classList.add('on'); pl.classList.remove('on');
    }
}

const eyeSVG = {
    show: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b5e52" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    hide: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b5e52" stroke-width="1.8" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
};
function eyeToggle(id, btn) {
    const inp = document.getElementById(id);
    const showing = inp.type === 'text';
    inp.type = showing ? 'password' : 'text';
    btn.innerHTML = showing ? eyeSVG.show : eyeSVG.hide;
    btn.style.opacity = showing ? '0.32' : '0.68';
}

function strength(v) {
    const b = document.getElementById('sbar');
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    b.style.width = ['0%', '25%', '50%', '75%', '100%'][s];
    b.style.backgroundColor = ['', '#e8a87c', '#e8d5a3', '#b5ceb5', '#8aab8a'][s] || '';
}

function rip(btn) {
    const old = btn.querySelector('.rip');
    if (old) old.remove();
    const r = document.createElement('span');
    r.className = 'rip';
    const d = Math.max(btn.offsetWidth, btn.offsetHeight);
    r.style.cssText = `width:${d}px;height:${d}px;left:${(btn.offsetWidth - d) / 2}px;top:${(btn.offsetHeight - d) / 2}px;`;
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
}

// Field focus lift
document.querySelectorAll('.fg input').forEach(inp => {
    inp.addEventListener('focus', () => { inp.closest('.fg').style.transform = 'translateY(-1px)'; });
    inp.addEventListener('blur', () => { inp.closest('.fg').style.transform = ''; });
});