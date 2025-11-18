# WordPress API Reference

## Base URL
https://cms.expressentryimmigration.ca/wp-json/wp/v2

## Authentication
None required for GET requests (read-only public data).

## Endpoints (Standard WordPress)

### Posts (Blog/News)
GET /posts
GET /posts/{id}
GET /posts?categories={category_id}
GET /posts?per_page=10&page=1

### Pages
GET /pages
GET /pages/{id}
GET /pages?slug={slug}

### Categories
GET /categories
GET /categories/{id}


### Media
GET /media
GET /media/{id}

## Custom Endpoints (To be created with ACF)

### Hero Settings
GET /acf/v3/options/hero_settings
Returns:
```json
{
  "hero_headline": "Text",
  "hero_subtext": "Text",
  "hero_cta_text": "Text",
  "hero_cta_icon": "URL",
  "hero_background_image": "URL",
  "hero_meta_title": "Text",
  "hero_meta_description": "Text"
}
```

### Navigation Settings
GET /acf/v3/options/navigation_settings

### Stats Counter
GET /wp/v2/stats
Returns array of stat objects.

### Testimonials
GET /wp/v2/testimonials
GET /wp/v2/testimonials?featured=true

### FAQs
GET /wp/v2/faqs
GET /wp/v2/faqs?orderby=display_order&order=asc

### Services
GET /wp/v2/services
GET /wp/v2/services/{id}

### Contact Settings
GET /acf/v3/options/contact_settings

### Social Links
GET /acf/v3/options/social_links

### SEO Settings
GET /acf/v3/options/seo_settings

### Site Settings
GET /acf/v3/options/site_settings

## Response Formats

### Standard Post/Page Response
```json
{
  "id": 123,
  "date": "2025-11-18T10:00:00",
  "slug": "post-slug",
  "title": {
    "rendered": "Post Title"
  },
  "content": {
    "rendered": "<p>HTML content</p>"
  },
  "excerpt": {
    "rendered": "<p>Excerpt</p>"
  },
  "featured_media": 456,
  "categories": [1, 5],
  "acf": {
    // ACF fields here
  }
}
```

### Error Response
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid post ID.",
  "data": {
    "status": 404
  }
}
```

## Notes
- All WordPress REST API responses include `_links` for HATEOAS
- Images return full media object with different sizes
- ACF fields appear in `acf` object when ACF to REST API plugin is active
- Pagination info in response headers: `X-WP-Total`, `X-WP-TotalPages`

---

**This document will be updated in Phase 3 with actual endpoint URLs and data structures after ACF setup.**