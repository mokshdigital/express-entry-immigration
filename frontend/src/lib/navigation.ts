/**
 * Navigation menu structure for Express Entry Immigration
 * This defines the complete site navigation including mega menu items
 */

import { CategoryWithServices } from '@/lib/api/services';

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    description?: string;
    icon?: string;
}

// Base navigation structure (without dynamic services)
export const baseNavigation: NavItem[] = [
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Latest Updates',
        href: '/news',
    },
    {
        label: 'FAQs',
        href: '/faqs',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

/**
 * Build complete navigation with dynamic service categories
 */
export function buildNavigation(categories: CategoryWithServices[]): NavItem[] {
    const servicesItem: NavItem = {
        label: 'Services',
        href: '/#services',
        children: categories.map((category) => ({
            label: category.name,
            href: `/services/${category.slug}`,
            icon: category.acf.service_category_icon.value,
            children: category.services.map((service) => ({
                label: service.title.rendered,
                href: `/services/${category.slug}/${service.slug}`,
            })),
        })),
    };

    // Insert Services after About
    return [
        baseNavigation[0], // About
        servicesItem,      // Services (with categories)
        ...baseNavigation.slice(1), // Latest Updates, FAQs, Contact
    ];
}

// Helper function to flatten menu for mobile
export function flattenNavigation(items: NavItem[]): NavItem[] {
    return items.reduce((acc: NavItem[], item) => {
        acc.push(item);
        if (item.children) {
            acc.push(...flattenNavigation(item.children));
        }
        return acc;
    }, []);
}