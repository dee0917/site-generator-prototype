import { StyleDef, LayoutDef } from '../types/StyleTypes';
import stylesRaw from '../data/styles.csv?raw';
import landingRaw from '../data/landing.csv?raw';
import Papa from 'papaparse';

export class StyleDataLoader {
    private static styles: StyleDef[] = [];
    private static layouts: LayoutDef[] = [];

    static async loadData() {
        if (this.styles.length > 0) return;

        // Parse Styles
        const stylesResult = Papa.parse(stylesRaw, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });

        // Parse Layouts
        const landingResult = Papa.parse(landingRaw, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });

        this.styles = stylesResult.data as StyleDef[];
        this.layouts = landingResult.data as LayoutDef[];

        console.log(`[StyleDataLoader] Loaded ${this.styles.length} styles and ${this.layouts.length} layouts.`);
    }

    static getRandomStyle(): StyleDef {
        if (this.styles.length === 0) throw new Error("Style data not loaded");
        return this.styles[Math.floor(Math.random() * this.styles.length)];
    }

    static getRandomLayout(): LayoutDef {
        if (this.layouts.length === 0) throw new Error("Layout data not loaded");
        return this.layouts[Math.floor(Math.random() * this.layouts.length)];
    }

    static getStyleById(id: number): StyleDef | undefined {
        return this.styles.find(s => s.No === id);
    }

    static getStyleByVibe(vibe: string): StyleDef {
        if (this.styles.length === 0) throw new Error("Style data not loaded");
        // Simple filter based on Keywords or Category
        const matches = this.styles.filter(s =>
            s.Keywords.toLowerCase().includes(vibe.toLowerCase()) ||
            s["Style Category"].toLowerCase().includes(vibe.toLowerCase())
        );

        if (matches.length > 0) {
            return matches[Math.floor(Math.random() * matches.length)];
        }
        // Fallback to random if no match
        console.warn(`No styles found for vibe: ${vibe}, using random.`);
        return this.getRandomStyle();
    }
}
