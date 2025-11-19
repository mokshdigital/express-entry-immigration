# WordPress Setup Checklist

## Phase 2 Checklist

### Basic WordPress Configuration
- [Y] WordPress updated to latest version
- [Y] Permalink structure set to "Post name"
- [Y] Site title updated to "Express Entry Immigration Services"
- [Y] Tagline updated or removed
- [Y] Timezone set correctly
- [Y] Default categories cleaned up

### Plugin Installation
- [Y] ACF PRO installed and activated
- [Y] Rank Math installed and activated
- [Y] Classic Editor installed and activated
- [Y] LiteSpeed Cache (or WP Super Cache) installed and activated

### Theme
- [Y] Default theme activated (TwentyTwentyFour or similar)
- [Y] Note: Frontend rendering happens via Next.js, not WordPress theme

### Rank Math Configuration
- [Y] Setup wizard completed
- [Y] Sitemap enabled
- [Y] Default meta settings configured
- [Y] Schema markup basics enabled

### REST API Verification
- [Y] Can access: https://cms.expressentryimmigration.ca/wp-json
- [Y] Can access: https://cms.expressentryimmigration.ca/wp-json/wp/v2/posts
- [Y] ACF fields appear in API responses

## Phase 3 Checklist

### Custom Post Types
- [Y] Services (custom post type)
- [Y] Testimonials (custom post type)
- [Y] FAQs (custom post type)
- [Y] Stats Counter (custom post type)

### ACF Field Groups
- [Y] Hero Settings (Options page)
- [Y] Navigation Settings (Options page)
- [Y] Contact Settings (Options page)
- [Y] Social Links (Options page)
- [Y] SEO Settings (Options page)
- [Y] Site Settings (Options page)
- [Y] Stats Counter fields (for custom post type)
- [Y] Testimonials fields (for custom post type)
- [Y] FAQ fields (for custom post type)
- [Y] Service fields (for custom post type)

### Demo Content
- [Y] 6 Service posts with demo content
- [Y] 6-8 Testimonials with demo content
- [Y] 4 Stats with demo numbers
- [Y] 10-15 FAQs with demo Q&A
- [Y] 5-6 Blog posts with demo content
- [Y] Hero settings populated
- [Y] Contact info populated
- [Y] Social links populated
- [Y] Site settings populated

---

## Common Issues & Solutions

### Issue: ACF fields not showing in REST API
**Solution:** Ensure "ACF to REST API" plugin is activated and field groups are set to show in REST API.

### Issue: LiteSpeed Cache not available
**Solution:** Install WP Super Cache instead. LiteSpeed Cache only works with LiteSpeed servers.

### Issue: Cannot access REST API endpoints
**Solution:** 
1. Check permalink structure (should be "Post name")
2. Re-save permalink settings
3. Check .htaccess file permissions

### Issue: Wordfence blocking requests
**Solution:** Whitelist your IP address in Wordfence settings.