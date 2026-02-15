
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ThemeConfig } from '../types/Theme';
import { SiteContent } from '../types/Content';

type ContextType = { theme: ThemeConfig; content: SiteContent };

export const AboutPage: React.FC = () => {
    const { theme, content } = useOutletContext<ContextType>();

    return (
        <div className="pt-32 pb-20 px-6 container mx-auto max-w-4xl">
            <h1
                className="text-5xl md:text-7xl mb-12"
                style={{ fontFamily: theme.typography.fontFamily, fontWeight: '900' }}
            >
                About {content.siteName}
            </h1>

            <div className="space-y-8 text-lg md:text-xl leading-relaxed opacity-90">
                <p>
                    {content.heroSubheadline} We believe in pushing the boundaries of what is possible.
                    Our journey began with a simple idea: to create products that not only function beautifully but also inspire.
                </p>
                <p>
                    Every item in our collection is a testament to our commitment to quality, design, and innovation.
                    We define our aesthetic through the lens of <strong>{(theme.vibe || 'Design').toUpperCase()}</strong>.
                </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative group">
                        <img
                            src={`https://placehold.co/400x600?text=Team+${i}`}
                            alt="Team Member"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform">
                            <p className="font-bold">Member Name</p>
                            <p className="text-xs opacity-80">Title Position</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
