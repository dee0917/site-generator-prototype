import type { ProductCategory, VibeType } from '../types/Theme';
import type { SiteContent, Product } from '../types/Content';
import type { StyleDef } from '../types/StyleTypes';
import { ProductDataManager } from './ProductDataManager';

export class ContentGenerator {
    static generate(category: ProductCategory, styleDef?: StyleDef): SiteContent {
        const { vibe, productKeywords } = category;

        // 1. Analyze Context
        const styleKeywords = styleDef?.Keywords?.toLowerCase() || "";
        const styleCategory = styleDef?.["Style Category"]?.toLowerCase() || "";
        const combinedContext = `${styleKeywords} ${styleCategory} ${vibe}`.toLowerCase();

        // 2. Define Brand Archetypes
        let archetype: VibeType | 'street' | 'retro' = vibe;
        if (combinedContext.includes('street') || combinedContext.includes('graffiti')) archetype = 'street';
        else if (combinedContext.includes('retro') || combinedContext.includes('vintage')) archetype = 'retro';

        // 3. Creative Brand Naming Algorithm (English)
        const generateBrandName = (arch: string): string => {
            const brands: Record<string, string[]> = {
                luxury: ['AURA', 'LUMINARY', 'ETHER', 'NOIR & BLANC', 'SOVEREIGN', 'THE ATELIER', 'SILHOUETTE', 'VOGUE'],
                technology: ['SYSTEM', 'KERNEL', 'NEXUS OS', 'QUBIT', 'SYNTH', 'HYPERION', 'VECTOR', 'NULL POINTER'],
                natural: ['PURE FORM', 'BOTANICA', 'AEON EARTH', 'RAW', 'ELEMENTAL', 'TERRA', 'ORIGIN', 'FLORA'],
                mystical: ['THIRD EYE', 'ASTRAL', 'VOID', 'ZENITH', 'ARCANE', 'SOLSTICE', 'EQUINOX', 'OMNI'],
                street: ['VANDAL', 'ARCHIVE', 'PROTOCOL', 'OFF-GRID', 'CHAOS CLUB', 'RIOT', 'UNDERGROUND', 'NOCTURNAL'],
                energetic: ['VELOCITY', 'ADRENALINE', 'APEX', 'KINETIC', 'MOMENTUM', 'PULSE', 'IGNITE', 'FLUX'],
                corporate: ['APEX GROUP', 'MERIDIAN', 'VISIONARY', 'PRIME', 'AXIOM', 'GLOBAL', 'SUMMIT', 'CORE'],
                retro: ['ANALOG', 'REWIND', 'CLASSIC', 'VINTAGE', 'ECHO', 'NOSTALGIA', 'CINEMA', 'PRESS']
            };

            const options = brands[arch] || brands['luxury'];
            return options[Math.floor(Math.random() * options.length)];
        };

        const siteName = generateBrandName(archetype);

        // 4. Procedural Copywriting (English)
        const generateHeadlines = (arch: string, name: string) => {
            const defaultT = {
                h: ['Less is More', 'Pure Form', 'Essential Living', 'Modern Simplicity'],
                s: [`Experience the quality of ${name}`, 'Designed for longevity', 'Focus on what matters']
            };

            const templates: Record<string, { h: string[], s: string[] }> = {
                luxury: {
                    h: ['Redefining Elegance', 'Timeless Sophistication', 'The Art of Living', 'Beyond Luxury'],
                    s: [`Experience the ultimate quality of ${name}`, 'Curated for the discerning few', 'Excellence in every detail']
                },
                technology: {
                    h: ['Foresee the Future', 'Upgrade Your Reality', 'Next-Gen Performance', 'Born for Tomorrow'],
                    s: [`Advanced ${name} systems only`, 'Experience the cutting edge', 'Optimized for peak efficiency']
                },
                natural: {
                    h: ['Return to Nature', 'Pure and Simple', 'Earth First', 'Natural Harmony'],
                    s: [`Sustainably sourced ${name}`, 'Good for you, good for the planet', 'Organic essentials for modern life']
                },
                mystical: {
                    h: ['Awaken the Soul', 'Sacred Geometry', 'Divine Connection', 'Energy Flow'],
                    s: [`Ancient wisdom for modern life`, `Harmonize your space with ${name}`, 'Unlock your inner potential']
                },
                street: {
                    h: ['Own the Streets', 'Unleash the Wild', 'Never Compromise', 'Stay Real'],
                    s: [`Limited Edition: ${name}`, 'Bold design for the brave', 'Don\'t follow, lead']
                },
                energetic: {
                    h: ['Limitless Power', 'Break Limits', 'Game On', 'Never Stop'],
                    s: [`High performance ${name}`, 'Fuel your passion', 'Designed for winners']
                },
                corporate: {
                    h: ['Empowering Business', 'Strategic Solutions', 'Global Leadership', 'Trusted Performance'],
                    s: [`Leading ${name} provider`, 'Scalable solutions for your enterprise', 'Reliability you can count on']
                },
                retro: {
                    h: ['Nostalgic Journey', 'Classic Vibes', 'Rewind', 'Retro Soul'],
                    s: [`Authentic ${name} aesthetics`, 'Inspired by the golden age', 'Classic style, reimagined']
                }
            };

            const t = templates[arch] || defaultT;
            return {
                headline: t.h[Math.floor(Math.random() * t.h.length)],
                subheadline: t.s[Math.floor(Math.random() * t.s.length)]
            };
        };

        const { headline, subheadline } = generateHeadlines(archetype, siteName);

        // 5. Generate Products (Prioritize Real Data)
        let products: Product[] = [];

        // Try to get real products from the Data Manager
        const realProducts = ProductDataManager.getProductsByCategory(category.name);

        if (realProducts && realProducts.length > 0) {
            products = realProducts;
        } else {
            console.warn(`ContentGenerator: No real products found for category "${category.name}". Falling back to procedural generation.`);
            // Fallback: Generate procedural products
            products = Array.from({ length: 12 }).map((_, i) => {
                const keyword = productKeywords[Math.floor(Math.random() * productKeywords.length)];
                const price = Math.floor(Math.random() * 800) + 50;

                let prefix = '';
                let descriptionTemplate = '';

                if (archetype === 'luxury') {
                    prefix = ['Royal', 'Signature', 'Grand', 'Elite'][i % 4];
                    descriptionTemplate = `Experience the prestige of ${prefix} ${keyword}. Crafted for the discerning few.`;
                } else if (archetype === 'technology') {
                    prefix = ['Smart', 'Quantum', 'Cyber', 'Nano'][i % 4];
                    descriptionTemplate = `Powered by the latest tech, ${prefix} ${keyword} brings the future to you.`;
                } else if (archetype === 'street' || archetype === 'energetic') {
                    prefix = ['Limited', 'Hype', 'Urban', 'Pro'][i % 4];
                    descriptionTemplate = `Stand out with the ${prefix} ${keyword}. Bold, unapologetic, and ready for action.`;
                } else if (archetype === 'natural') {
                    prefix = ['Organic', 'Pure', 'Eco'][i % 3];
                    descriptionTemplate = `Sourced from nature, ${prefix} ${keyword} is kind to you and the planet.`;
                } else if (archetype === 'mystical') {
                    prefix = ['Sacred', 'Astral', 'Divine', 'Cosmic'][i % 4];
                    descriptionTemplate = `Unlock hidden energies with ${prefix} ${keyword}. A bridge to the unknown.`;
                } else if (archetype === 'corporate') {
                    prefix = ['Pro', 'Enterprise', 'Global'][i % 3];
                    descriptionTemplate = `Maximize efficiency with the ${prefix} ${keyword}. Built for business.`;
                } else if (archetype === 'retro') {
                    prefix = ['Classic', 'Vintage', 'Retro'][i % 3];
                    descriptionTemplate = `Relive the golden age with ${prefix} ${keyword}. Timeless style.`;
                } else {
                    prefix = ['Select', 'Premium'][i % 2];
                    descriptionTemplate = `The ${prefix} ${keyword} combines style and function. A daily essential.`;
                }

                return {
                    id: `prod-${i}`,
                    name: prefix ? `${prefix} ${keyword}` : keyword,
                    description: descriptionTemplate,
                    price: price,
                    originalPrice: price * 1.2,
                    image: `https://placehold.co/600x800?font=roboto&text=${encodeURIComponent(keyword)}+${i + 1}`,
                    rating: 4 + Math.random(),
                    tags: [archetype.toUpperCase(), keyword],
                    longDescription: `Elevate your lifestyle with the ${prefix || 'Premium'} ${keyword}. Meticulously engineered for those who demand excellence, this product combines ${vibe} aesthetics with unparalleled performance. Whether you're at home or on the go, it stands as a testament to your discerning taste.`,
                    specifications: [
                        { label: 'Material', value: 'Premium Composite' },
                        { label: 'Weight', value: `${(Math.random() * 2 + 0.5).toFixed(1)} kg` },
                        { label: 'Dimensions', value: '24 x 12 x 5 cm' },
                        { label: 'Warranty', value: '2 Years' }
                    ],
                    reviews: [
                        { id: 'r1', user: 'James L.', rating: 5, comment: 'Absolutely stunning quality. Exceeded expectations.', date: '2024-02-10' },
                        { id: 'r2', user: 'Sarah M.', rating: 4, comment: 'Great design, fast shipping.', date: '2024-01-25' }
                    ]
                };
            });
        }

        return {
            siteName,
            heroHeadline: headline,
            heroSubheadline: subheadline,
            ctaText: (archetype === 'street' || archetype === 'energetic') ? 'Shop Now' : archetype === 'luxury' ? 'Discover' : 'Explore',
            products,
            footerText: `© 2026 ${siteName}. ${archetype === 'technology' ? 'All Systems Operational.' : 'Designed with passion.'}`,
            about: {
                title: `About ${siteName}`,
                story: `Founded in 2024, ${siteName} stands at the intersection of ${vibe} and innovation. We believe in creating products that not only function beautifully but also inspire deep connection. Our journey began with a simple idea: to redefine what is possible in the world of ${styleDef?.["Style Category"] || 'design'}.`,
                team: [
                    { name: 'Alex Chen', role: 'Founder & Visionary', image: 'https://placehold.co/400x600?text=Alex' },
                    { name: 'Sarah Jones', role: 'Head of Design', image: 'https://placehold.co/400x600?text=Sarah' },
                    { name: 'Marcus Tho', role: 'Lead Engineer', image: 'https://placehold.co/400x600?text=Marcus' }
                ]
            },
            contact: {
                email: `hello@${siteName.toLowerCase().replace(/\s/g, '')}.com`,
                phone: '+1 (555) 123-4567',
                address: '123 Innovation Drive, Creative District, NY 10012'
            },
            catalog: {
                title: 'The Collection',
                description: `Explore our curated selection of ${vibe} essentials.`
            }
        };
    }
}
