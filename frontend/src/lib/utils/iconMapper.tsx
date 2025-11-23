import {
    GraduationCap,
    Briefcase,
    Home,
    Plane,
    Award,
    LayoutGrid,
    LucideIcon,
} from 'lucide-react';

/**
 * Maps WordPress Dashicons to Lucide React icons
 * This allows us to use consistent icons across the application
 */
export const iconMap: Record<string, LucideIcon> = {
    // Study/Education icons
    'dashicons-welcome-learn-more': GraduationCap,
    'dashicons-book': GraduationCap,
    'dashicons-welcome-write-blog': GraduationCap,

    // Work/Business icons
    'dashicons-businessman': Briefcase,
    'dashicons-portfolio': Briefcase,
    'dashicons-admin-users': Briefcase,

    // Home/Residence icons
    'dashicons-admin-home': Home,
    'dashicons-building': Home,

    // Travel/Visitor icons
    'dashicons-airplane': Plane,
    'dashicons-location': Plane,

    // Citizenship/Award icons
    'dashicons-star-filled': Award,
    'dashicons-awards': Award,
    'dashicons-shield': Award,

    // Other/General icons
    'dashicons-align-wide': LayoutGrid,
    'dashicons-grid-view': LayoutGrid,
    'dashicons-menu': LayoutGrid,
};

/**
 * Get Lucide icon component from Dashicons value
 * @param dashiconValue - The dashicon value from WordPress (e.g., "dashicons-star-filled")
 * @param fallback - Optional fallback icon if mapping not found
 * @returns Lucide icon component
 */
export function getDashicon(
    dashiconValue: string,
    fallback: LucideIcon = LayoutGrid
): LucideIcon {
    return iconMap[dashiconValue] || fallback;
}
