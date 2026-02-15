import rawData from '../data/raw_products.json';
import { Product } from '../types/Content';

interface RawItem {
    id: string;
    name: string;
    weight: string;
    price: number;
    url: string;
}

interface RawCategory {
    id: string;
    title: string;
    items: RawItem[];
}

export class ProductDataManager {
    private static data: RawCategory[] = rawData as RawCategory[];

    /**
     * Parsing the raw category title to get a clean English name.
     * e.g. "## 1. 傳統風水護身類 (Traditional Feng Shui Talismans)" -> "Traditional Feng Shui Talismans"
     */
    private static parseCategoryName(rawTitle: string): string {
        const match = rawTitle.match(/\((.*?)\)/);
        return match ? match[1].trim() : rawTitle.replace(/#+\s*\d+\.\s*/, '').trim();
    }

    static getAllCategories(): string[] {
        return this.data.map(cat => this.parseCategoryName(cat.title));
    }

    static getRandomCategory(): string {
        const categories = this.getAllCategories();
        return categories[Math.floor(Math.random() * categories.length)];
    }

    static getProductsByCategory(categoryName: string): Product[] {
        const category = this.data.find(cat => this.parseCategoryName(cat.title) === categoryName);

        if (!category) {
            console.warn(`Category "${categoryName}" not found.`);
            return [];
        }

        return category.items.map(item => ({
            id: item.id,
            name: item.name,
            description: `Authentic ${item.name}. Originally priced at $${(item.price * 1.2).toFixed(2)}.`,
            price: item.price,
            originalPrice: item.price * 1.2,
            image: `https://placehold.co/600x800?font=roboto&text=${encodeURIComponent(item.name)}`, // Placeholder for now
            rating: 4.5 + Math.random() * 0.5,
            tags: [categoryName, 'Authentic'],
            longDescription: `This ${item.name} is a genuine artifact sourced for its quality and spiritual resonance. Perfect for enhancing your environment or personal energy. Weight: ${item.weight}.`,
            specifications: [
                { label: 'Weight', value: item.weight },
                { label: 'Source', value: 'Verified Supplier' },
                { label: 'Material', value: 'Traditional' }
            ],
            reviews: [] // No real reviews in data
        }));
    }
}
