
export type VibeType = 'luxury' | 'technology' | 'natural' | 'mystical' | 'minimal' | 'energetic' | 'corporate' | 'street';

// Deprecated alias for backward compat if needed, or just replace usage
export type ThemeVibe = VibeType;

export type SiteTemplate = 'minimal-luxury' | 'bold-street' | 'tech-modern';

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    vibe: VibeType;
    productKeywords: string[];
    template: SiteTemplate;
}

import { StyleDef, LayoutDef } from './StyleTypes';

export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        muted: string;
    };
    typography: {
        fontFamily: string; // broadened from union type to string to allow custom font stacks
        headingWeight: string;
    };
    borderRadius: string; // broadened to string to allow any Tailwind class
    shadowDepth: string;
    template: SiteTemplate;
    styleDef?: StyleDef;
    layoutDef?: LayoutDef;
    vibe?: VibeType; // Added for context awareness in other components
    layout?: {
        hero: 'split' | 'centered' | 'bento' | 'minimal';
        grid: 'masonry' | 'standard' | 'carousel';
        card: 'minimal' | 'bold' | 'glass' | 'standard';
    };
}
