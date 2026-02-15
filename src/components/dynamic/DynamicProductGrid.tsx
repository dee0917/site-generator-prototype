import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../types/Theme';
import { SiteContent, Product } from '../../types/Content';
import { ShoppingCart, Eye } from 'lucide-react';

interface DynamicProductGridProps {
    theme: ThemeConfig;
    content: SiteContent;
}

type GridType = 'masonry' | 'carousel' | 'bento' | 'standard';

export const DynamicProductGrid: React.FC<DynamicProductGridProps> = ({ theme, content }) => {
    const { layoutDef, styleDef, vibe, colors, typography, borderRadius, shadowDepth } = theme;
    const { products } = content;

    // Detect Grid Type from Layout Definition
    const getGridType = (): GridType => {
        const keywords = (layoutDef?.Keywords || "").toLowerCase() + " " + (layoutDef?.["Pattern Name"] || "").toLowerCase();

        if (keywords.includes('masonry') || keywords.includes('portfolio') || keywords.includes('gallery')) return 'masonry';
        if (keywords.includes('carousel') || keywords.includes('slider') || keywords.includes('hero + testimonials')) return 'carousel';
        if (keywords.includes('bento') || keywords.includes('tech') || keywords.includes('saas')) return 'bento';
        return 'standard';
    };

    const gridType = getGridType();

    // Theme Logic
    const isBrutalist = vibe === 'energetic' || vibe === 'corporate' || (styleDef?.["Style Category"] || '').toLowerCase().includes('brutalist');
    const isGlass = vibe === 'mystical' || vibe === 'technology' || (styleDef?.["Effects & Animation"] || '').toLowerCase().includes('glass');

    // --- SUB-COMPONENTS ---

    const ProductCard = ({ product, index, variant = 'standard' }: { product: Product, index: number, variant?: 'standard' | 'compact' | 'featured' }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative flex flex-col overflow-hidden h-full cursor-pointer ${variant === 'featured' ? 'md:row-span-2' : ''}`}
                style={{
                    backgroundColor: isGlass ? `${colors.background}60` : colors.background === '#1A1A1A' || colors.background === '#000000' ? '#1a1a1a' : '#ffffff',
                    backdropFilter: isGlass ? 'blur(16px)' : 'none',
                    borderRadius: isBrutalist ? '0px' : borderRadius,
                    border: isBrutalist ? `2px solid ${colors.text}` : `1px solid ${colors.text}1A`, // 10% opacity border for dark mode definition
                    boxShadow: isBrutalist ? `6px 6px 0px 0px ${colors.text}` : shadowDepth === 'shadow-none' ? 'none' : '0 10px 40px -10px rgba(0,0,0,0.2)', // Slightly stronger shadow
                }}
            >
                {/* Image Container */}
                <div className={`relative overflow-hidden w-full ${variant === 'featured' ? 'h-full min-h-[500px]' : variant === 'compact' ? 'h-48' : 'aspect-[4/5]'}`}>
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    />

                    {/* Vibe-Specific Overlays */}
                    {vibe === 'mystical' && (
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    {vibe === 'technology' && (
                        <>
                            <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                    )}

                    {/* Pro Max Action Bar (Glassmorphism Slide-up) */}
                    <div className={`absolute bottom-0 left-0 right-0 z-30 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-center gap-3 ${isBrutalist ? '' : 'backdrop-blur-md bg-white/10'}`}>
                        <button
                            className="p-3 rounded-full hover:scale-110 active:scale-95 transition-all text-black hover:text-white"
                            aria-label="Add to cart"
                            style={{
                                backgroundColor: isBrutalist ? colors.accent : '#FFF',
                                color: isBrutalist ? colors.background : '#000',
                                borderRadius: isBrutalist ? '0px' : '9999px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <ShoppingCart size={18} strokeWidth={2.5} />
                        </button>
                        <Link
                            to={`/product/${product.id}`}
                            className="p-3 rounded-full hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                            aria-label="View details"
                            style={{
                                backgroundColor: isBrutalist ? 'black' : 'rgba(255,255,255,0.9)',
                                color: isBrutalist ? 'white' : 'black',
                                borderRadius: isBrutalist ? '0px' : '9999px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Eye size={18} strokeWidth={2.5} />
                        </Link>
                    </div>

                    {/* Premium Badges */}
                    {index % 3 === 0 && (
                        <div
                            className="absolute top-4 left-4 z-30 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                            style={{
                                backgroundColor: colors.accent,
                                borderRadius: isBrutalist ? '0px' : '4px',
                            }}
                        >
                            NEW ARRIVAL
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={`relative z-20 flex-grow flex flex-col justify-between transition-colors duration-300 ${vibe === 'minimal' ? 'pt-5 bg-transparent' : 'p-6'}`}
                    style={{ backgroundColor: vibe === 'corporate' ? `${colors.background}` : 'transparent' }}
                >
                    <div>
                        <div className="flex justify-between items-start mb-2 gap-4">
                            <h3
                                className="text-lg leading-tight transition-colors duration-300 group-hover:opacity-100"
                                style={{
                                    fontWeight: typography.headingWeight as any,
                                    fontFamily: typography.fontFamily,
                                    color: colors.text
                                }}
                            >
                                {product.name}
                            </h3>
                            <span className="font-bold text-lg whitespace-nowrap" style={{ color: colors.primary }}>${product.price}</span>
                        </div>
                        <p className="text-xs font-medium uppercase tracking-wider mb-3 opacity-40" style={{ color: colors.text }}>
                            {isBrutalist ? '/// SPEC' : 'Collection 2024'}
                        </p>
                        <p className="text-sm opacity-60 line-clamp-2 mb-4 leading-relaxed" style={{ color: colors.muted }}>{product.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t" style={{ borderColor: `${colors.text}10` }}>
                        {product.tags.slice(0, 2).map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 transition-colors hover:bg-black/5 cursor-default"
                                style={{
                                    color: colors.muted,
                                    border: isBrutalist ? `1px solid ${colors.text}` : 'none',
                                    borderRadius: isBrutalist ? '0px' : '4px',
                                    backgroundColor: isBrutalist ? 'transparent' : `${colors.text}08`
                                }}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    };

    // --- LAYOUTS (Keeping layout logic purely structural) ---

    // ... (Layout implementations map directly to GridType) ...
    // Since we are replacing the whole file, I need to include these functions fully.

    const MasonryLayout = () => (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {products.map((product, i) => (
                <div key={product.id} className="break-inside-avoid">
                    <ProductCard product={product} index={i} />
                </div>
            ))}
        </div>
    );

    const CarouselLayout = () => {
        const scrollRef = useRef<HTMLDivElement>(null);
        return (
            <div className="relative group/carousel">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4 md:px-0"
                >
                    {products.map((product, i) => (
                        <div key={product.id} className="min-w-[280px] md:min-w-[360px] snap-center h-full">
                            <ProductCard product={product} index={i} />
                        </div>
                    ))}
                    <div className="min-w-[50px]" />
                </div>
            </div>
        );
    };

    const BentoLayout = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Simple logic: Every 4th item spans 2 cols if possible */}
            {products.map((product, i) => (
                <div key={product.id} className={`${(i === 0 || i === 3) ? 'lg:col-span-2 lg:row-span-1' : ''}`}>
                    <ProductCard
                        product={product}
                        index={i}
                        variant={(i === 0 || i === 3) ? 'featured' : 'standard'}
                    />
                </div>
            ))}
        </div>
    );

    const StandardGrid = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>
    );

    // --- MAIN RENDER ---

    return (
        <section id="products" className="py-24 relative overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
            {/* Vibe Background Accents */}
            {vibe === 'technology' && (
                <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" style={{ background: `linear-gradient(to bottom, ${colors.primary}0D, transparent)` }} />
            )}

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-xs font-bold tracking-[0.25em] uppercase mb-3 block"
                            style={{ color: colors.accent }}
                        >
                            // LATEST DROPS
                        </motion.span>
                        <h2
                            className="text-4xl md:text-5xl font-bold leading-tight"
                            style={{
                                fontFamily: typography.fontFamily,
                                color: colors.text
                            }}
                        >
                            FEATURED COLLECTION
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 bg-black/5 p-1 rounded-lg backdrop-blur-sm" style={{ backgroundColor: `${colors.text}0D`, borderRadius: isBrutalist ? '0px' : '12px' }}>
                        {['ALL', 'HOT', 'NEW'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-6 py-2 text-sm font-medium transition-all`}
                                style={{
                                    borderRadius: isBrutalist ? '0px' : '8px',
                                    backgroundColor: i === 0 ? colors.text : 'transparent',
                                    color: i === 0 ? colors.background : colors.text,
                                    boxShadow: i === 0 ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {gridType === 'masonry' && <MasonryLayout />}
                {gridType === 'carousel' && <CarouselLayout />}
                {gridType === 'bento' && <BentoLayout />}
                {gridType === 'standard' && <StandardGrid />}
            </div>
        </section>
    );
};
