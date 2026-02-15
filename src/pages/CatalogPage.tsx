
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';
import { DynamicProductGrid } from '../components/dynamic/DynamicProductGrid'; // Reuse grid for now

type ContextType = { theme: ThemeConfig; content: SiteContent };

export const CatalogPage: React.FC = () => {
    const { theme, content } = useOutletContext<ContextType>();

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6 mb-12">
                <h1
                    className="text-4xl md:text-6xl mb-6"
                    style={{ fontFamily: theme.typography.fontFamily, fontWeight: '900' }}
                >
                    Catalog
                </h1>
                <p className="text-xl opacity-70 max-w-2xl">
                    Explore our complete collection of {theme.vibe} essentials.
                </p>
            </div>
            {/* Reusing existing grid, but in future iterations this can be more complex */}
            <DynamicProductGrid theme={theme} content={content} />
        </div>
    );
};
