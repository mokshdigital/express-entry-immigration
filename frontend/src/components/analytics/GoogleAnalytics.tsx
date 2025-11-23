'use client';

import { useEffect } from 'react';
import { useConsent } from '@/lib/context/ConsentContext';

interface GoogleAnalyticsProps {
    measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    const { consent } = useConsent();

    useEffect(() => {
        // Only load if consent is given
        if (!consent || !measurementId) return;

        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', measurementId, {
            page_path: window.location.pathname,
            anonymize_ip: true,
        });

        // Make gtag globally available
        (window as any).gtag = gtag;
    }, [measurementId, consent]);

    return null;
}