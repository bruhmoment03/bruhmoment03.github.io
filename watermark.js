/* ============================================
   ToolKit Pro - Watermark Tool Logic
   ============================================ */

(function() {
    'use strict';

    let uploadedImage = null;
    let zoomLevel = 1;
    let fontWeight = 'normal';

    const $ = (sel) => document.querySelector(sel);
    const canvas = $('#previewCanvas');
    const ctx = canvas.getContext('2d');

    const fileInput = $('#fileInput');
    const uploadZone = $('#uploadZone');
    const fileInfo = $('#fileInfo');
    const fileName = $('#fileName');
    const fileRemove = $('#fileRemove');
    const previewPlaceholder = $('#previewPlaceholder');
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
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) handleFile(fileInput.files[0]);
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
        if (!file.type.startsWith('image/')) return;

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

        ctx.drawImage(img, 0, 0);

        const text = wmText.value || 'WATERMARK';
        const size = parseInt(wmSize.value);
        const padding = parseInt(wmPadding.value);
        const opacity = parseInt(wmOpacity.value) / 100;
        const rotation = parseInt(wmRotation.value) * (Math.PI / 180);
        const color = wmColor.value;

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.font = `${fontWeight} ${size}px 'Inter', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const stepX = textWidth + padding;
        const stepY = size + padding;

        const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        for (let y = -diagonal; y < diagonal; y += stepY) {
            for (let x = -diagonal; x < diagonal; x += stepX) {
                ctx.fillText(text, x, y);
            }
        }

        ctx.restore();
        canvas.style.transform = `scale(${zoomLevel})`;
    }

    // --- Debounced render ---
    let renderTimeout;
    function debouncedRender() {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(renderWatermark, 30);
    }

    // --- Controls ---
    wmText.addEventListener('input', debouncedRender);

    [
        { input: wmSize, display: wmSizeValue, suffix: 'px' },
        { input: wmPadding, display: wmPaddingValue, suffix: 'px' },
        { input: wmOpacity, display: wmOpacityValue, suffix: '%' },
        { input: wmRotation, display: wmRotationValue, suffix: '\u00B0' },
    ].forEach(({ input, display, suffix }) => {
        input.addEventListener('input', () => {
            display.textContent = input.value + suffix;
            debouncedRender();
        });
    });

    wmColor.addEventListener('input', () => {
        wmColorHex.textContent = wmColor.value.toUpperCase();
        debouncedRender();
    });

    // --- Font Weight ---
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

    // --- Download (works on iOS/Safari too) ---
    downloadBtn.addEventListener('click', () => {
        if (!uploadedImage) return;

        canvas.toBlob((blob) => {
            if (!blob) return;

            // iOS Safari: open image in new tab since download attr is not supported
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            if (isIOS) {
                const url = URL.createObjectURL(blob);
                const win = window.open(url, '_blank');
                if (!win) {
                    // Fallback: show instructions
                    const img = new Image();
                    img.src = url;
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px;';
                    const msg = document.createElement('p');
                    msg.style.cssText = 'font-size:14px;color:var(--text-secondary);text-align:center;';
                    msg.textContent = 'Long press the image below and tap "Save Image"';
                    const closeBtn = document.createElement('button');
                    closeBtn.textContent = 'Close';
                    closeBtn.className = 'btn-secondary';
                    closeBtn.onclick = () => { overlay.remove(); URL.revokeObjectURL(url); };
                    img.style.cssText = 'max-width:90%;max-height:60vh;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);';
                    overlay.append(msg, img, closeBtn);
                    document.body.appendChild(overlay);
                }
            } else {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'watermarked-image.png';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
        }, 'image/png');
    });

})();
