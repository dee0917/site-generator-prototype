
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DynamicHero } from '../components/dynamic/DynamicHero';
import { DynamicProductGrid } from '../components/dynamic/DynamicProductGrid';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';

type ContextType = { theme: ThemeConfig; content: SiteContent; setIsCartOpen: (open: boolean) => void };

export const HomePage: React.FC = () => {
    const { theme, content } = useOutletContext<ContextType>();

    return (
        <div className="animate-fade-in">
            <DynamicHero theme={theme} content={content} />
            <DynamicProductGrid theme={theme} content={content} />
        </div>
    );
};
