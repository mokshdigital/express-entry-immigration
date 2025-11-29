/**
 * Decode HTML entities in a string
 * Converts &amp; to &, &#038; to &, &lt; to <, &quot; to ", etc.
 * 
 * This is used for WordPress title.rendered fields which come pre-encoded
 * but need to be decoded when rendered as plain text in React
 */
export function decodeHTML(html: string): string {
    if (typeof window === 'undefined') {
        // Server-side: use a simple regex-based approach for common entities
        return html
            .replace(/&amp;/g, '&')
            .replace(/&#038;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&apos;/g, "'");
    }

    // Client-side: use browser's native HTML parsing
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
