document.addEventListener("DOMContentLoaded", async () => {
    const totalPages = 27;
    window.pagesData = window.pagesData || [];

    // دالة لتحميل ملفات الصفحات الخارجية
    function loadScript(src) {
        return new Promise((resolve) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => resolve(); // المتابعة حتى لو لم يتوفر ملف معين
            document.head.appendChild(script);
        });
    }

    // تحميل جميع الصفحات تلقائياً
    for (let i = 1; i <= totalPages; i++) {
        await loadScript(`pages/page${i}.js`);
    }

    let currentPage = 1;

    const prevBtn = document.getElementById('prev-btn') || document.querySelector('.prev-btn');
    const nextBtn = document.getElementById('next-btn') || document.querySelector('.next-btn');
    const pageIndicator = document.getElementById('page-indicator') || document.querySelector('.page-indicator');
    const contentContainer = document.getElementById('content-container') || 
                             document.querySelector('.content-container') || 
                             document.querySelector('.book-content') ||
                             document.querySelector('.page-content');

    function renderPage(pageNum) {
        if (!contentContainer) return;

        // تفريغ الحاوية وعرض البيانات بشكل نظيف لمنع التداخل
        contentContainer.innerHTML = '';

        const pageData = window.pagesData.find(p => p.id === pageNum);

        if (pageData) {
            contentContainer.innerHTML = `
                <div class="page-inner-content">
                    <h1 class="dino-title" style="text-align: center;">${pageData.nameAr || ''}</h1>
                    <h2 class="dino-subtitle" style="text-align: center; margin-bottom: 15px;">${pageData.nameEn || ''}</h2>
                    <p class="dino-desc">${pageData.desc || ''}</p>
                    
                    <div class="section-title">المعنى والتسمية</div>
                    <p>${pageData.meaning || ''}</p>
                    
                    <div class="section-title">الحجم والخصائص</div>
                    <ul class="info-list">
                        <li><strong>الطول:</strong> ${pageData.length || ''}</li>
                        <li><strong>الوزن:</strong> ${pageData.weight || ''}</li>
                    </ul>
                    
                    ${pageData.details || ''}
                </div>
            `;
        } else {
            contentContainer.innerHTML = `<div style="text-align: center; padding: 30px;">جاري تحميل الصفحة ${pageNum}...</div>`;
        }

        if (pageIndicator) {
            pageIndicator.textContent = `${totalPages} / ${pageNum}`;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        });
    }

    // الانتشار والتحميل الأولي
    setTimeout(() => {
        renderPage(currentPage);
    }, 300);
});
