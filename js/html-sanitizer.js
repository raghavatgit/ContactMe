// Lightweight Input Sanitizer and Entity Encoder
// Escapes untrusted user input before dynamic rendering to prevent stored XSS.

export function sanitizeHtml(rawString: string): string {
    const entityMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    return rawString.replace(/[&<>"'/]/g, (match) => entityMap[match]);
}
