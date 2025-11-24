import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * This is used for WordPress content that may contain HTML
 * Using isomorphic-dompurify which works in both browser and Node.js
 */
export function sanitizeHTML(dirty: string): string {
    // Configure DOMPurify to allow safe HTML tags
    const config = {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
            'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
        ],
        ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'
        ],
        ALLOW_DATA_ATTR: false,
    };

    return DOMPurify.sanitize(dirty, config);
}
