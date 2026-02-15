import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../types/Theme';
import { Activity } from 'lucide-react';
import { SiteContent } from '../../types/Content';

interface DynamicHeroProps {
    theme: ThemeConfig;
    content: SiteContent;
}

// Helper: Infinite Marquee
const Marquee: React.FC<{ text: string, color: string }> = ({ text, color }) => (
    <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap py-2 z-0" style={{ backgroundColor: color, color: '#000' }}>
        <motion.div
            className="inline-block"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-8 font-black uppercase tracking-tighter text-sm">
                    {text} ///
                </span>
            ))}
        </motion.div>
    </div>
);



export const DynamicHero: React.FC<DynamicHeroProps> = ({ theme, content }) => {
    // 1. Layout Logic
    const layoutInput = theme.layoutDef?.['Pattern Name']?.toLowerCase() || 'centered';
    const keywords = theme.layoutDef?.Keywords?.toLowerCase() || '';

    const isSplit = layoutInput.includes('split') || keywords.includes('split');
    const isImmersive = layoutInput.includes('visual') || layoutInput.includes('image') || keywords.includes('immersive');

    // 2. Style Tokens
    const { colors, borderRadius, typography, shadowDepth, vibe } = theme;
    const fontPrimary = typography.fontFamily === 'serif' ? 'font-serif' : typography.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

    const containerStyle = {
        backgroundColor: colors.background,
        color: colors.text,
    };

    const buttonStyle = {
        backgroundColor: colors.accent,
        color: colors.background === '#000000' || colors.background === '#1A1A1A' || colors.background === '#0F0F0F' || colors.background === '#050505' ? '#000' : '#FFF',
        borderRadius: borderRadius === 'rounded-none' ? '0px' : borderRadius === 'rounded-3xl' ? '24px' : '8px',
        boxShadow: shadowDepth === 'shadow-none' ? 'none' : `0 4px 14px 0 ${colors.accent}66`
    };

    // 3. Vibe-Specific Background Effects
    const renderBackgroundEffects = () => {
        switch (vibe) {
            case 'mystical':
                return (
                    <>
                        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.primary}, transparent 70%)` }} />
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        width: Math.random() * 4 + 1 + 'px',
                                        height: Math.random() * 4 + 1 + 'px',
                                        backgroundColor: colors.primary,
                                        boxShadow: `0 0 10px ${colors.primary}`
                                    }}
                                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                                />
                            ))}
                        </div>
                    </>
                );
            case 'technology':
                return (
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />
                );
            case 'natural':
                return (
                    <>
                        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full opacity-30 filter blur-[80px]" style={{ backgroundColor: colors.secondary }} />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 filter blur-[100px]" style={{ backgroundColor: colors.primary }} />
                    </>
                );
            case 'energetic':
                return (
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full" style={{ background: `repeating-linear-gradient(45deg, ${colors.primary}, ${colors.primary} 10px, transparent 10px, transparent 20px)` }} />
                    </div>
                );
            default: // minimalist / corporate / luxury
                return (
                    <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at top right, ${colors.secondary}, transparent)` }} />
                );
        }
    };

    // --- RENDERERS ---

    // 1. SPLIT LAYOUT
    if (isSplit) {
        return (
            <section className={`relative min-h-[85vh] flex items-center overflow-hidden ${fontPrimary}`} style={containerStyle}>
                {renderBackgroundEffects()}

                <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block text-sm tracking-[0.25em] uppercase mb-6 opacity-60 font-semibold" style={{ color: colors.accent }}>
                            — {content.siteName}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8" style={{ color: colors.text }}>
                            {content.heroHeadline}
                        </h1>
                        <p className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed max-w-lg" style={{ color: colors.muted }}>
                            {content.heroSubheadline}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 font-bold tracking-wide transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                                style={buttonStyle}
                            >
                                {content.ctaText}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative h-[65vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        {/* Placeholder or Abstract Visual */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-20 z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="Visual"
                            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Vibe overlay */}
                        <div className="absolute inset-0 mix-blend-overlay opacity-40" style={{ backgroundColor: colors.primary }}></div>
                    </motion.div>
                </div>
            </section>
        );
    }

    // 2. IMMERSIVE / VISUAL LAYOUT
    if (isImmersive) {
        return (
            <section className={`relative min-h-screen flex items-center justify-center text-white overflow-hidden ${fontPrimary}`}>
                {/* Background Image with color overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=2000&q=80"
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 mix-blend-color opacity-50" style={{ backgroundColor: colors.primary }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span
                            className="inline-block py-2 px-6 rounded-full backdrop-blur-md text-sm mb-8 border border-white/10 tracking-widest uppercase font-medium"
                            style={{ backgroundColor: `${colors.primary}20`, color: colors.accent }}
                        >
                            {vibe?.toUpperCase()} COLLECTION
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
                            {content.heroHeadline}
                        </h1>
                        <p className="text-2xl md:text-3xl font-light mb-12 text-white/90 max-w-3xl mx-auto">
                            {content.heroSubheadline}
                        </p>
                        <button
                            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-12 py-5 font-bold text-lg transition-transform hover:-translate-y-1"
                            style={buttonStyle}
                        >
                            {content.ctaText}
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    // 3. CENTERED / DEFAULT
    return (
        <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${fontPrimary}`} style={containerStyle}>
            {renderBackgroundEffects()}

            <div className="container mx-auto px-6 text-center z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight" style={{ color: colors.text }}>
                        {content.heroHeadline}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>.</span>
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-80" style={{ color: colors.muted }}>
                        {content.heroSubheadline}
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <button
                            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                            style={buttonStyle}
                        >
                            {content.ctaText}
                        </button>

                        {vibe !== 'energetic' && (
                            <button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 font-medium text-lg border hover:bg-black/5 transition-all"
                                style={{
                                    borderRadius: buttonStyle.borderRadius,
                                    color: colors.text,
                                    borderColor: `${colors.text}33`
                                }}
                            >
                                {vibe === 'technology' ? 'BROWSE CATALOG' : 'EXPLORE COLLECTION'}
                            </button>
                        )}
                    </div>

                    {vibe === 'energetic' && (
                        <>
                            <Marquee text={`${content.siteName} • ${content.heroHeadline} • EXCLUSIVE DROP •`} color={colors.primary} />
                            <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-2 border-t-2 border-dashed" style={{ borderColor: colors.primary, color: colors.primary }}>
                                <motion.div animate={{ x: [-1000, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
                                    {[...Array(10)].map((_, i) => (
                                        <span key={i} className="mx-8 font-mono text-xs">
                                            SECURE_TRANSACTION_ID_{Math.random().toString(36).substring(7).toUpperCase()}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* Tech Interaction Element */}
                {vibe === 'technology' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 font-mono text-xs opacity-50"
                        style={{ color: colors.primary }}
                    >
                        <Activity size={12} className="animate-pulse" />
                        SYSTEM READY
                    </motion.div>
                )}
            </div>
        </section>
    );
};
