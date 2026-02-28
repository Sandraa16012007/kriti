document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

const hist = document.getElementById('chat-history');
const tplTyping = document.getElementById('tpl-typing');

function scrollBottom() {
    hist.scrollTo({
        top: hist.scrollHeight,
        behavior: 'smooth'
    });
}

function showTyping() {
    const clone = tplTyping.content.cloneNode(true);
    hist.appendChild(clone);
    scrollBottom();
    const dots = hist.lastElementChild;
    return dots;
}

function addAI(text, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const html = `
                <div class="msg ai-msg fade-up">
                    <div class="msg-bubble">${text}</div>
                </div>
            `;
            hist.insertAdjacentHTML('beforeend', html);
            scrollBottom();
            setTimeout(resolve, 400); // small buffer after showing
        }, delay);
    });
}

function addUser(text) {
    const html = `
        <div class="msg user-msg fade-up">
            <div class="msg-bubble">${text}</div>
        </div>
    `;
    hist.insertAdjacentHTML('beforeend', html);
    scrollBottom();
}

// flow variables
let selectedDomains = [];

function selectDomain(domain, btn) {
    if (selectedDomains.includes(domain)) {
        selectedDomains = selectedDomains.filter(d => d !== domain);
        btn.classList.remove('selected');
    } else {
        selectedDomains.push(domain);
        btn.classList.add('selected');
    }

    const continueBtn = document.getElementById('btn-continue-domains');
    if (selectedDomains.length > 0) {
        continueBtn.classList.remove('hidden');
    } else {
        continueBtn.classList.add('hidden');
    }
}

async function confirmDomains() {
    // UI update
    const chipsWrap = document.getElementById('step-1-chips');
    Array.from(chipsWrap.children).forEach(c => {
        if (!c.classList.contains('selected')) c.style.opacity = '0.5';
        c.style.pointerEvents = 'none';
    });
    document.getElementById('btn-continue-domains').classList.add('hidden');

    // Flow
    addUser(selectedDomains.join(', '));
    await new Promise(r => setTimeout(r, 600));

    // Hide chips, show typing
    chipsWrap.classList.add('hidden');
    const typing = showTyping();

    // AI Responses
    await new Promise(r => setTimeout(r, 1200));
    typing.remove();
    await addAI("Beautiful. Let’s align your effort.");

    const typing2 = showTyping();
    await new Promise(r => setTimeout(r, 800));
    typing2.remove();

    // Create a natural sounding string for multiple domains
    let domainText = '';
    if (selectedDomains.length === 1) {
        domainText = selectedDomains[0];
    } else if (selectedDomains.length === 2) {
        domainText = selectedDomains.join(' and ');
    } else {
        const last = selectedDomains.pop();
        domainText = selectedDomains.join(', ') + ', and ' + last;
    }

    await addAI(`What did you do today for your ${domainText}?`);

    // Show step 2 input
    document.getElementById('step-2-input').classList.remove('hidden');
    scrollBottom();
}

async function sendDemo1() {
    document.getElementById('step-2-input').classList.add('hidden');
    const text = "Placements aa rahe hain, DSA improve karna hai. Aaj 2 questions solve kiye.";
    addUser(text);

    await new Promise(r => setTimeout(r, 500));
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 1500));
    typing.remove();

    await addAI("That’s effort. 🌿<br>You showed up for your future.");

    const typing2 = showTyping();
    await new Promise(r => setTimeout(r, 1000));
    typing2.remove();
    await addAI("What did you not do today — but wish you had?");

    document.getElementById('step-3-input').classList.remove('hidden');
    scrollBottom();
}

async function sendDemo2() {
    document.getElementById('step-3-input').classList.add('hidden');
    const text = "Revision nahi ki.";
    addUser(text);

    await new Promise(r => setTimeout(r, 500));
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 1800));
    typing.remove();

    await addAI("No guilt. Just awareness.<br>Tomorrow, one small revision block?");

    // Add Growth indicator
    const growthHtml = `
        <div class="growth-logged fade-up">
            <i data-lucide="sprout"></i> Growth Logged
        </div>
    `;
    hist.insertAdjacentHTML('beforeend', growthHtml);
    lucide.createIcons();
    scrollBottom();

    await new Promise(r => setTimeout(r, 1000));

    // Add Signal Tag
    const tagHtml = `
        <div class="signal-tag fade-up">
            <span>Detected Focus: <strong>Career</strong></span>
            <span>Sub-Focus: DSA / Placements</span>
        </div>
    `;
    hist.insertAdjacentHTML('beforeend', tagHtml);
    scrollBottom();

    await new Promise(r => setTimeout(r, 1200));

    // Show final CTA in interaction area
    const ctaHtml = `
        <div class="fade-up" id="final-cta">
            <button class="btn-p" onclick="window.location.href='dashboard.html'">
                <i data-lucide="arrow-right"></i> Let this effort bloom
            </button>
            <span class="microcopy">You will only be compared to your past self.</span>
        </div>
    `;
    document.getElementById('interaction-area').insertAdjacentHTML('beforeend', ctaHtml);
    lucide.createIcons();
    scrollBottom();
}
