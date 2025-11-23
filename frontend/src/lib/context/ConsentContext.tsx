'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ConsentContextType {
    consent: boolean | null;
    acceptCookies: () => void;
    declineCookies: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const storedConsent = localStorage.getItem('cookie_consent');
        if (storedConsent === 'true') {
            setConsent(true);
        } else if (storedConsent === 'false') {
            setConsent(false);
        }
    }, []);

    const acceptCookies = () => {
        setConsent(true);
        localStorage.setItem('cookie_consent', 'true');
    };

    const declineCookies = () => {
        setConsent(false);
        localStorage.setItem('cookie_consent', 'false');
    };

    return (
        <ConsentContext.Provider value={{ consent, acceptCookies, declineCookies }}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
}
