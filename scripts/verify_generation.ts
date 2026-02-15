
import { StyleDataLoader } from '../src/engine/StyleDataLoader';
import { TopicSelector } from '../src/engine/TopicSelector';
import { StyleSynthesizer } from '../src/engine/StyleSynthesizer';
import { ContentGenerator } from '../src/engine/ContentGenerator';
import { ThemeConfig } from '../src/types/Theme';

async function runVerification() {
    console.log("Starting Verification: 5 Random Generations...");

    // Mock Agent skills if needed (not needed for engine calls)

    // Load Data
    await StyleDataLoader.loadData();
    console.log("Style Data Loaded.");

    const results: { category: string, style: string, layout: string, siteName: string }[] = [];

    for (let i = 0; i < 5; i++) {
        console.log(`\n--- Generation ${i + 1} ---`);

        // 1. Pick Category
        const category = TopicSelector.selectRandomCategory();
        console.log(`Category: ${category.name} (${category.vibe})`);

        // 2. Synthesize Style
        const theme = StyleSynthesizer.synthesize(category.vibe, category.template);
        console.log(`Style: ${theme.styleDef?.["Style Category"]} (${theme.styleDef?.Type})`);
        console.log(`Layout: ${theme.layoutDef?.["Pattern Name"]}`);

        // 3. Generate Content
        const content = ContentGenerator.generate(category);
        console.log(`Site Name: ${content.siteName}`);

        results.push({
            category: category.name,
            style: theme.styleDef?.["Style Category"] || 'Unknown',
            layout: theme.layoutDef?.["Pattern Name"] || 'Unknown',
            siteName: content.siteName
        });
    }

    console.log("\n--- Summary of 5 Generations ---");
    console.table(results);

    // Check for duplicates
    const uniqueStyles = new Set(results.map(r => r.style)).size;
    const uniqueLayouts = new Set(results.map(r => r.layout)).size;
    const uniqueNames = new Set(results.map(r => r.siteName)).size;

    console.log(`Unique Styles: ${uniqueStyles}/5`);
    console.log(`Unique Layouts: ${uniqueLayouts}/5`);
    console.log(`Unique Site Names: ${uniqueNames}/5`);

    if (uniqueStyles < 3 || uniqueLayouts < 3) {
        console.warn("WARNING: High repetition detected!");
    } else {
        console.log("SUCCESS: High diversity verified.");
    }
}

runVerification().catch(console.error);
