/* ============================================
   ToolKit Pro - Shared Functionality
   Theme, Sidebar, Language, Navigation
   ============================================ */

(function() {
    'use strict';

    // --- Theme ---
    function initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    initTheme();

    // Theme toggle (works for both navbar and sidebar toggles)
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.theme-toggle');
        if (!toggle) return;
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // --- Language Switcher ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        setLanguage(btn.dataset.lang);
    });

    // --- Mobile Sidebar ---
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mobileMenu')) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
        }

        if (e.target.closest('#sidebarOverlay') || e.target.closest('.sidebar-close')) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        }
    });

    // --- Init i18n ---
    if (typeof initI18n === 'function') {
        initI18n();
    }

})();
