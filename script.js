window.pagesData = window.pagesData || [];

const bookContainer = document.getElementById('book');
let currentPage = 0;

async function loadAllPages() {
    let pageNum = 1;
    let keepChecking = true;

    while (keepChecking && pageNum <= 500) {
        try {
            const response = await fetch(`pages/page${pageNum}.js`);
            if (response.ok) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = `pages/page${pageNum}.js?v=` + Date.now();
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
                pageNum++;
            } else {
                keepChecking = false;
            }
        } catch (e) {
            keepChecking = false;
        }
    }

    initBook();
}

function initBook() {
    window.pagesData.sort((a, b) => a.id - b.id);

    window.pagesData.forEach((dino) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page inner-page';
        pageDiv.id = `page-${dino.id}`;
        pageDiv.style.zIndex = 9000 - dino.id;

        pageDiv.innerHTML = `
            <div class="page-header">
                <h2>${dino.nameAr}</h2>
                <span>${dino.nameEn}</span>
            </div>
            <div class="page-content">
                <p>${dino.desc}</p>
                <div class="section-title">التسمية والاكتشاف</div>
                <ul class="info-list">
                    <li><strong>معنى الاسم:</strong> ${dino.meaning}</li>
                </ul>
                <div class="section-title">الحجم والخصائص</div>
                <ul class="info-list">
                    <li><strong>الطول والوزن:</strong> ${dino.length} ، ${dino.weight}</li>
                </ul>
                ${dino.details ? dino.details : ''}
            </div>
            <div class="page-footer">صفحة ${dino.id}</div>
        `;

        bookContainer.appendChild(pageDiv);
    });

    updateBook();
}

function updateBook() {
    const totalPages = window.pagesData.length + 1;

    for (let i = 0; i < totalPages; i++) {
        const page = document.getElementById(`page-${i}`);
        if (page) {
            page.classList.toggle('flipped', currentPage > i);
        }
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = (currentPage === 0);
    if (nextBtn) nextBtn.disabled = (currentPage === totalPages - 1);
    
    updateIndicator();
}

function updateIndicator() {
    const totalPages = window.pagesData.length + 1;
    const indicator = document.getElementById('indicator');
    if (indicator) {
        indicator.innerText = `${currentPage + 1} / ${totalPages}`;
    }
}

window.nextPage = function() {
    const totalPages = window.pagesData.length + 1;
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateBook();
    }
};

window.prevPage = function() {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
    }
};

loadAllPages();
