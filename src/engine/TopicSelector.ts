import { ProductCategory } from '../types/Theme';
import { CATEGORY_CONFIG } from '../data/categoryConfig';
import { ProductDataManager } from './ProductDataManager';
import { THEME_POOL } from '../data/themePool';

export class TopicSelector {
    static selectRandomCategory(): ProductCategory {
        // Ensure data is loaded (though redundant if called from App, safe to check)
        // Note: ProductDataManager is static-like in usage but data is on the class.

        const realCategories = ProductDataManager.getAllCategories();

        if (realCategories.length === 0) {
            console.warn("TopicSelector: No real product data found. Falling back to legacy theme pool.");
            const randomIndex = Math.floor(Math.random() * THEME_POOL.length);
            return THEME_POOL[randomIndex];
        }

        const randomCategoryTitle = realCategories[Math.floor(Math.random() * realCategories.length)];
        const config = CATEGORY_CONFIG[randomCategoryTitle];

        if (!config) {
            console.warn(`TopicSelector: Output category "${randomCategoryTitle}" has no config. Falling back legacy.`);
            const randomIndex = Math.floor(Math.random() * THEME_POOL.length);
            return THEME_POOL[randomIndex];
        }

        return {
            id: randomCategoryTitle.replace(/\s+/g, '-').toLowerCase(),
            name: randomCategoryTitle,
            vibe: config.vibe,
            productKeywords: config.productKeywords,
            template: config.template,
            description: `A curated collection of ${randomCategoryTitle}.`
        };
    }
}
