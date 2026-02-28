document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initGardenToggles();
});

// ----- Garden Image Toggles -----
const gardenImages = {
    today: 'assets/garden_today.png',
    yesterday: 'assets/garden_yesterday.png',
    week: 'assets/garden_week.png',
    month: 'assets/garden_month.png'
};

function initGardenToggles() {
    const toggles = document.querySelectorAll('.g-toggle');
    const illustration = document.getElementById('garden-illustration');

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            toggles.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            const range = btn.dataset.range;
            const src = gardenImages[range];

            // Smooth fade-swap
            if (illustration.src.indexOf(src) === -1) {
                illustration.style.opacity = '0';
                setTimeout(() => {
                    illustration.src = src;
                    illustration.style.opacity = '1';
                }, 400);
            }
        });
    });
}

// ----- Consistency Points -----
let cpBalance = 120;

function updateCPDisplay() {
    document.getElementById('cp-balance').textContent = cpBalance + ' Consistency Points';
}

// ----- Shop -----
const purchasedItems = [];

// Random positions for overlaid items on the garden
const itemPositions = [
    { top: '15%', left: '20%' },
    { top: '25%', right: '15%' },
    { top: '55%', left: '12%' },
    { top: '40%', right: '25%' },
    { top: '70%', left: '35%' },
    { top: '10%', left: '55%' },
    { top: '60%', right: '18%' },
    { top: '30%', left: '40%' },
];

const itemEmojis = {
    sparrow: '🐦',
    peacock: '🦚',
    jasmine: '🌼',
    butterfly: '🦋',
    marigold: '🌻',
    lantern: '🏮'
};

window.buyItem = function (itemName, cost, btn) {
    if (cpBalance < cost) {
        showToast('Not enough Consistency Points!');
        return;
    }

    cpBalance -= cost;
    updateCPDisplay();
    purchasedItems.push(itemName);
    btn.disabled = true;
    btn.textContent = 'Added';

    // Place the item on the garden overlay
    placeOverlayItem(itemName);
    showToast(`${capitalize(itemName)} added to your garden!`);
};

function placeOverlayItem(itemName) {
    const overlays = document.getElementById('garden-overlays');
    const pos = itemPositions[purchasedItems.length - 1] || { top: '50%', left: '50%' };

    const el = document.createElement('div');
    el.className = 'garden-overlay-item';
    el.textContent = itemEmojis[itemName] || '🌸';
    el.style.top = pos.top;
    if (pos.left) el.style.left = pos.left;
    if (pos.right) el.style.right = pos.right;

    overlays.appendChild(el);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ----- Toast -----
function showToast(message) {
    const toast = document.getElementById('purchase-toast');
    const msgEl = document.getElementById('toast-message');
    msgEl.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2500);
}

