document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

const hist = document.getElementById('chat-history');
const tplTyping = document.getElementById('tpl-typing');

function scrollBottom() {
    hist.scrollTo({ top: hist.scrollHeight, behavior: 'smooth' });
}

function showTyping() {
    const clone = tplTyping.content.cloneNode(true);
    hist.appendChild(clone);
    scrollBottom();
    return hist.lastElementChild;
}

function addAI(text, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const html = `<div class="msg ai-msg fade-up"><div class="msg-bubble">${text}</div></div>`;
            hist.insertAdjacentHTML('beforeend', html);
            scrollBottom();
            setTimeout(resolve, 400);
        }, delay);
    });
}

function addUser(text) {
    const html = `<div class="msg user-msg fade-up"><div class="msg-bubble">${text}</div></div>`;
    hist.insertAdjacentHTML('beforeend', html);
    scrollBottom();
}

async function sendReflection1() {
    document.getElementById('step-1-input').classList.add('hidden');
    addUser("Nothing.");

    await new Promise(r => setTimeout(r, 500));
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 1500));
    typing.remove();

    await addAI("And what did you struggle with or not get to? It's okay to be honest.");

    const ctaHtml = `
        <div class="input-wrap fade-up" id="step-2-input" style="margin-top:16px;">
            <button class="btn-demo" onclick="sendReflection2()">Send: "I feel like giving up."</button>
        </div>
    `;
    document.getElementById('interaction-area').insertAdjacentHTML('beforeend', ctaHtml);
    scrollBottom();
}

async function sendReflection2() {
    document.getElementById('step-2-input').classList.add('hidden');
    addUser("I feel like giving up.");

    await new Promise(r => setTimeout(r, 500));
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 2000));
    typing.remove();

    await addAI("I hear you. It’s completely okay to feel this way. 🌿<br>You've been carrying a lot recently. Rest is not a step backward, it's how we gather strength.");

    const growthHtml = `<div class="growth-logged fade-up" style="background:rgba(232, 168, 124, 0.15); color:var(--peach-deep); border-color:var(--peach);"><i data-lucide="heart"></i> Compassion Logged</div>`;
    hist.insertAdjacentHTML('beforeend', growthHtml);
    lucide.createIcons();
    scrollBottom();

    await new Promise(r => setTimeout(r, 1200));

    const ctaHtml = `
        <div class="fade-up" id="final-cta">
            <button class="btn-p" onclick="window.location.href='dashboard.html?support=true'">
                <i data-lucide="arrow-right"></i> Continue
            </button>
        </div>
    `;
    document.getElementById('interaction-area').insertAdjacentHTML('beforeend', ctaHtml);
    lucide.createIcons();
    scrollBottom();
}
