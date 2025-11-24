import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks
 * This is used for WordPress content that may contain HTML
 * Using sanitize-html which is a pure string-based sanitizer (no jsdom required)
 */
export function sanitizeHTML(dirty: string): string {
    return sanitizeHtml(dirty, {
        allowedTags: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
            'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
        ],
        allowedAttributes: {
            'a': ['href', 'target', 'rel', 'title', 'class', 'id'],
            'img': ['src', 'alt', 'title', 'class', 'id'],
            '*': ['class', 'id']
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    });
}
