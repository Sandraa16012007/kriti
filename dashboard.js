document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initGarden();
    initGraph();
});

// Data mapping to image sources (progression)
const gardenData = {
    today: { src: 'assets/garden_today.png' },
    yesterday: { src: 'assets/garden_yesterday.png' },
    week: { src: 'assets/garden_week.png' },
    month: { src: 'assets/garden_month.png' }
};

function initGarden() {
    const toggles = document.querySelectorAll('.g-toggle');
    const illustration = document.getElementById('garden-illustration');

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            toggles.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            const range = btn.dataset.range;
            const data = gardenData[range];

            // Swap image source with fade transition
            if (illustration.src.indexOf(data.src) === -1) {
                illustration.style.opacity = '0';
                setTimeout(() => {
                    illustration.src = data.src;
                    illustration.style.opacity = '1';
                }, 400);
            }
        });
    });
}

// Support Modal Logic
const supportModal = document.getElementById('support-modal');
const closeSupportBtn = document.getElementById('close-support');

if (supportModal) {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('support') === 'true') {
        setTimeout(() => {
            supportModal.classList.remove('hidden');
        }, 800);
        // Clean up URL so refresh doesn't trigger it again
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    closeSupportBtn.addEventListener('click', () => {
        supportModal.classList.add('hidden');
    });

    supportModal.addEventListener('click', (e) => {
        if (e.target === supportModal) {
            supportModal.classList.add('hidden');
        }
    });
}

window.completeSupportTask = function (checkbox) {
    if (checkbox.checked) {
        // Add glowing effect to Consistency points
        const cpDisplay = document.getElementById('cp-display');
        if (cpDisplay) {
            const span = cpDisplay.querySelector('span');
            let current = parseInt(span.innerText);
            span.innerText = current + 10;
            cpDisplay.classList.add('glow');
            setTimeout(() => {
                cpDisplay.classList.remove('glow');
            }, 1500);
        }
        // Disable checkbox to prevent farming points
        checkbox.disabled = true;
    }
};

// Graph Logic
function initGraph() {
    // Generate an upward trend path based on data points to simulate growth over time
    // Data simulates (x, y) coordinates. Y is inverted (0 is top).
    // Let's create a smooth curve for "Week" view initially.

    const pathArea = document.getElementById('graph-area');
    const pathLine = document.getElementById('graph-line');

    // To show growth, we can animate the path to a higher endpoint once loaded.
    setTimeout(() => {
        // More upward curve
        const newD = "M0,100 Q100,110 200,60 T400,15";
        pathLine.setAttribute('d', newD);
        pathArea.setAttribute('d', newD + " L400,120 L0,120 Z");
    }, 500);
}


