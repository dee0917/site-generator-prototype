
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DynamicNavbar } from '../dynamic/DynamicNavbar';
import { DynamicCart } from '../dynamic/DynamicCart';
import { ThemeConfig } from '../../types/Theme';
import { SiteContent } from '../../types/Content';
import { useCart } from '../../context/CartContext';

// Helper to parse CSS variables
const parseCssVariables = (varsString?: string): React.CSSProperties => {
    if (!varsString) return {};
    const styles: Record<string, string> = {};
    varsString.split(',').forEach(pair => {
        const [key, value] = pair.split(':').map(s => s.trim());
        if (key && value) {
            styles[key] = value;
        }
    });
    return styles as React.CSSProperties;
};

interface SiteLayoutProps {
    theme: ThemeConfig;
    content: SiteContent;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    onReset: () => void;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ theme, content, isCartOpen, setIsCartOpen, onReset }) => {
    const { pathname } = useLocation();
    const { itemCount } = useCart();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div
            className="min-h-screen bg-white text-black relative transition-colors duration-500"
            style={{
                ...parseCssVariables(theme.styleDef?.["Design System Variables"]),
                fontFamily: theme.typography.fontFamily === 'serif' ? 'serif' : 'sans-serif',
                backgroundColor: theme.colors.background,
                color: theme.colors.text
            }}
        >
            <DynamicNavbar theme={theme} content={content} />

            <main>
                <Outlet context={{ theme, content, setIsCartOpen }} />
            </main>

            {/* Footer */}
            <footer
                className="py-12 border-t text-center opacity-60 transition-colors duration-500"
                style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.muted + '40'
                }}
            >
                <div className="container mx-auto px-4">
                    <p>{content.footerText}</p>
                    <div className="mt-8 space-x-4 text-sm">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                    <button
                        onClick={onReset}
                        className="mt-8 text-xs underline hover:text-blue-500 opacity-50 hover:opacity-100"
                    >
                        [ Reset Generator ]
                    </button>
                </div>
            </footer>

            {/* Floating Cart Button (Mobile/Global) */}
            <div className="fixed bottom-6 right-6 z-40 md:hidden">
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="p-4 rounded-full shadow-lg font-bold hover:scale-105 transition-transform relative"
                    aria-label="Open cart"
                    style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {itemCount > 9 ? '9+' : itemCount}
                        </span>
                    )}
                </button>
            </div>

            <DynamicCart
                theme={theme}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
};
