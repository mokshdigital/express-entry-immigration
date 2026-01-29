# How to Configure "About Settings" in WordPress

Since the "About Us" page is now dynamic, you need to configure the backend (WordPress) to provide this data.

## Step 1: Register the Options Page
If you are using the **Code Snippets** plugin or adding to your theme's `functions.php`, add this PHP code to register the new Options page.

```php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'About Settings',
        'menu_title'    => 'About Settings',
        'menu_slug'     => 'about-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false,
        'show_in_rest'  => true, // CRITICAL: This enables the API endpoint
    ));
}
```

## Step 2: Create the ACF Field Group
1. Go to **Custom Fields > Field Groups**.
2. Click **Add New**.
3. Title it: **Request: About Page Settings** (or just About Settings).
4. **Location Rules**: Show this field group if `Options Page` is equal to `About Settings`.

## Step 3: Add Fields
Add the following fields EXACTLY as named (the "Field Name" column is what matters for the API).

| Field Label | Field Name | Field Type | Instructions |
| :--- | :--- | :--- | :--- |
| **Hero Section** | | **Tab** | |
| Hero Headline | `about_hero_headline` | Text | e.g. "About Express Entry..." |
| Hero Description | `about_hero_description` | Text Area | |
| **Mission Section** | | **Tab** | |
| Mission Title | `about_mission_title` | Text | e.g. "Our Mission" |
| Mission Para 1 | `about_mission_description_1` | Text Area | |
| Mission Para 2 | `about_mission_description_2` | Text Area | |
| Mission Para 3 | `about_mission_description_3` | Text Area | |
| Mission Image | `about_mission_image` | Image | Return Format: **Image URL** |
| **Lead Consultant** | | **Tab** | |
| Name | `about_lead_name` | Text | e.g. "Ashish Manral" |
| Title | `about_lead_title` | Text | e.g. "RCIC, R#" |
| Credentials | `about_lead_credentials` | Text Area | |
| Expertise | `about_lead_expertise` | Text Area | **Important**: Enter one item per line. |
| Commitment | `about_lead_commitment` | Text Area | |
| **Values** | | **Tab** | |
| Core Values | `about_values` | Repeater | |
| -- Title | `title` | Text | (Sub-field of Repeater) |
| -- Description | `description` | Text Area | (Sub-field of Repeater) |
| **Why Choose Us** | | **Tab** | |
| Reasons | `about_why_choose_us` | Repeater | |
| -- Title | `title` | Text | (Sub-field of Repeater) |
| -- Description | `description` | Text Area | (Sub-field of Repeater) |

## Step 4: Verify
1. Go to the new **About Settings** menu in your WordPress sidebar.
2. Fill in the data.
3. Check the API: `https://cms.expressentryimmigration.ca/wp-json/options/about-settings`
   - You should see JSON data.
4. Refresh your website (might need to wait 60s or restart dev server).
