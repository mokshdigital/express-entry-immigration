'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent } from '@/lib/context/ConsentContext';
import { SiteSettings } from '@/types/wordpress';

interface CookieConsentProps {
    settings: SiteSettings;
}

export function CookieConsent({ settings }: CookieConsentProps) {
    const { consent, acceptCookies, declineCookies } = useConsent();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if consent has not been set yet
        if (consent === null) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [consent]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t shadow-lg"
            >
                <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-sm text-gray-600">
                        <p>
                            {settings.cookie_message ||
                                'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={declineCookies}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {settings.cookie_decline_text || 'Decline'}
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-6 py-2 text-sm font-medium text-white bg-brand-navy hover:bg-brand-red rounded-md transition-colors shadow-sm"
                        >
                            {settings.cookie_accept_text || 'Accept'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
