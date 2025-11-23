'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { type NavItem } from '@/lib/navigation';
import { getDashicon } from '@/lib/utils/iconMapper';

interface DesktopMenuProps {
    menu: NavItem[];
}

export function DesktopMenu({ menu }: DesktopMenuProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const handleMouseEnter = (label: string) => {
        setOpenMenu(label);
    };

    const handleMouseLeave = () => {
        setOpenMenu(null);
    };

    return (
        <nav className="hidden lg:flex items-center space-x-8">
            {menu.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openMenu === item.label;

                if (!hasChildren) {
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium hover:text-brand-navy transition-colors"
                        >
                            {item.label}
                        </Link>
                    );
                }

                return (
                    <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            className="flex items-center space-x-1 text-sm font-medium hover:text-brand-navy transition-colors"
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                        >
                            <span>{item.label}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-screen max-w-5xl px-4">
                                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-5 grid grid-cols-3 gap-5">
                                    {item.children?.map((category) => {
                                        const Icon = category.icon ? getDashicon(category.icon) : null;

                                        return (
                                            <div key={category.label} className="space-y-3">
                                                <Link
                                                    href={category.href}
                                                    className="flex items-center gap-3 group"
                                                >
                                                    {Icon && (
                                                        <div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                                                            <Icon className="w-4 h-4 text-brand-red" />
                                                        </div>
                                                    )}
                                                    <span className="font-bold text-base text-brand-navy group-hover:text-brand-red transition-colors">
                                                        {category.label}
                                                    </span>
                                                </Link>

                                                {category.children && category.children.length > 0 && (
                                                    <ul className="space-y-1 pl-[44px]">
                                                        {category.children.map((service) => (
                                                            <li key={service.label}>
                                                                <Link
                                                                    href={service.href}
                                                                    className="text-sm text-gray-600 hover:text-brand-red hover:underline transition-colors block py-0.5"
                                                                >
                                                                    {service.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}