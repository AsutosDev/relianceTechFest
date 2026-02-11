/**
 * Lucide Icon Helper
 * Creates SVG icon elements using the Lucide library loaded via CDN.
 */
export function icon(name, className = '') {
    const el = document.createElement('span');
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    const i = el.querySelector('i');
    if (className) {
        className.split(' ').forEach(c => {
            if (c.trim()) i.classList.add(c.trim());
        });
    }
    // Lucide will replace <i data-lucide="..."> with <svg> when we call createIcons
    return el.innerHTML;
}

/**
 * Call this after inserting HTML that contains icon() output.
 * It tells Lucide to scan for <i data-lucide="..."> and replace them with SVGs.
 */
export function refreshIcons(container) {
    if (window.lucide) {
        window.lucide.createIcons({
            attrs: {},
            nameAttr: 'data-lucide',
            ...(container ? { nodes: container.querySelectorAll('[data-lucide]') } : {})
        });
    }
}
