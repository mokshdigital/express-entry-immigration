import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks
 * This is used for WordPress content that may contain HTML
 * Using sanitize-html which is a pure string-based sanitizer (no jsdom required)
 */
export function sanitizeHTML(dirty: string): string {
    // Convert line breaks to HTML <br> tags
    // WordPress uses \r\n for line breaks which don't render in HTML
    const withBreaks = dirty
        .replace(/\r\n\r\n/g, '<br><br>')  // Double line breaks (paragraph spacing)
        .replace(/\r\n/g, '<br>')          // Single line breaks
        .replace(/\n\n/g, '<br><br>')      // Unix double line breaks
        .replace(/\n/g, '<br>');           // Unix single line breaks

    return sanitizeHtml(withBreaks, {
        allowedTags: [
            'p', 'br', 'strong', 'em', 'u', 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
            'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'
        ],
        allowedAttributes: {
            'a': ['href', 'target', 'rel', 'title', 'class', 'id', 'style'],
            'img': ['src', 'alt', 'title', 'class', 'id', 'width', 'height', 'style'],
            '*': ['class', 'id', 'style']
        },
        allowedStyles: {
            '*': {
                // Allow common text formatting styles
                'color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
                'background-color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
                'font-size': [/^\d+(?:px|em|rem|%|pt)$/],
                'font-weight': [/^(?:normal|bold|bolder|lighter|\d{3})$/],
                'font-style': [/^(?:normal|italic|oblique)$/],
                'text-align': [/^(?:left|right|center|justify)$/],
                'text-decoration': [/^(?:none|underline|overline|line-through)$/],
                'margin': [/^\d+(?:px|em|rem|%)$/],
                'margin-top': [/^\d+(?:px|em|rem|%)$/],
                'margin-bottom': [/^\d+(?:px|em|rem|%)$/],
                'margin-left': [/^\d+(?:px|em|rem|%)$/],
                'margin-right': [/^\d+(?:px|em|rem|%)$/],
                'padding': [/^\d+(?:px|em|rem|%)$/],
                'padding-top': [/^\d+(?:px|em|rem|%)$/],
                'padding-bottom': [/^\d+(?:px|em|rem|%)$/],
                'padding-left': [/^\d+(?:px|em|rem|%)$/],
                'padding-right': [/^\d+(?:px|em|rem|%)$/],
                'line-height': [/^\d+(?:\.\d+)?(?:px|em|rem|%)?$/],
                'font-family': [/.*/]
            }
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    });
}
