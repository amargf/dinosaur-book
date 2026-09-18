// إدارة تحميل وعرض صفحات موسوعة الديناصورات (27 صفحة)
document.addEventListener("DOMContentLoaded", async () => {
    const totalPages = 27;
    window.pagesData = window.pagesData || [];

    // دالة مساعدة لتحميل ملفات الصفحات ديناميكياً من المجلد pages/
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // التحقق مما إذا كان الملف محمل مسبقاً لمنع التكرار
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // تحميل جميع الصفحات من page1.js إلى page27.js تلقائياً
    for (let i = 1; i <= totalPages; i++) {
        try {
            await loadScript(`pages/page${i}.js`);
        } catch (e) {
            console.warn(`تعذر تحميل الملف: pages/page${i}.js`);
        }
    }

    let currentPage = 1;

    // عناصر واجهة المستخدم
    const prevBtn = document.getElementById('prev-btn') || document.querySelector('.prev-btn');
    const nextBtn = document.getElementById('next-btn') || document.querySelector('.next-btn');
    const pageIndicator = document.getElementById('page-indicator') || document.querySelector('.page-indicator');
    
    // البحث عن حاوية المحتوى بغض النظر عن اسم الكلاس أو الأيدي
    const contentContainer = document.getElementById('content-container') || 
                             document.querySelector('.content-container') || 
                             document.querySelector('.book-content') ||
                             document.querySelector('.page-content');

    function renderPage(pageNum) {
        if (!contentContainer) return;

        // --- الحل الجذري للتداخل: تفريغ الحاوية تماماً قبل عرض بيانات الصفحة الجديدة ---
        contentContainer.innerHTML = '';

        // البحث عن بيانات الصفحة المطلوبة في المصفوفة
        const pageData = window.pagesData.find(p => p.id === pageNum);

        if (pageData) {
            contentContainer.innerHTML = `
                <div class="page-inner-content" style="width: 100%; box-sizing: border-box;">
                    <h1 class="dino-title" style="text-align: center;">${pageData.nameAr || ''}</h1>
                    <h2 class="dino-subtitle" style="text-align: center; margin-bottom: 15px;">${pageData.nameEn || ''}</h2>
                    <p class="dino-desc" style="line-height: 1.7; margin-bottom: 15px;">${pageData.desc || ''}</p>
                    
                    <div class="section-title" style="font-weight: bold; color: #d4af37; margin-top: 15px; border-bottom: 1px solid #d4af37; padding-bottom: 3px;">المعنى والتسمية</div>
                    <p style="line-height: 1.6; margin: 8px 0 15px 0;">${pageData.meaning || ''}</p>
                    
                    <div class="section-title" style="font-weight: bold; color: #d4af37; margin-top: 15px; border-bottom: 1px solid #d4af37; padding-bottom: 3px;">الحجم والخصائص</div>
                    <ul class="info-list" style="margin: 8px 0 15px 20px; line-height: 1.6;">
                        <li><strong>الطول:</strong> ${pageData.length || ''}</li>
                        <li><strong>الوزن:</strong> ${pageData.weight || ''}</li>
                    </ul>
                    
                    ${pageData.details || ''}
                    
                    <div class="page-number-footer" style="text-align: center; margin-top: 25px; font-size: 14px; opacity: 0.8;">صفحة ${pageData.id}</div>
                </div>
            `;
        } else {
            contentContainer.innerHTML = `<p style="text-align: center; padding: 20px;">جاري تحميل الصفحة رقم ${pageNum}...</p>`;
        }

        // تحديث عداد الصفحات في الأسفل (مثال: 27 / 1)
        if (pageIndicator) {
            pageIndicator.textContent = `${totalPages} / ${pageNum}`;
        }
    }

    // ربط أزرار التنقل (التالية والسابقة)
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

    // العرض الأولي للصفحة الأولى بعد ضمان تحميل السكريبتات
    setTimeout(() => {
        renderPage(currentPage);
    }, 400);
});
