// WordPress API Response Types

export interface WordPressPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    featured_media: number;
    categories: number[];
    acf?: Record<string, any>;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
    };
}

export interface Service extends WordPressPost {
    acf: {
        service_category: string;
        service_icon: string;
        requirements: string;
        process_description: string;
        processing_time: string;
    };
}

export interface Testimonial extends WordPressPost {
    acf: {
        quote: string;
        client_name: string;
        case_type: string;
        featured: boolean;
        client_photo?: string;
    };
}

export interface FAQ extends WordPressPost {
    acf: {
        question: string;
        answer: string;
        display_order: number;
        faq_category: string;
    };
}

export interface Stat extends WordPressPost {
    acf: {
        stat_number: number;
        stat_description: string;
        stat_icon: string;
        display_order: number;
    };
}

export interface HeroSettings {
    hero_headline: string;
    hero_subtext: string;
    hero_cta_text: string;
    hero_cta_icon: string;
    hero_background_image: string;
    hero_meta_title: string;
    hero_meta_description: string;
}

export interface NavigationSettings {
    nav_cta_text: string;
    nav_cta_icon: string;
}

export interface ContactSettings {
    address: string;
    phone: string;
    email: string;
    map_embed_url: string;
}

export interface SocialLinks {
    facebook_url: string;
    linkedin_url: string;
    twitter_url: string;
    instagram_url: string;
}

export interface SEOSettings {
    default_meta_title: string;
    default_meta_description: string;
    google_analytics_id: string;
    google_tag_manager_id: string;
    facebook_pixel_id: string;
}

export interface SiteSettings {
    site_name: string;
    site_logo_url: string;
    favicon_url: string;
}