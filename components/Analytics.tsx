import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const GA_MEASUREMENT_ID = 'G-VXQMV1B3FP';

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

const Analytics: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Load gtag script only once
        if (!document.getElementById('ga-script')) {
            const script = document.createElement('script');
            script.id = 'ga-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(...args: unknown[]) {
                window.dataLayer.push(args);
            };
            window.gtag('js', new Date());
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname,
            });
        }
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname,
            });
        }
    }, [location.pathname]);

    return null;
};

export default Analytics;
