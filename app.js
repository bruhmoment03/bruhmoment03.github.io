/* ============================================
   ToolKit Pro - Watermark Tool
   ============================================ */

(function() {
    'use strict';

    // --- State ---
    let uploadedImage = null;
    let zoomLevel = 1;

    // --- DOM Elements ---
    const $ = (sel) => document.querySelector(sel);
    const canvas = $('#previewCanvas');
    const ctx = canvas.getContext('2d');

    const fileInput = $('#fileInput');
    const uploadZone = $('#uploadZone');
    const fileInfo = $('#fileInfo');
    const fileName = $('#fileName');
    const fileRemove = $('#fileRemove');
    const previewPlaceholder = $('#previewPlaceholder');
    const previewWrapper = $('#previewWrapper');
    const downloadBtn = $('#downloadBtn');

    const wmText = $('#wmText');
    const wmSize = $('#wmSize');
    const wmPadding = $('#wmPadding');
    const wmOpacity = $('#wmOpacity');
    const wmRotation = $('#wmRotation');
    const wmColor = $('#wmColor');

    const wmSizeValue = $('#wmSizeValue');
    const wmPaddingValue = $('#wmPaddingValue');
    const wmOpacityValue = $('#wmOpacityValue');
    const wmRotationValue = $('#wmRotationValue');
    const wmColorHex = $('#wmColorHex');

    const themeToggle = $('#themeToggle');
    const sidebar = $('#sidebar');
    const mobileMenu = $('#mobileMenu');
    const sidebarOverlay = $('#sidebarOverlay');

    let fontWeight = 'normal';

    // --- Theme ---
    function initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }

    initTheme();
    themeToggle.addEventListener('click', toggleTheme);

    // --- Mobile Sidebar ---
    mobileMenu.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });

    // --- File Upload ---
    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFile(fileInput.files[0]);
        }
    });

    fileRemove.addEventListener('click', () => {
        uploadedImage = null;
        fileInput.value = '';
        uploadZone.style.display = '';
        fileInfo.style.display = 'none';
        canvas.style.display = 'none';
        previewPlaceholder.style.display = '';
        downloadBtn.disabled = true;
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                uploadedImage = img;
                fileName.textContent = file.name;
                uploadZone.style.display = 'none';
                fileInfo.style.display = '';
                canvas.style.display = '';
                previewPlaceholder.style.display = 'none';
                downloadBtn.disabled = false;
                zoomLevel = 1;
                renderWatermark();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // --- Watermark Rendering ---
    function renderWatermark() {
        if (!uploadedImage) return;

        const img = uploadedImage;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Watermark settings
        const text = wmText.value || 'WATERMARK';
        const size = parseInt(wmSize.value);
        const padding = parseInt(wmPadding.value);
        const opacity = parseInt(wmOpacity.value) / 100;
        const rotation = parseInt(wmRotation.value) * (Math.PI / 180);
        const color = wmColor.value;

        // Parse color to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.font = `${fontWeight} ${size}px 'Inter', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate pattern dimensions
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const stepX = textWidth + padding;
        const stepY = size + padding;

        // Translate to center, rotate, then tile
        const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        const startX = -diagonal;
        const startY = -diagonal;
        const endX = diagonal;
        const endY = diagonal;

        for (let y = startY; y < endY; y += stepY) {
            for (let x = startX; x < endX; x += stepX) {
                ctx.fillText(text, x, y);
            }
        }

        ctx.restore();

        // Apply zoom
        canvas.style.transform = `scale(${zoomLevel})`;
    }

    // --- Debounced render ---
    let renderTimeout;
    function debouncedRender() {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(renderWatermark, 30);
    }

    // --- Control event listeners ---
    wmText.addEventListener('input', debouncedRender);

    const rangeControls = [
        { input: wmSize, display: wmSizeValue, suffix: 'px' },
        { input: wmPadding, display: wmPaddingValue, suffix: 'px' },
        { input: wmOpacity, display: wmOpacityValue, suffix: '%' },
        { input: wmRotation, display: wmRotationValue, suffix: '\u00B0' },
    ];

    rangeControls.forEach(({ input, display, suffix }) => {
        input.addEventListener('input', () => {
            display.textContent = input.value + suffix;
            debouncedRender();
        });
    });

    wmColor.addEventListener('input', () => {
        wmColorHex.textContent = wmColor.value.toUpperCase();
        debouncedRender();
    });

    // --- Font Weight Toggle ---
    document.querySelectorAll('.toggle-btn[data-weight]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.toggle-btn[data-weight]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            fontWeight = btn.dataset.weight;
            debouncedRender();
        });
    });

    // --- Presets ---
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            wmText.value = btn.dataset.text;
            wmOpacity.value = btn.dataset.opacity;
            wmOpacityValue.textContent = btn.dataset.opacity + '%';
            wmSize.value = btn.dataset.size;
            wmSizeValue.textContent = btn.dataset.size + 'px';
            debouncedRender();
        });
    });

    // --- Zoom ---
    $('#zoomIn').addEventListener('click', () => {
        zoomLevel = Math.min(zoomLevel + 0.25, 3);
        if (uploadedImage) canvas.style.transform = `scale(${zoomLevel})`;
    });

    $('#zoomOut').addEventListener('click', () => {
        zoomLevel = Math.max(zoomLevel - 0.25, 0.25);
        if (uploadedImage) canvas.style.transform = `scale(${zoomLevel})`;
    });

    $('#zoomReset').addEventListener('click', () => {
        zoomLevel = 1;
        if (uploadedImage) canvas.style.transform = `scale(${zoomLevel})`;
    });

    // --- Download ---
    downloadBtn.addEventListener('click', () => {
        if (!uploadedImage) return;
        const link = document.createElement('a');
        link.download = 'watermarked-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

})();
