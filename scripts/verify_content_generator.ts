
import { ContentGenerator } from '../src/engine/ContentGenerator';
import { ProductCategory } from '../src/types/Theme';
import { StyleDef } from '../src/types/StyleTypes';

// Mock Data helpers
const createMockCategory = (name: string, vibe: string, template: any): ProductCategory => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    vibe,
    template,
    description: `A mock category for ${name}`,
    productKeywords: ['Item', 'Gadget', 'Widget']
});

const createMockStyle = (category: string, keywords: string): StyleDef => ({
    No: 1,
    "Style Category": category,
    "Visual Characteristics": "Mock Visuals",
    "Color Palette Strategy": "Mock Palette",
    "Primary Colors": "#000000",
    "Secondary Colors": "#FFFFFF",
    "Typography": "Mock Type",
    "UI Component Styling": "Mock Styling",
    "Effects & Animation": "Mock Effects",
    "Layout Patterns": "Mock Layout",
    "Iconography Style": "Mock Icons",
    Keywords: keywords,
    "Design System Variables": "--mock: var",
    "Tech Implementation": "CSS",
    "Usage Context": "Mock Usage",
    "Target Audience": "Mock Audience",
    "Conversion Goal": "Mock Goal",
    Type: "Mock Type"
});

async function runVerification() {
    console.log("Starting Isolated ContentGenerator Verification...\n");

    const testCases = [
        {
            name: "Cyberpunk Tech",
            cat: createMockCategory("Neural Link", "cyberpunk futuristic", "tech-modern"),
            style: createMockStyle("Cyberpunk UI", "neon, tech, glitch, dark mode")
        },
        {
            name: "Modern Luxury",
            cat: createMockCategory("Gold Watch", "luxury elegant", "minimal-luxury"),
            style: createMockStyle("Luxury Minimal", "gold, serif, spacious, premium")
        },
        {
            name: "Organic Nature",
            cat: createMockCategory("Moss Decor", "organic natural", "minimal-luxury"),
            style: createMockStyle("Organic Biophilic", "green, earth, soft, nature")
        },
        {
            name: "Streetwear",
            cat: createMockCategory("Hype Kicks", "bold urban", "bold-street"),
            style: createMockStyle("Brutalist Bold", "black, huge type, raw, street")
        },
        {
            name: "Corporate",
            cat: createMockCategory("Cloud SaaS", "trust reliable", "tech-modern"),
            style: createMockStyle("Corporate Clean", "blue, trust, reliable, business")
        }
    ];

    testCases.forEach(test => {
        console.log(`--- Testing: ${test.name} ---`);
        const content = ContentGenerator.generate(test.cat, test.style);

        console.log(`Site Name: ${content.siteName}`);
        console.log(`Headline:  ${content.heroHeadline}`);
        console.log(`Subhead:   ${content.heroSubheadline}`);
        console.log(`CTA:       ${content.ctaText}`);
        console.log(`Product 1: ${content.products[0].name} ($${content.products[0].price})`);
        console.log(`Footer:    ${content.footerText}`);
        console.log(`\n`);
    });
}

runVerification().catch(console.error);
