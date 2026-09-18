// بيانات موسوعة الديناصورات الشاملة (تجنباً لمشاكل تحميل الملفات الخارجية)
const allDinosaursData = [
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
    // يمكنك إضافة بقية الديناصورات بنفس النمط هنا بكل سهولة
];

document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const totalPages = allDinosaursData.length > 0 ? allDinosaursData.length : 27;

    const prevBtn = document.getElementById('prev-btn') || document.querySelector('.prev-btn');
    const nextBtn = document.getElementById('next-btn') || document.querySelector('.next-btn');
    const pageIndicator = document.getElementById('page-indicator') || document.querySelector('.page-indicator');
    const contentContainer = document.getElementById('content-container') || 
                             document.querySelector('.content-container') || 
                             document.querySelector('.book-content') ||
                             document.querySelector('.page-content');

    function renderPage(pageNum) {
        if (!contentContainer) return;

        // تفريغ الحاوية تماماً لمنع التداخل
        contentContainer.innerHTML = '';

        const pageData = allDinosaursData.find(p => p.id === pageNum);

        if (pageData) {
            contentContainer.innerHTML = `
                <div class="page-inner-content" style="width: 100%; box-sizing: border-box;">
                    <h1 class="dino-title" style="text-align: center;">${pageData.nameAr}</h1>
                    <h2 class="dino-subtitle" style="text-align: center; margin-bottom: 15px;">${pageData.nameEn}</h2>
                    <p class="dino-desc" style="line-height: 1.7; margin-bottom: 15px;">${pageData.desc}</p>
                    
                    <div class="section-title" style="font-weight: bold; color: #d4af37; margin-top: 15px; border-bottom: 1px solid #d4af37; padding-bottom: 3px;">المعنى والتسمية</div>
                    <p style="line-height: 1.6; margin: 8px 0 15px 0;">${pageData.meaning}</p>
                    
                    <div class="section-title" style="font-weight: bold; color: #d4af37; margin-top: 15px; border-bottom: 1px solid #d4af37; padding-bottom: 3px;">الحجم والخصائص</div>
                    <ul class="info-list" style="margin: 8px 0 15px 20px; line-height: 1.6;">
                        <li><strong>الطول:</strong> ${pageData.length}</li>
                        <li><strong>الوزن:</strong> ${pageData.weight}</li>
                    </ul>
                    
                    ${pageData.details}
                    
                    <div class="page-number-footer" style="text-align: center; margin-top: 25px; font-size: 14px; opacity: 0.8;">صفحة ${pageData.id}</div>
                </div>
            `;
        } else {
            contentContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2>الصفحة رقم ${pageNum}</h2>
                    <p>جاري إضافة تفاصيل هذا الديناصور...</p>
                </div>
            `;
        }

        if (pageIndicator) {
            pageIndicator.textContent = `${pageNum} / ${totalPages}`;
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

    // العرض الأولي
    renderPage(currentPage);
});
