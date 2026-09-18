// قاعدة بيانات احتياطية أساسية لضمان عمل الموسوعة فوراً دون شاشات فارغة
const fallbackData = [
    {
        id: 1,
        nameAr: "أبيليصور",
        nameEn: "Abelisaurus",
        desc: "جنس من الديناصورات الثيروبودية المفترسة التي عاشت في أواخر العصر الطباشيري (منذ حوالي 70 إلى 80 مليون سنة) في منطقة أمريكا الجنوبية (باتاغونيا، الأرجنتين).",
        meaning: 'معنى الاسم: "سحلية أبل" (Abel\'s lizard)، تكريماً للعالم "روبرتو أبل" مدير متحف العلوم الطبيعية بالأرجنتين.',
        length: "7.4 إلى 9 أمتار",
        weight: "1.5 إلى 3 أطنان",
        details: `
            <div class="section-title">التسمية والاكتشاف</div>
            <ul class="info-list">
                <li><strong>تاريخ الوصف:</strong> تم وصفه رسمياً عام 1985 بواسطة عالمي الأحافير خوسيه بونابرت وفيرناندو نوفاس.</li>
                <li><strong>العينة المكتشفة:</strong> يُعرف حتى اليوم من خلال جمجمة واحدة كاملة تم العثور عليها.</li>
            </ul>
            <div class="section-title">الحجم والخصائص الجسدية</div>
            <ul class="info-list">
                <li><strong>شكل الجمجمة:</strong> يبلغ طولها نحو 85 سم، وتتميز بوجود فتحات واسعة لتقليل الوزن.</li>
                <li><strong>الأطراف والحركة:</strong> يسير على قدمين خلفيتين مع بنية جسم قوية ومفترسة.</li>
            </ul>
        `
    },
    {
        id: 2,
        nameAr: "أبروصور",
        nameEn: "Abrosaurus",
        desc: "جنس من الديناصورات العشبية ضخمة الحجم (الساوروبودات) التي عاشت خلال العصر الجوراسي.",
        meaning: 'معنى الاسم: "السحلية الرقيقة" (Delicate lizard)، نسبة إلى عظام جمجمته الخفيفة والمليئة بالفراغات الهوائية.',
        length: "حوالي 9 إلى 10 أمتار",
        weight: "حوالي 5 إلى 6 أطنان",
        details: `
            <div class="section-title">التسمية والاكتشاف</div>
            <ul class="info-list">
                <li><strong>تاريخ الوصف:</strong> تم وصفه في أواخر القرن العشرين بناءً على حفريات وُجدت في آسيا.</li>
                <li><strong>العينة المكتشفة:</strong> جمجمة محفوظة بحالة جيدة جداً ساهمت في فهم تطور الساوروبودات الجوراسية.</li>
            </ul>
            <div class="section-title">الحجم والخصائص</div>
            <ul class="info-list">
                <li>عنق طويل وأسنان تشبه الأقلام مخصصة لقضم أوراق الأشجار العالية.</li>
            </ul>
        `
    }
];

window.pagesData = window.pagesData || [];

document.addEventListener("DOMContentLoaded", async () => {
    const totalPages = 27;

    // دالة آمنة لتحميل الملفات الخارجية
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => resolve(); // المتابعة بصمت لو فشل ملف معين
            document.head.appendChild(script);
        });
    }

    // محاولة تحميل ملفات الصفحات
    for (let i = 1; i <= totalPages; i++) {
        await loadScript(`pages/page${i}.js`);
    }

    // دمج البيانات الاحتياطية مع البيانات المحملة لضمان عدم وجود صفحة فارغة
    fallbackData.forEach(item => {
        if (!window.pagesData.some(p => p.id === item.id)) {
            window.pagesData.push(item);
        }
    });

    let currentPage = 1;

    // البحث عن أزرار التنقل والحاوية بأكثر من احتمال لتجنب الخطأ
    const prevBtn = document.getElementById('prev-btn') || document.querySelector('.prev-btn') || document.querySelectorAll('button')[0];
    const nextBtn = document.getElementById('next-btn') || document.querySelector('.next-btn') || document.querySelectorAll('button')[1];
    const pageIndicator = document.getElementById('page-indicator') || document.querySelector('.page-indicator');
    
    let contentContainer = document.getElementById('content-container') || 
                           document.querySelector('.content-container') || 
                           document.querySelector('.book-content') ||
                           document.querySelector('.page-content') ||
                           document.querySelector('.main-content');

    // إذا لم تُوجد حاوية محتوى، نقوم بتنبيئها برمجياً لضمان ظهور النصوص
    if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.className = 'content-container';
        document.body.appendChild(contentContainer);
    }

    function renderPage(pageNum) {
        if (!contentContainer) return;

        contentContainer.innerHTML = '';

        const pageData = window.pagesData.find(p => p.id === pageNum);

        if (pageData) {
            contentContainer.innerHTML = `
                <div class="page-inner-content">
                    <h1 class="dino-title">${pageData.nameAr || ''}</h1>
                    <h2 class="dino-subtitle">${pageData.nameEn || ''}</h2>
                    <p class="dino-desc">${pageData.desc || ''}</p>
                    
                    <div class="section-title">المعنى والتسمية</div>
                    <p>${pageData.meaning || ''}</p>
                    
                    <div class="section-title">الحجم والخصائص</div>
                    <ul class="info-list">
                        <li><strong>الطول:</strong> ${pageData.length || ''}</li>
                        <li><strong>الوزن:</strong> ${pageData.weight || ''}</li>
                    </ul>
                    
                    ${pageData.details || ''}
                    <div class="page-number-footer">صفحة ${pageData.id} من ${totalPages}</div>
                </div>
            `;
        } else {
            contentContainer.innerHTML = `
                <div class="page-inner-content" style="text-align: center; padding: 30px;">
                    <h2 style="color: #d4af37;">الصفحة رقم ${pageNum}</h2>
                    <p>جاري تحضير معلومات هذا الديناصور...</p>
                </div>
            `;
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

    // العرض الفوري للصفحة الأولى
    renderPage(currentPage);
});
