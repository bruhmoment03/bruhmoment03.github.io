/* ============================================
   ToolKit Pro - Internationalization (i18n)
   Supports: English (en), Traditional Chinese (zh-TW)
   ============================================ */

const translations = {
    en: {
        // Nav
        'nav.home': 'Home',
        'nav.tools': 'Tools',
        'nav.watermark': 'Watermark',
        'nav.compress': 'Compress',
        'nav.convert': 'Convert',
        'nav.soon': 'Soon',

        // Homepage
        'home.hero.tag': 'Free & Open Source',
        'home.hero.title1': 'Professional Tools',
        'home.hero.title2': 'for Your Documents',
        'home.hero.desc': 'Watermark, compress, and convert your documents and ID cards with ease. All processing happens in your browser \u2014 your files never leave your device.',
        'home.hero.cta': 'Get Started',
        'home.hero.cta2': 'View Tools',

        'home.features.title': 'Why ToolKit Pro?',
        'home.features.subtitle': 'Everything you need to protect and manage your documents',
        'home.feat1.title': 'Browser-Based',
        'home.feat1.desc': 'All processing happens locally in your browser. Your files are never uploaded to any server.',
        'home.feat2.title': 'Fully Customizable',
        'home.feat2.desc': 'Fine-tune every parameter \u2014 text, size, opacity, rotation, color, and spacing.',
        'home.feat3.title': 'Instant Results',
        'home.feat3.desc': 'Real-time preview as you adjust settings. Download your result in one click.',

        'home.tools.title': 'Available Tools',
        'home.tools.subtitle': 'Choose a tool to get started',
        'home.tool.watermark.title': 'Watermark Tool',
        'home.tool.watermark.desc': 'Add customizable watermarks to documents, passport photos, and ID cards. Protect your sensitive files.',
        'home.tool.watermark.cta': 'Open Tool',
        'home.tool.compress.title': 'Image Compress',
        'home.tool.compress.desc': 'Reduce file sizes without losing quality. Perfect for documents and photos.',
        'home.tool.compress.cta': 'Coming Soon',
        'home.tool.convert.title': 'Format Convert',
        'home.tool.convert.desc': 'Convert between image formats \u2014 JPG, PNG, WEBP, and more.',
        'home.tool.convert.cta': 'Coming Soon',

        'home.footer': 'Made with care. All processing happens in your browser.',

        // Watermark Tool
        'wm.breadcrumb.tools': 'Tools',
        'wm.breadcrumb.watermark': 'Watermark',
        'wm.upload.title': 'Upload',
        'wm.upload.text': 'Drop your file here or',
        'wm.upload.browse': 'browse',
        'wm.upload.hint': 'Supports JPG, PNG, WEBP images',
        'wm.settings.title': 'Watermark Settings',
        'wm.settings.text': 'Text',
        'wm.settings.text.placeholder': 'Enter watermark text',
        'wm.settings.size': 'Font Size',
        'wm.settings.spacing': 'Spacing',
        'wm.settings.opacity': 'Opacity',
        'wm.settings.rotation': 'Rotation',
        'wm.settings.color': 'Color',
        'wm.settings.weight': 'Font Weight',
        'wm.settings.weight.regular': 'Regular',
        'wm.settings.weight.bold': 'Bold',
        'wm.presets.title': 'Presets',
        'wm.download': 'Download Watermarked Image',
        'wm.preview.title': 'Preview',
        'wm.preview.placeholder': 'Upload an image to preview',
    },

    'zh-TW': {
        // Nav
        'nav.home': '\u9996\u9801',
        'nav.tools': '\u5DE5\u5177',
        'nav.watermark': '\u6C34\u5370',
        'nav.compress': '\u58D3\u7E2E',
        'nav.convert': '\u8F49\u6A94',
        'nav.soon': '\u5373\u5C07\u63A8\u51FA',

        // Homepage
        'home.hero.tag': '\u514D\u8CBB\u958B\u6E90',
        'home.hero.title1': '\u5C08\u696D\u6587\u4EF6',
        'home.hero.title2': '\u8655\u7406\u5DE5\u5177',
        'home.hero.desc': '\u8F15\u9B06\u70BA\u60A8\u7684\u6587\u4EF6\u548C\u8B49\u4EF6\u7167\u7247\u6DFB\u52A0\u6C34\u5370\u3001\u58D3\u7E2E\u548C\u8F49\u6A94\u3002\u6240\u6709\u8655\u7406\u5747\u5728\u60A8\u7684\u700F\u89BD\u5668\u4E2D\u5B8C\u6210\uFF0C\u6A94\u6848\u7D55\u4E0D\u6703\u96E2\u958B\u60A8\u7684\u88DD\u7F6E\u3002',
        'home.hero.cta': '\u958B\u59CB\u4F7F\u7528',
        'home.hero.cta2': '\u700F\u89BD\u5DE5\u5177',

        'home.features.title': '\u70BA\u4EC0\u9EBC\u9078\u64C7 ToolKit Pro\uFF1F',
        'home.features.subtitle': '\u4FDD\u8B77\u548C\u7BA1\u7406\u6587\u4EF6\u6240\u9700\u7684\u4E00\u5207',
        'home.feat1.title': '\u700F\u89BD\u5668\u7AEF\u8655\u7406',
        'home.feat1.desc': '\u6240\u6709\u8655\u7406\u5747\u5728\u60A8\u7684\u700F\u89BD\u5668\u4E2D\u672C\u5730\u5B8C\u6210\uFF0C\u6A94\u6848\u7D55\u4E0D\u6703\u4E0A\u50B3\u81F3\u4EFB\u4F55\u4F3A\u670D\u5668\u3002',
        'home.feat2.title': '\u5B8C\u5168\u53EF\u81EA\u8A02',
        'home.feat2.desc': '\u7CBE\u7D30\u8ABF\u6574\u6BCF\u500B\u53C3\u6578\uFF1A\u6587\u5B57\u3001\u5927\u5C0F\u3001\u900F\u660E\u5EA6\u3001\u65CB\u8F49\u3001\u984F\u8272\u548C\u9593\u8DDD\u3002',
        'home.feat3.title': '\u5373\u6642\u9810\u89BD',
        'home.feat3.desc': '\u8ABF\u6574\u8A2D\u5B9A\u6642\u5373\u6642\u9810\u89BD\u3002\u4E00\u9375\u4E0B\u8F09\u60A8\u7684\u6210\u679C\u3002',

        'home.tools.title': '\u53EF\u7528\u5DE5\u5177',
        'home.tools.subtitle': '\u9078\u64C7\u5DE5\u5177\u4EE5\u958B\u59CB',
        'home.tool.watermark.title': '\u6C34\u5370\u5DE5\u5177',
        'home.tool.watermark.desc': '\u70BA\u6587\u4EF6\u3001\u8B77\u7167\u7167\u7247\u548C\u8B49\u4EF6\u6DFB\u52A0\u53EF\u81EA\u8A02\u6C34\u5370\uFF0C\u4FDD\u8B77\u60A8\u7684\u6575\u611F\u6A94\u6848\u3002',
        'home.tool.watermark.cta': '\u958B\u555F\u5DE5\u5177',
        'home.tool.compress.title': '\u5716\u7247\u58D3\u7E2E',
        'home.tool.compress.desc': '\u5728\u4E0D\u640D\u5931\u54C1\u8CEA\u7684\u60C5\u6CC1\u4E0B\u6E1B\u5C0F\u6A94\u6848\u5927\u5C0F\uFF0C\u9069\u7528\u65BC\u6587\u4EF6\u548C\u7167\u7247\u3002',
        'home.tool.compress.cta': '\u5373\u5C07\u63A8\u51FA',
        'home.tool.convert.title': '\u683C\u5F0F\u8F49\u6A94',
        'home.tool.convert.desc': '\u5728 JPG\u3001PNG\u3001WEBP \u7B49\u5716\u7247\u683C\u5F0F\u4E4B\u9593\u8F49\u63DB\u3002',
        'home.tool.convert.cta': '\u5373\u5C07\u63A8\u51FA',

        'home.footer': '\u7528\u5FC3\u88FD\u4F5C\u3002\u6240\u6709\u8655\u7406\u5747\u5728\u60A8\u7684\u700F\u89BD\u5668\u4E2D\u5B8C\u6210\u3002',

        // Watermark Tool
        'wm.breadcrumb.tools': '\u5DE5\u5177',
        'wm.breadcrumb.watermark': '\u6C34\u5370',
        'wm.upload.title': '\u4E0A\u50B3',
        'wm.upload.text': '\u5C07\u6A94\u6848\u62D6\u653E\u81F3\u6B64\u6216',
        'wm.upload.browse': '\u700F\u89BD\u6A94\u6848',
        'wm.upload.hint': '\u652F\u63F4 JPG\u3001PNG\u3001WEBP \u5716\u7247',
        'wm.settings.title': '\u6C34\u5370\u8A2D\u5B9A',
        'wm.settings.text': '\u6587\u5B57',
        'wm.settings.text.placeholder': '\u8F38\u5165\u6C34\u5370\u6587\u5B57',
        'wm.settings.size': '\u5B57\u578B\u5927\u5C0F',
        'wm.settings.spacing': '\u9593\u8DDD',
        'wm.settings.opacity': '\u900F\u660E\u5EA6',
        'wm.settings.rotation': '\u65CB\u8F49',
        'wm.settings.color': '\u984F\u8272',
        'wm.settings.weight': '\u5B57\u578B\u7C97\u7D30',
        'wm.settings.weight.regular': '\u6B63\u5E38',
        'wm.settings.weight.bold': '\u7C97\u9AD4',
        'wm.presets.title': '\u9810\u8A2D',
        'wm.download': '\u4E0B\u8F09\u6C34\u5370\u5716\u7247',
        'wm.preview.title': '\u9810\u89BD',
        'wm.preview.placeholder': '\u4E0A\u50B3\u5716\u7247\u4EE5\u9810\u89BD',
    }
};

function initI18n() {
    const saved = localStorage.getItem('lang');
    const lang = saved || (navigator.language.startsWith('zh') ? 'zh-TW' : 'en');
    setLanguage(lang);
}

function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update language switcher display
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
}
