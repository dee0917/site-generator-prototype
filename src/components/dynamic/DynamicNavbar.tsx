
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Search, Zap, Star, Leaf, Activity } from 'lucide-react';
import { ThemeConfig } from '../../types/Theme';
import { SiteContent } from '../../types/Content';
import { motion } from 'framer-motion';

interface DynamicNavbarProps {
    theme: ThemeConfig;
    content: SiteContent;
}

export const DynamicNavbar: React.FC<DynamicNavbarProps> = ({ theme, content }) => {
    const { template, colors, vibe, typography } = theme;

    // Helper to get Vibe Icon
    const getVibeIcon = () => {
        switch (vibe) {
            case 'technology': return <Zap size={18} />;
            case 'mystical': return <Star size={18} />;
            case 'natural': return <Leaf size={18} />;
            case 'energetic': return <Activity size={18} />;
            default: return <div className="w-3 h-3 rounded-full bg-current" />;
        }
    };

    const fontStyle = typography.fontFamily === 'serif' ? 'font-serif' : typography.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

    // 1. MINIMAL LUXURY LAYOUT (Luxury, Minimal, Natural)
    if (template === 'minimal-luxury' || vibe === 'natural' || vibe === 'minimal' || vibe === 'luxury') {
        return (
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 md:top-6 md:left-6 md:right-6 md:rounded-2xl z-50 backdrop-blur-md border transition-all duration-500 shadow-lg`}
                style={{
                    backgroundColor: `${colors.background}CC`, // 80% opacity
                    borderColor: `${colors.muted}33`, // 20% opacity
                    color: colors.text
                }}
            >
                <div className="px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Menu">
                            <Menu size={24} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Search">
                            <Search size={24} className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                        </button>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                        <Link to="/" className={`${fontStyle} text-2xl tracking-widest uppercase font-bold hover:opacity-80 transition-opacity`} style={{ color: colors.primary }}>
                            {content.siteName}
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/about" className="hidden md:block text-xs tracking-widest uppercase cursor-pointer hover:opacity-70 transition-opacity underline-offset-4">ABOUT</Link>
                        <Link to="/catalog" className="hidden md:block text-xs tracking-widest uppercase cursor-pointer hover:opacity-70 transition-opacity underline-offset-4">CATALOG</Link>
                        <div className="relative cursor-pointer hover:opacity-60 transition-opacity" role="button" aria-label="Cart">
                            <ShoppingBag size={24} />
                            <span
                                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-sm"
                                style={{ backgroundColor: colors.accent }}
                            >
                                2
                            </span>
                        </div>
                    </div>
                </div>
            </motion.nav>
        );
    }

    // 2. BOLD STREET / ENERGETIC LAYOUT (Energetic, Corporate)
    if (template === 'bold-street' || vibe === 'energetic' || vibe === 'corporate') {
        return (
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 border-b-4"
                style={{
                    backgroundColor: colors.primary,
                    borderColor: 'black', // Keep black border for comic/bold look, or use colors.text
                    color: colors.background === '#000000' ? '#FFF' : '#000'
                }}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div
                            className="w-8 h-8 flex items-center justify-center transform -rotate-3 border-2 border-black group-hover:rotate-0 transition-transform"
                            style={{ backgroundColor: 'black', color: colors.primary }}
                        >
                            {content.siteName.charAt(0)}
                        </div>
                        <span className={`font-black text-2xl uppercase tracking-tighter italic ${fontStyle}`} style={{ color: 'black' }}>
                            {content.siteName}
                        </span>
                    </Link>

                    <div className="hidden md:flex gap-8">
                        {['CATALOG', 'ABOUT', 'CONTACT'].map(link => (
                            <Link
                                key={link}
                                to={`/${link.toLowerCase()}`}
                                className="font-black uppercase text-sm hover:underline decoration-4 underline-offset-2 transition-transform hover:-translate-y-1"
                                style={{ color: 'black' }}
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/contact"
                            className="px-4 py-1 font-bold uppercase text-xs border-2 border-black hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            style={{ backgroundColor: 'black', color: colors.primary }}
                        >
                            CONNECT
                        </Link>
                        <button
                            className="bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} color="black" />
                        </button>
                    </div>
                </div>
            </motion.nav>
        );
    }

    // 3. TECH / MYSTICAL LAYOUT (Technology, Mystical)
    // Default fallback
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 md:top-4 md:left-4 md:right-4 md:rounded-xl z-50 backdrop-blur-xl border transition-all duration-500`}
            style={{
                backgroundColor: `${colors.background}99`, // Glassy
                borderColor: `${colors.primary}33`,
                boxShadow: `0 0 20px -5px ${colors.primary}33`
            }}
        >
            <div className="px-6 h-16 md:h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div
                        className="w-8 h-8 rounded flex items-center justify-center border shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                        style={{
                            backgroundColor: `${colors.primary}20`,
                            borderColor: `${colors.primary}60`,
                            color: colors.primary
                        }}
                    >
                        {getVibeIcon()}
                    </div>
                    <span className={`${fontStyle} text-lg font-bold tracking-tight`} style={{ color: colors.text }}>
                        {content.siteName}
                        <span style={{ color: colors.primary }}>
                            {vibe === 'technology' ? '_OS' : ''}
                            {vibe === 'mystical' ? ' ✦' : ''}
                        </span>
                    </span>
                </Link>

                <div className="hidden md:flex gap-1">
                    {['// ABOUT', '// CATALOG', '// CONTACT'].map((link) => (
                        <Link
                            key={link}
                            to={`/${link.replace('// ', '').toLowerCase()}`}
                            className={`px-4 py-2 ${fontStyle} text-xs rounded transition-all duration-300 hover:tracking-widest`}
                            style={{ color: colors.muted }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = colors.primary;
                                e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = colors.muted;
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {link.replace('// ', vibe === 'mystical' ? '✦ ' : '// ')}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border" style={{ borderColor: `${colors.muted}40`, backgroundColor: `${colors.background}` }}>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.accent }} />
                        <span className={`text-[10px] ${fontStyle}`} style={{ color: colors.muted }}>ONLINE</span>
                    </div>
                    <button className="p-2 transition-colors hover:text-white" style={{ color: colors.muted }} aria-label="Search">
                        <Search size={20} />
                    </button>
                    <button className="p-2 transition-colors group relative cursor-pointer" style={{ color: colors.muted }} aria-label="Cart">
                        <ShoppingBag size={20} style={{ color: colors.text }} />
                        <span
                            className="absolute top-1 right-1 w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: colors.accent,
                                boxShadow: `0 0 10px ${colors.accent}`
                            }}
                        />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};
