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

## Actual Endpoint URLS

# Custom Posts

- Stats: https://cms.expressentryimmigration.ca/wp-json/wp/v2/stats
- Services: https://cms.expressentryimmigration.ca/wp-json/wp/v2/services
- Testimonials: https://cms.expressentryimmigration.ca/wp-json/wp/v2/testimonials
- FAQs: https://cms.expressentryimmigration.ca/wp-json/wp/v2/faqs

# Options
- Hero Settings: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/hero-settings
- Site Settings: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/site-settings
- Navigation Settings: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/navigation-settings
- Social Links: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/social-links
- SEO Settings: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/seo-settings
- Contact Settings: https://cms.expressentryimmigration.ca/wp-json/acf/v3/options/contact-settings


API Test

API Test Page
Posts
Count: 5

{
  "id": 123,
  "date": "2025-11-19T12:33:45",
  "date_gmt": "2025-11-19T20:33:45",
  "guid": {
    "rendered": "https://cms.expressentryimmigration.ca/?p=123"
  },
  "modified": "2025-11-19T12:33:45",
  "modified_gmt": "2025-11-19T20:33:45",
  "slug": "work-permit-extension-what-you-need-to-know",
  "status": "publish",
  "type": "post",
  "link": "https://cms.expressentryimmigration.ca/work-permit-extension-what-you-need-to-know/",
  "title": {
    "rendered": "Work Permit Extension: What You Need to Know"
  },
  "content": {
    "rendered": "<p>Lorem ipsum dolor sit amet. If your work permit is expiring soon, here&#8217;s what you need to know about extensions:</p>\n",
    "protected": false
  },
  "excerpt": {
    "rendered": "<p>Lorem ipsum dolor sit amet. If your work permit is expiring soon, here&#8217;s what you need to know about extensions:</p>\n",
    "protected": false
  },
  "author": 1,
  "featured_media": 78,
  "comment_status": "closed",
  "ping_status": "open",
  "sticky": false,
  "template": "",
  "format": "standard",
  "meta": {
    "_acf_changed": false,
    "footnotes": ""
  },
  "categories": [
    7
  ],
  "tags": [],
  "class_list": [
    "post-123",
    "post",
    "type-post",
    "status-publish",
    "format-standard",
    "has-post-thumbnail",
    "hentry",
    "category-work"
  ],
  "acf": [],
  "_links": {
    "self": [
      {
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts/123",
        "targetHints": {
          "allow": [
            "GET"
          ]
        }
      }
    ],
    "collection": [
      {
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts"
      }
    ],
    "about": [
      {
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/types/post"
      }
    ],
    "author": [
      {
        "embeddable": true,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/users/1"
      }
    ],
    "replies": [
      {
        "embeddable": true,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/comments?post=123"
      }
    ],
    "version-history": [
      {
        "count": 2,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts/123/revisions"
      }
    ],
    "predecessor-version": [
      {
        "id": 125,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts/123/revisions/125"
      }
    ],
    "wp:featuredmedia": [
      {
        "embeddable": true,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/media/78"
      }
    ],
    "wp:attachment": [
      {
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/media?parent=123"
      }
    ],
    "wp:term": [
      {
        "taxonomy": "category",
        "embeddable": true,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/categories?post=123"
      },
      {
        "taxonomy": "post_tag",
        "embeddable": true,
        "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/tags?post=123"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  },
  "_embedded": {
    "author": [
      {
        "id": 1,
        "name": "aakash",
        "url": "https://cms.expressentryimmigration.ca",
        "description": "",
        "link": "https://cms.expressentryimmigration.ca/author/aakash/",
        "slug": "aakash",
        "avatar_urls": {
          "24": "https://secure.gravatar.com/avatar/37c424b8d10bf36ed67da2c741f1f9bff8893447ab86a3507a21174645924377?s=24&d=mm&r=g",
          "48": "https://secure.gravatar.com/avatar/37c424b8d10bf36ed67da2c741f1f9bff8893447ab86a3507a21174645924377?s=48&d=mm&r=g",
          "96": "https://secure.gravatar.com/avatar/37c424b8d10bf36ed67da2c741f1f9bff8893447ab86a3507a21174645924377?s=96&d=mm&r=g"
        },
        "acf": [],
        "_links": {
          "self": [
            {
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/users/1",
              "targetHints": {
                "allow": [
                  "GET"
                ]
              }
            }
          ],
          "collection": [
            {
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/users"
            }
          ]
        }
      }
    ],
    "wp:featuredmedia": [
      {
        "id": 78,
        "date": "2025-11-19T09:24:56",
        "slug": "priscilla-du-preez-nf8xhlmmg0c-unsplash",
        "type": "attachment",
        "link": "https://cms.expressentryimmigration.ca/services/study-permits/priscilla-du-preez-nf8xhlmmg0c-unsplash/",
        "title": {
          "rendered": "priscilla-du-preez-nF8xhLMmg0c-unsplash"
        },
        "author": 1,
        "featured_media": 0,
        "acf": [],
        "caption": {
          "rendered": ""
        },
        "alt_text": "",
        "media_type": "image",
        "mime_type": "image/jpeg",
        "media_details": {
          "width": 2560,
          "height": 1707,
          "file": "2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-scaled.jpg",
          "filesize": 546546,
          "sizes": {
            "medium": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-300x200.jpg",
              "width": 300,
              "height": 200,
              "filesize": 14082,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-300x200.jpg"
            },
            "large": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-1024x683.jpg",
              "width": 1024,
              "height": 683,
              "filesize": 101900,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-1024x683.jpg"
            },
            "thumbnail": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-150x150.jpg",
              "width": 150,
              "height": 150,
              "filesize": 6590,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-150x150.jpg"
            },
            "medium_large": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-768x512.jpg",
              "width": 768,
              "height": 512,
              "filesize": 62993,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-768x512.jpg"
            },
            "1536x1536": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-1536x1024.jpg",
              "width": 1536,
              "height": 1024,
              "filesize": 206234,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-1536x1024.jpg"
            },
            "2048x2048": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-2048x1365.jpg",
              "width": 2048,
              "height": 1365,
              "filesize": 353020,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-2048x1365.jpg"
            },
            "full": {
              "file": "priscilla-du-preez-nF8xhLMmg0c-unsplash-scaled.jpg",
              "width": 2560,
              "height": 1707,
              "mime_type": "image/jpeg",
              "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-scaled.jpg"
            }
          },
          "image_meta": {
            "aperture": "0",
            "credit": "",
            "camera": "",
            "caption": "",
            "created_timestamp": "0",
            "copyright": "",
            "focal_length": "0",
            "iso": "0",
            "shutter_speed": "0",
            "title": "",
            "orientation": "0",
            "keywords": []
          },
          "original_image": "priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg"
        },
        "source_url": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-scaled.jpg",
        "_links": {
          "self": [
            {
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/media/78",
              "targetHints": {
                "allow": [
                  "GET"
                ]
              }
            }
          ],
          "collection": [
            {
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/media"
            }
          ],
          "about": [
            {
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/types/attachment"
            }
          ],
          "author": [
            {
              "embeddable": true,
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/users/1"
            }
          ],
          "replies": [
            {
              "embeddable": true,
              "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/comments?post=78"
            }
          ]
        }
      }
    ],
    "wp:term": [
      [
        {
          "id": 7,
          "link": "https://cms.expressentryimmigration.ca/category/work/",
          "name": "Work",
          "slug": "work",
          "taxonomy": "category",
          "acf": [],
          "_links": {
            "self": [
              {
                "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/categories/7",
                "targetHints": {
                  "allow": [
                    "GET"
                  ]
                }
              }
            ],
            "collection": [
              {
                "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/categories"
              }
            ],
            "about": [
              {
                "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/taxonomies/category"
              }
            ],
            "wp:post_type": [
              {
                "href": "https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts?categories=7"
              }
            ],
            "curies": [
              {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
              }
            ]
          }
        }
      ],
      []
    ]
  }
}
Services
Count: 6

