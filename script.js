// ===== تهيئة الكتاب =====
(function () {
    'use strict';

    // انتظار تحميل جميع البيانات
    const data = window.pagesData || [];

    // ترتيب البيانات حسب id
    data.sort((a, b) => a.id - b.id);

    // المتغيرات العامة
    let currentPage = 0;
    let isAnimating = false;
    const totalPages = data.length;

    // العناصر
    const coverScreen = document.getElementById('cover-screen');
    const startBtn = document.getElementById('start-btn');
    const bookContainer = document.getElementById('book-container');
    const pageRight = document.getElementById('page-right');
    const pageLeft = document.getElementById('page-left');
    const pageRightContent = document.getElementById('page-right-content');
    const pageLeftContent = document.getElementById('page-left-content');
    const pageRightNum = document.getElementById('page-right-num');
    const pageLeftNum = document.getElementById('page-left-num');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const indexBtn = document.getElementById('index-btn');
    const indexPanel = document.getElementById('index-panel');
    const closeIndex = document.getElementById('close-index');
    const indexList = document.getElementById('index-list');

    // ===== بناء محتوى الصفحة =====
    function buildPageContent(dino) {
        return `
            <div class="dino-header">
                <div class="dino-number">${dino.id}</div>
                <h2 class="dino-name-ar">${dino.nameAr}</h2>
                <div class="dino-name-en">${dino.nameEn}</div>
            </div>

            <div class="info-cards">
                <div class="info-card">
                    <span class="icon">📏</span>
                    <div>
                        <div class="label">الطول</div>
                        <div class="value">${dino.length}</div>
                    </div>
                </div>
                <div class="info-card">
                    <span class="icon">⚖️</span>
                    <div>
                        <div class="label">الوزن</div>
                        <div class="value">${dino.weight}</div>
                    </div>
                </div>
            </div>

            <div class="dino-desc">${dino.desc}</div>

            <div class="dino-meaning">${dino.meaning}</div>

            <div class="dino-details">
                ${dino.details}
            </div>
        `;
    }

    // ===== عرض صفحة معينة =====
    function renderPage(index) {
        if (index < 0 || index >= totalPages) return;

        const dino = data[index];
        const content = buildPageContent(dino);

        pageRightContent.innerHTML = content;
        pageRightNum.textContent = dino.id;

        const nextIndex = index + 1;
        if (nextIndex < totalPages) {
            const nextDino = data[nextIndex];
            pageLeftContent.innerHTML = buildPageContent(nextDino);
            pageLeftNum.textContent = nextDino.id;
            pageLeft.style.display = '';
        } else {
            pageLeftContent.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;color:var(--accent);padding:2rem;">
                    <div style="font-size:4rem;margin-bottom:1rem;">🦕</div>
                    <h3 style="font-family:'Amiri',serif;font-size:1.5rem;margin-bottom:0.5rem;">نهاية الموسوعة</h3>
                    <p style="opacity:0.7;">شكراً لتصفحك موسوعة الديناصورات</p>
                </div>
            `;
            pageLeftNum.textContent = '';
        }

        currentPageEl.textContent = dino.id;
        totalPagesEl.textContent = totalPages;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= totalPages - 1;

        updateActiveIndexItem(index);

        // ⚡ إجبار التمرير للأعلى
        pageRight.scrollTop = 0;
        pageLeft.scrollTop = 0;
        requestAnimationFrame(() => {
            pageRight.scrollTop = 0;
            pageLeft.scrollTop = 0;
        });
    }

    // ===== الانتقال للصفحة التالية =====
    function goNext() {
        if (isAnimating || currentPage >= totalPages - 1) return;
        isAnimating = true;

        currentPage++;
        renderPage(currentPage);

        pageRight.classList.add('flipping-right');
        setTimeout(() => {
            pageRight.classList.remove('flipping-right');
            isAnimating = false;
        }, 600);
    }

    // ===== الانتقال للصفحة السابقة =====
    function goPrev() {
        if (isAnimating || currentPage <= 0) return;
        isAnimating = true;

        currentPage--;
        renderPage(currentPage);

        pageRight.classList.add('flipping-left');
        setTimeout(() => {
            pageRight.classList.remove('flipping-left');
            isAnimating = false;
        }, 600);
    }

    // ===== بناء الفهرس =====
    function buildIndex() {
        indexList.innerHTML = '';
        data.forEach((dino, i) => {
            const item = document.createElement('div');
            item.className = 'index-item';
            item.dataset.index = i;
            item.innerHTML = `
                <span class="num">${dino.id}</span>
                <div>
                    <div class="name-ar">${dino.nameAr}</div>
                    <div class="name-en">${dino.nameEn}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                currentPage = i;
                renderPage(currentPage);
                closeIndexPanel();
            });
            indexList.appendChild(item);
        });
    }

    // ===== تحديث العنصر النشط في الفهرس =====
    function updateActiveIndexItem(index) {
        const items = indexList.querySelectorAll('.index-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        if (items[index]) {
            items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    // ===== فتح/إغلاق الفهرس =====
    function openIndexPanel() {
        indexPanel.classList.add('open');
        indexBtn.style.opacity = '0';
        indexBtn.style.pointerEvents = 'none';
    }

    function closeIndexPanel() {
        indexPanel.classList.remove('open');
        indexBtn.style.opacity = '1';
        indexBtn.style.pointerEvents = 'auto';
    }

    // ===== بدء الكتاب =====
    function startBook() {
        coverScreen.classList.add('fade-out');
        setTimeout(() => {
            coverScreen.style.display = 'none';
            bookContainer.classList.remove('hidden');
            renderPage(0);
        }, 800);
    }

    // ===== أحداث =====
    startBtn.addEventListener('click', startBook);

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    indexBtn.addEventListener('click', openIndexPanel);
    closeIndex.addEventListener('click', closeIndexPanel);

    document.addEventListener('click', (e) => {
        if (indexPanel.classList.contains('open') &&
            !indexPanel.contains(e.target) &&
            e.target !== indexBtn &&
            !indexBtn.contains(e.target)) {
            closeIndexPanel();
        }
    });

    // ===== اختصارات لوحة المفاتيح =====
    document.addEventListener('keydown', (e) => {
        if (bookContainer.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            goNext();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            goPrev();
        } else if (e.key === 'Escape') {
            closeIndexPanel();
        }
    });

    // ===== اللمس (Swipe) =====
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (bookContainer.classList.contains('hidden')) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // تجاهل السحب العمودي
        if (Math.abs(diffY) > Math.abs(diffX)) return;

        if (Math.abs(diffX) > 60) {
            if (diffX > 0) {
                // 👉 السحب لليمين = التالي
                goNext();
            } else {
                // 👈 السحب لليسار = السابق
                goPrev();
            }
        }
    }, { passive: true });

    // ===== التهيئة الأولية =====
    buildIndex();
    totalPagesEl.textContent = totalPages;

    if (totalPages === 0) {
        bookContainer.innerHTML = '<div style="color:var(--gold);text-align:center;padding:3rem;font-size:1.2rem;">⚠️ لم يتم تحميل بيانات الديناصورات. تأكد من وجود ملفات page*.js في مجلد pages</div>';
    }

    console.log(`🦕 تم تحميل ${totalPages} ديناصور في الموسوعة`);
})();
