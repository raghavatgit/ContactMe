// Accessible Screen Reader Announcer
// Injects dynamic status feedback into an ARIA live region.

export class AccessibilityAnnouncer {
    private liveRegion: HTMLElement;

    constructor() {
        let el = document.getElementById('aria-live-announcer');
        if (!el) {
            el = document.createElement('div');
            el.id = 'aria-live-announcer';
            el.setAttribute('aria-live', 'polite');
            el.setAttribute('aria-atomic', 'true');
            el.style.position = 'absolute';
            el.style.width = '1px';
            el.style.height = '1px';
            el.style.margin = '-1px';
            el.style.padding = '0';
            el.style.overflow = 'hidden';
            el.style.clip = 'rect(0, 0, 0, 0)';
            el.style.border = '0';
            document.body.appendChild(el);
        }
        this.liveRegion = el;
    }

    public announce(message: string): void {
        this.liveRegion.textContent = '';
        setTimeout(() => {
            this.liveRegion.textContent = message;
        }, 50);
    }
}
