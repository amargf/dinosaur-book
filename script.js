function showPage(pageNumber) {
    const container = document.getElementById('content'); // أو اسم حقل العرض لديك
    if (!container) return;

    // مسح المحتوى القديم بالكامل لمنع التداخل
    container.innerHTML = '';

    // التحقق من أن رقم الصفحة ضمن النطاق الصحيح (من 1 إلى 27)
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > 27) pageNumber = 27;

    // استدعي محتوى الصفحة المطلوبة هنا (مثلاً حسب الطريقة التي تربط بها ملفات الـ pages)
    // مثال:
    loadPageContent(pageNumber);
}
