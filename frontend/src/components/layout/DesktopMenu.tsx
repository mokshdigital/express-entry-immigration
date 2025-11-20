'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { type NavItem } from '@/lib/navigation';

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
                            <div className="absolute left-0 top-full pt-2 z-50">
                                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 min-w-[800px] grid grid-cols-3 gap-6">
                                    {item.children?.map((category) => (
                                        <div key={category.label}>
                                            <Link
                                                href={category.href}
                                                className="block font-semibold text-brand-navy hover:text-brand-red mb-2"
                                            >
                                                {category.label}
                                            </Link>
                                            {category.description && (
                                                <p className="text-xs text-gray-500 mb-3">
                                                    {category.description}
                                                </p>
                                            )}
                                            {category.children && (
                                                <ul className="space-y-2">
                                                    {category.children.map((subItem) => (
                                                        <li key={subItem.label}>
                                                            <Link
                                                                href={subItem.href}
                                                                className="text-sm text-gray-600 hover:text-brand-navy transition-colors"
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}