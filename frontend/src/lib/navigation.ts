/**
 * Navigation menu structure for Express Entry Immigration
 * This defines the complete site navigation including mega menu items
 */

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    description?: string;
}

export const navigationMenu: NavItem[] = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Services',
        href: '/services',
        children: [
            {
                label: 'Study',
                href: '/services/study',
                description: 'Study permits, admissions, and extensions',
                children: [
                    {
                        label: 'Study Permits',
                        href: '/services/study#study-permits'
                    },
                    {
                        label: 'School Admissions',
                        href: '/services/study#admissions'
                    },
                    {
                        label: 'Study Permit Extensions',
                        href: '/services/study#extensions'
                    },
                ],
            },
            {
                label: 'Work',
                href: '/services/work',
                description: 'Work permits and LMIA applications',
                children: [
                    {
                        label: 'LMIA Work Permits',
                        href: '/services/work#lmia-permits'
                    },
                    {
                        label: 'Open Work Permits',
                        href: '/services/work#open-permits'
                    },
                    {
                        label: 'LMIA Applications',
                        href: '/services/work#lmia-support'
                    },
                    {
                        label: 'LMIA-Exempt Permits',
                        href: '/services/work#lmia-exempt'
                    },
                    {
                        label: 'Work Permit Extensions',
                        href: '/services/work#extensions'
                    },
                    {
                        label: 'Bridging Open Work Permits',
                        href: '/services/work#bridging'
                    },
                ],
            },
            {
                label: 'Permanent Residency',
                href: '/services/permanent-residency',
                description: 'Express Entry, PNP, and sponsorships',
                children: [
                    {
                        label: 'Express Entry',
                        href: '/services/permanent-residency#express-entry'
                    },
                    {
                        label: 'Provincial Nominee Programs',
                        href: '/services/permanent-residency#pnp'
                    },
                    {
                        label: 'Rural & Atlantic Immigration',
                        href: '/services/permanent-residency#rural-atlantic'
                    },
                    {
                        label: 'Caregiver Pathways',
                        href: '/services/permanent-residency#caregiver'
                    },
                    {
                        label: 'Humanitarian & Compassionate',
                        href: '/services/permanent-residency#humanitarian'
                    },
                    {
                        label: 'Refugee Claims',
                        href: '/services/permanent-residency#refugee'
                    },
                    {
                        label: 'Spousal Sponsorships',
                        href: '/services/permanent-residency#spousal'
                    },
                    {
                        label: 'Parent/Grandparent Sponsorships',
                        href: '/services/permanent-residency#pgp'
                    },
                ],
            },
            {
                label: 'Visitor Visas',
                href: '/services/visitor-visas',
                description: 'Tourist visas, Super Visas, and eTAs',
                children: [
                    {
                        label: 'Visitor Visa',
                        href: '/services/visitor-visas#visitor'
                    },
                    {
                        label: 'Business Visitor Visa',
                        href: '/services/visitor-visas#business'
                    },
                    {
                        label: 'Super Visa',
                        href: '/services/visitor-visas#super-visa'
                    },
                    {
                        label: 'eTA',
                        href: '/services/visitor-visas#eta'
                    },
                ],
            },
            {
                label: 'Citizenship & PR Card',
                href: '/services/citizenship',
                description: 'Citizenship applications and PR card renewals',
                children: [
                    {
                        label: 'Citizenship Applications',
                        href: '/services/citizenship#applications'
                    },
                    {
                        label: 'PR Card Renewals',
                        href: '/services/citizenship#pr-card'
                    },
                    {
                        label: 'Residency Obligation Reviews',
                        href: '/services/citizenship#residency'
                    },
                ],
            },
            {
                label: 'Other Services',
                href: '/services/other',
                description: 'Additional immigration services',
                children: [
                    { label: 'Indian OCI', href: '/services/other#oci' },
                    { label: 'Indian Passport Renewal', href: '/services/other#passport' },
                    { label: 'Indian PCC', href: '/services/other#pcc' },
                    { label: 'DLI Change', href: '/services/other#dli' },
                    { label: 'Name Change', href: '/services/other#name-change' },
                    { label: 'GCMS/ATIP Notes', href: '/services/other#gcms' },
                    { label: 'US Visa', href: '/services/other#us-visa' },
                    { label: 'Lost Documents', href: '/services/other#lost-doc' },
                ],
            },
        ],
    },
    {
        label: 'News',
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

// Helper function to get all service categories
export function getServiceCategories(): NavItem[] {
    const servicesItem = navigationMenu.find(item => item.label === 'Services');
    return servicesItem?.children || [];
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