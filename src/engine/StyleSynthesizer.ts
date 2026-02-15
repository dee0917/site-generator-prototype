import { ThemeConfig, SiteTemplate } from '../types/Theme';
import { CATEGORY_CONFIG } from '../data/categoryConfig';

export class StyleSynthesizer {
    private static GOLDEN_PRESETS: Record<string, ThemeConfig> = {
        'A': {
            name: "Luxe Minimalist",
            vibe: "luxury",
            template: "minimal-luxury",
            colors: {
                primary: "#1A1A1A",
                secondary: "#F5F5F0",
                accent: "#D4AF37",
                background: "#FFFFFF",
                text: "#1A1A1A",
                muted: "#E0E0E0"
            },
            typography: {
                fontFamily: "Playfair Display, serif",
                headingWeight: "600"
            },
            borderRadius: "0px",
            shadowDepth: "none",
            layout: {
                hero: "split",
                grid: "masonry",
                card: "minimal"
            },
            styleDef: {
                "No": 1,
                "Style Category": "Minimalist Luxury",
                "Type": "Preset",
                "Keywords": "Elegant, Spacious, Premium, Timeless",
                "Primary Colors": "#1A1A1A",
                "Secondary Colors": "#F5F5F0",
                "Effects & Animation": "Subtle fade-in",
                "Best For": "High-end retail",
                "Do Not Use For": "Tech",
                "Light Mode ✓": "Yes",
                "Dark Mode ✓": "No",
                "Performance": "High",
                "Accessibility": "AA",
                "Mobile-Friendly": "Yes",
                "Conversion-Focused": "Yes",
                "Framework Compatibility": "All",
                "Era/Origin": "Modern",
                "Complexity": "Low",
                "AI Prompt Keywords": "Luxury, Minimal",
                "CSS/Technical Keywords": "flex, grid",
                "Implementation Checklist": "Font loading",
                "Design System Variables": "--font-primary"
            }
        },
        'J': {
            name: "Street Hype",
            vibe: "energetic",
            template: "bold-street",
            colors: {
                primary: "#000000",
                secondary: "#FFFFFF",
                accent: "#FF3B30",
                background: "#F0F0F0",
                text: "#000000",
                muted: "#999999"
            },
            typography: {
                fontFamily: "Oswald, sans-serif",
                headingWeight: "700"
            },
            borderRadius: "0px",
            shadowDepth: "8px 8px 0px #000",
            layout: {
                hero: "centered",
                grid: "standard",
                card: "bold"
            },
            styleDef: {
                "No": 2,
                "Style Category": "Streetwear Hype",
                "Type": "Preset",
                "Keywords": "Bold, Loud, Contrast, Raw",
                "Primary Colors": "#000000",
                "Secondary Colors": "#FFFFFF",
                "Effects & Animation": "Marquee",
                "Best For": "Streetwear",
                "Do Not Use For": "Corporate",
                "Light Mode ✓": "Yes",
                "Dark Mode ✓": "Yes",
                "Performance": "Medium",
                "Accessibility": "A",
                "Mobile-Friendly": "Yes",
                "Conversion-Focused": "Yes",
                "Framework Compatibility": "All",
                "Era/Origin": "2020s",
                "Complexity": "Medium",
                "AI Prompt Keywords": "Brutalist",
                "CSS/Technical Keywords": "border, shadow",
                "Implementation Checklist": "Marquee component",
                "Design System Variables": "--shadow-hard"
            }
        },
        'T': {
            name: "Future Tech",
            vibe: "technology",
            template: "tech-modern",
            colors: {
                primary: "#66FCF1",
                secondary: "#1F2833",
                accent: "#45A29E",
                background: "#0B0C10",
                text: "#C5C6C7",
                muted: "#4F5D75"
            },
            typography: {
                fontFamily: "Orbitron, sans-serif",
                headingWeight: "500"
            },
            borderRadius: "12px",
            shadowDepth: "0 0 20px rgba(102, 252, 241, 0.2)",
            layout: {
                hero: "split",
                grid: "standard",
                card: "glass"
            },
            styleDef: {
                "No": 3,
                "Style Category": "Futuristic Tech",
                "Type": "Preset",
                "Keywords": "Cyber, Neon, Dark Mode, Precision",
                "Primary Colors": "#66FCF1",
                "Secondary Colors": "#0B0C10",
                "Effects & Animation": "Glow",
                "Best For": "Tech",
                "Do Not Use For": "Natural",
                "Light Mode ✓": "No",
                "Dark Mode ✓": "Yes",
                "Performance": "Medium", // Blur effects cost
                "Accessibility": "AA",
                "Mobile-Friendly": "Yes",
                "Conversion-Focused": "Yes",
                "Framework Compatibility": "All",
                "Era/Origin": "Future",
                "Complexity": "High",
                "AI Prompt Keywords": "Cyberpunk",
                "CSS/Technical Keywords": "backdrop-filter",
                "Implementation Checklist": "Glassmorphism",
                "Design System Variables": "--glow-color"
            }
        }
    };

    static synthesize(categoryName: string, _template: SiteTemplate, overridePreset?: 'A' | 'J' | 'T'): ThemeConfig {
        console.log(`[StyleSynthesizer] Analyzing category: "${categoryName}"`);

        // 1. Check for Override
        if (overridePreset) {
            console.log(`[God Mode] Forcing Golden Preset: ${overridePreset}`);
            return this.GOLDEN_PRESETS[overridePreset];
        }

        // 2. Check for Golden Preset in Config
        if (CATEGORY_CONFIG[categoryName]) {
            const presetId = CATEGORY_CONFIG[categoryName].presetId;
            const preset = this.GOLDEN_PRESETS[presetId];
            if (preset) {
                console.log(`[Creative Director] Matched Golden Preset "${preset.name}" for category "${categoryName}" via Config.`);
                return preset;
            }
        }

        // 3. Fallback: Deterministic Selection based on Name Length (Legacy)
        // This ensures consistent (but somewhat arbitrary) styles for unknown categories
        console.log(`[Creative Director] No config match for "${categoryName}". Falling back to generative selection.`);
        return this.pickGoldenPresetLegacy(categoryName);
    }

    private static pickGoldenPresetLegacy(input: string): ThemeConfig {
        const hash = input.length % 3;
        const key = ['A', 'J', 'T'][hash];
        return this.GOLDEN_PRESETS[key];
    }
}