Other Services -
Canadian Citizenship Applications -
Visitor Visa &#038; Tourist Visa Services -
Permanent Residency -
Work Permits -
Study Permits -
Testimonials
Count: 6

Featured: 0

FAQs
Count: 10

Stats
Count: 4

-
-
-
-
Hero Settings
{
  "hero_headline": "Your Gateway to Canadian Immigration Success",
  "hero_subtext": "Expert guidance for students, workers, and families seeking to make Canada their home. Licensed RCIC consultants with proven results.",
  "hero_cta_text": "Book Free Consultation",
  "hero_cta_icon": "calendar",
  "hero_background_image": "https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/priscilla-du-preez-nF8xhLMmg0c-unsplash-scaled.jpg",
  "hero_meta_title": "Express Entry Immigration Services | Expert Canadian Immigration Consultants",
  "hero_meta_description": "Licensed RCIC immigration consultants helping you navigate Canadian immigration. Study permits, work permits, PR, citizenship. Book your free consultation today"
}
Contact Settings
{
  "address": "123 Main Street, Suite 200\\nToronto, ON M5V 3A8\\nCanada",
  "phone": "+1 (416) 555-0100",
  "email": "info@expressentryimmigration.ca",
  "map_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7937402683935!2d-122.41941558468165!3d37.774929479759715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806443c70669%3A0xc3c570f862378829!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1637376000000!5m2!1sen!2sus"
}
