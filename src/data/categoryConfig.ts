import { VibeType, SiteTemplate } from '../types/Theme';

export interface CategoryConfigType {
    name: string;
    vibe: VibeType;
    template: SiteTemplate;
    productKeywords: string[];
    presetId: 'A' | 'J' | 'T';
}

export const CATEGORY_CONFIG: Record<string, CategoryConfigType> = {
    "Traditional Feng Shui Talismans": {
        name: "Traditional Feng Shui Talismans",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Talisman", "Gold Card", "Amulet", "Protection", "Fortune"],
        presetId: 'A'
    },
    "Smudging & Incense": {
        name: "Smudging & Incense",
        vibe: "natural",
        template: "minimal-luxury",
        productKeywords: ["Sage", "Palo Santo", "Incense", "Purification", "Aroma"],
        presetId: 'A'
    },
    "Crystals & Stones": {
        name: "Crystals & Stones",
        vibe: "mystical",
        template: "minimal-luxury",
        productKeywords: ["Crystal", "Quartz", "Amethyst", "Energy", "Healing"],
        presetId: 'A'
    },
    "Sound Healing Tools": {
        name: "Sound Healing Tools",
        vibe: "technology",
        template: "tech-modern",
        productKeywords: ["Tuning Fork", "Singing Bowl", "Frequency", "Vibration", "Resonance"],
        presetId: 'T'
    },
    "Sacred Symbols": {
        name: "Sacred Symbols",
        vibe: "mystical",
        template: "minimal-luxury",
        productKeywords: ["Geometry", "Symbol", "Brass", "Pendant", "Sacred"],
        presetId: 'A'
    },
    "Desk Feng Shui": {
        name: "Desk Feng Shui",
        vibe: "corporate",
        template: "minimal-luxury",
        productKeywords: ["Ornament", "Statue", "Wealth", "Success", "Focus"],
        presetId: 'A'
    },
    "Omamori & Sachets": {
        name: "Omamori & Sachets",
        vibe: "energetic",
        template: "bold-street",
        productKeywords: ["Omamori", "Sachet", "Charm", "Blessing", "Luck"],
        presetId: 'J'
    },
    "Crystal Hangings": {
        name: "Crystal Hangings",
        vibe: "mystical",
        template: "minimal-luxury",
        productKeywords: ["Suncatcher", "Prism", "Hanging", "Light", "Rainbow"],
        presetId: 'A'
    },
    "Herbal Bottles": {
        name: "Herbal Bottles",
        vibe: "natural",
        template: "minimal-luxury",
        productKeywords: ["Herb", "Bottle", "Specimen", "Nature", "Decor"],
        presetId: 'A'
    },
    "Energy Cards": {
        name: "Energy Cards",
        vibe: "mystical",
        template: "tech-modern",
        productKeywords: ["Oracle", "Tarot", "Affirmation", "Insight", "Wisdom"],
        presetId: 'T'
    },
    "Everyday Carry": {
        name: "Everyday Carry",
        vibe: "street",
        template: "bold-street",
        productKeywords: ["Titanium", "Tool", "Gear", "Carry", "Compact"],
        presetId: 'J'
    },
    "Minimalist Desk Setup": {
        name: "Minimalist Desk Setup",
        vibe: "technology",
        template: "minimal-luxury",
        productKeywords: ["Stand", "Organizer", "Tray", "Mat", "Minimal"],
        presetId: 'T'
    },
    "Coffee & Tea Ritual": {
        name: "Coffee & Tea Ritual",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Pour-over", "Kettle", "Cup", "Grinder", "Brew"],
        presetId: 'A'
    },
    "Creator Tools": {
        name: "Creator Tools",
        vibe: "technology",
        template: "tech-modern",
        productKeywords: ["Camera", "Lens", "Mount", "Grip", "Production"],
        presetId: 'T'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Smart Accessories": {
        name: "Smart Accessories",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Smart", "Accessories"],
        presetId: 'A'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Aromatherapy": {
        name: "Aromatherapy",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Aromatherapy"],
        presetId: 'A'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Premium Stationery": {
        name: "Premium Stationery",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Premium", "Stationery"],
        presetId: 'A'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Ultralight Camping": {
        name: "Ultralight Camping",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Ultralight", "Camping"],
        presetId: 'A'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Organization": {
        name: "Organization",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Organization"],
        presetId: 'A'
    },
    // NOTE: 由同步腳本自動生成 (2026-02-15)
    "Car Accessories": {
        name: "Car Accessories",
        vibe: "luxury",
        template: "minimal-luxury",
        productKeywords: ["Car", "Accessories"],
        presetId: 'A'
    }
};
