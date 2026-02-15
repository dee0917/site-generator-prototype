import { ProductCategory } from '../types/Theme';

export const THEME_POOL: ProductCategory[] = [
    {
        id: 'gold-cards',
        name: '太歲金卡 (Gold Cards)',
        description: 'High-margin, lightweight spiritual items for wallet or phone case.',
        vibe: 'luxury',
        productKeywords: ['Gold Card', 'Zodiac', 'Fortune', 'Prosperity', 'Protection'],
        template: 'minimal-luxury'
    },
    {
        id: 'feng-shui-coins',
        name: '五帝錢 (Five Emperors Coins)',
        description: 'Traditional brass coins for warding off evil and attracting wealth.',
        vibe: 'mystical',
        productKeywords: ['Ancient Coins', 'Brass', 'Ward Evil', 'Wealth', 'Dynasty'],
        template: 'minimal-luxury' // Retro items work well with editorial layouts
    },
    {
        id: 'crystal-energy',
        name: '能量水晶 (Energy Crystals)',
        description: 'Natural stones for healing and energy balancing.',
        vibe: 'mystical',
        productKeywords: ['Amethyst', 'Rose Quartz', 'Citrine', 'Healing', 'Chakra'],
        template: 'minimal-luxury'
    },
    {
        id: 'tech-accessories',
        name: '3C 配件 (Tech Accessories)',
        description: 'Modern gadgets for daily use.',
        vibe: 'technology',
        productKeywords: ['Phone Case', 'Charger', 'Stand', 'Wireless', 'Smart'],
        template: 'tech-modern'
    },
    {
        id: 'pet-lifestyle',
        name: '寵物生活 (Pet Lifestyle)',
        description: 'Premium goods for furry friends.',
        vibe: 'energetic',
        productKeywords: ['Collar', 'Toy', 'Bed', 'Treats', 'Grooming'],
        template: 'bold-street' // Playful/Bold works for trendy pet brands
    },
    {
        id: 'fitness-nutrition',
        name: '運動營養 (Fitness)',
        description: 'Supplements and gear for active lifestyles.',
        vibe: 'energetic',
        productKeywords: ['Protein', 'Shaker', 'Bands', 'Energy', 'Recovery'],
        template: 'bold-street'
    },
    {
        id: 'smart-home',
        name: '智慧家居 (Smart Home)',
        description: 'IoT devices for modern living.',
        vibe: 'technology',
        productKeywords: ['Smart Bulb', 'Sensor', 'Hub', 'Camera', 'Lock'],
        template: 'tech-modern'
    }
];
