// Type declarations for Google Analytics and Tag Manager
declare global {
    interface Window {
        dataLayer: any[];
        gtag?: (...args: any[]) => void;
    }
}

export { };
