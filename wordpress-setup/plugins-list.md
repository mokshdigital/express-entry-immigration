# WordPress Plugins List

Required plugins for Express Entry Immigration Services headless CMS.

## Essential Plugins (Install in Phase 2)

### 1. Advanced Custom Fields PRO paid
- **Purpose:** Custom content fields
- **Version:** Free
- **Install:** WordPress plugin directory
- **Activation:** Required immediately

### 2. Rank Math SEO
- **Purpose:** SEO management and optimization
- **Install:** WordPress plugin directory
- **Configuration:** Basic setup during Phase 2

### 3. Classic Editor
- **Purpose:** Simplified editing experience (disable Gutenberg)
- **Install:** WordPress plugin directory
- **Activation:** Required

### 4. LiteSpeed Cache
- **Purpose:** Performance caching (if Hostinger uses LiteSpeed)
- **Install:** WordPress plugin directory
- **Fallback:** WP Super Cache if LiteSpeed not compatible
- **Configuration:** Phase 2

## Optional Plugins (Install if needed)

### WP Mail SMTP
- **Purpose:** Reliable email delivery for WordPress forms
- **When:** If WordPress email delivery is unreliable
- **Configuration:** SMTP settings from hosting provider

## Plugin Installation Order

1. Advanced Custom Fields
2. Classic Editor
3. Rank Math SEO
4. LiteSpeed Cache (or WP Super Cache)

## Plugin Settings (Brief)

### ACF
- No configuration needed initially
- Field groups created in Phase 3 (acf-fields-export.json)

### Rank Math
- Run setup wizard
- Choose "Blog" or "Business" website type
- Connect to Rank Math account (optional)
- Enable basic features

### Classic Editor
- Activate - no configuration needed

### LiteSpeed Cache
- If compatible: Use default settings initially
- If not compatible: Install WP Super Cache instead