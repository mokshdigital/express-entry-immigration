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

export interface ServiceCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    acf: {
        service_category_icon: {
            type: string;
            value: string;
        };
        sc_display_order: number;
    };
}

export interface Service extends WordPressPost {
    service_category: number[];
    featured_image_url?: string;
    acf: {
        service_child_of: number;
        requirements: string;
        process_description: string;
        application_process_steps?: Array<{
            step_title: string;
            step_description: string;
            estimated_duration?: string;
        }>;
        processing_time: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        'wp:term'?: Array<Array<ServiceCategory>>;
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
    privacy_policy_url?: string;
    terms_of_service_url?: string;
    cookie_message?: string;
    cookie_accept_text?: string;
    cookie_decline_text?: string;
}

export interface AboutSettings {
    about_hero_headline: string;
    about_hero_description: string;
    about_mission_title: string;
    about_mission_description_1: string;
    about_mission_description_2: string;
    about_mission_description_3: string;
    about_mission_image: string;
    about_lead_name: string;
    about_lead_title: string;
    about_lead_credentials: string;
    about_lead_expertise: string[];
    about_lead_commitment: string;
    about_values: Array<{
        title: string;
        description: string;
    }>;
    about_why_choose_us: Array<{
        title: string;
        description: string;
    }>;
}

export interface WordPressPage extends WordPressPost {
    parent: number;
    menu_order: number;
}
