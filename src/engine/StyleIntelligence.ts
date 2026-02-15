
import { VibeType } from '../types/Theme';

interface Palette {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
}

export const MOOD_PALETTES: Record<VibeType, Palette[]> = {
    luxury: [
        { // "Gold & Black"
            primary: '#D4AF37', // Gold
            secondary: '#1A1A1A', // Rich Black
            accent: '#FFFFFF',
            background: '#0F0F0F',
            text: '#F5F5F5',
            muted: '#555555'
        },
        { // "Champagne & Slate"
            primary: '#F7E7CE',
            secondary: '#2F4F4F',
            accent: '#D2691E',
            background: '#FDFDFD',
            text: '#222222',
            muted: '#999999'
        }
    ],
    technology: [
        { // "Cyberpunk Neon"
            primary: '#00F0FF', // Cyan
            secondary: '#0D0D0D', // Dark
            accent: '#FF003C', // Neon Red
            background: '#050505',
            text: '#E0E0E0',
            muted: '#333333'
        },
        { // "Deep Space"
            primary: '#3A86FF',
            secondary: '#FFFFFF',
            accent: '#8338EC',
            background: '#0B132B',
            text: '#FFFFFF',
            muted: '#5BC0BE'
        }
    ],
    natural: [
        { // "Forest Zen"
            primary: '#2D6E32',
            secondary: '#F1F8E9',
            accent: '#8BC34A',
            background: '#FAFAFA',
            text: '#1B5E20',
            muted: '#81C784'
        },
        { // "Earthy Clay"
            primary: '#A1887F',
            secondary: '#EFEBE9',
            accent: '#D7CCC8',
            background: '#FFF3E0',
            text: '#4E342E',
            muted: '#BCAAA4'
        }
    ],
    mystical: [
        { // "Royal Purple"
            primary: '#9C27B0',
            secondary: '#F3E5F5',
            accent: '#E1BEE7',
            background: '#12005E',
            text: '#EDE7F6',
            muted: '#7E57C2'
        },
        { // "Midnight Tarot"
            primary: '#FFD700', // Gold
            secondary: '#191970', // Midnight Blue
            accent: '#4B0082', // Indigo
            background: '#000000',
            text: '#F0F8FF',
            muted: '#708090'
        }
    ],
    minimal: [
        { // "Swiss Style"
            primary: '#000000',
            secondary: '#FFFFFF',
            accent: '#FF0000', // Swiss Red
            background: '#FFFFFF',
            text: '#111111',
            muted: '#999999'
        },
        { // "Scandi Grey"
            primary: '#212121',
            secondary: '#FAFAFA',
            accent: '#607D8B',
            background: '#F5F5F5',
            text: '#212121',
            muted: '#B0BEC5'
        }
    ],
    energetic: [
        { // "Sports Brand"
            primary: '#FF3D00', // Vibrant Orange
            secondary: '#FFFFFF',
            accent: '#2962FF',
            background: '#FFFFFF',
            text: '#212121',
            muted: '#B0BEC5'
        }
    ],
    corporate: [
        { // "Fintech Blue"
            primary: '#1565C0',
            secondary: '#FFFFFF',
            accent: '#42A5F5',
            background: '#F8F9FA',
            text: '#0D47A1',
            muted: '#90CAF9'
        }
    ],
    street: [
        { // "Concrete Jungle"
            primary: '#000000',
            secondary: '#FFFFFF',
            accent: '#FF0000',
            background: '#121212',
            text: '#EAEAEA',
            muted: '#4F4F4F'
        }
    ]
};

export const KEYWORD_MAPPING: Record<string, VibeType> = {
    // Mystical / Feng Shui
    'feng shui': 'mystical',
    'talisman': 'mystical',
    'crystal': 'mystical',
    'spirit': 'mystical',
    'fortune': 'mystical',
    'buddha': 'mystical',
    'zodiac': 'mystical',

    // Natural / Health
    'organic': 'natural',
    'healing': 'natural',
    'wood': 'natural',
    'stone': 'natural',
    'flower': 'natural',
    'tea': 'natural',
    'incense': 'natural',

    // Tech / 3C
    'electronic': 'technology',
    'digital': 'technology',
    'phone': 'technology',
    'screen': 'technology',
    'cyber': 'technology',
    'smart': 'technology',

    // Luxury / High-end
    'gold': 'luxury',
    'silver': 'luxury',
    'jewelry': 'luxury',
    'diamond': 'luxury',
    'watch': 'luxury',
    'car': 'luxury',

    // Minimal / Modern
    'basic': 'minimal',
    'home': 'minimal',
    'storage': 'minimal',
    'simple': 'minimal',
    'clean': 'minimal',

    // Energetic / Sports
    'sport': 'energetic',
    'run': 'energetic',
    'gym': 'energetic',
    'fitness': 'energetic',
    'game': 'energetic',
    'toy': 'energetic'
};
