
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ThemeConfig } from '../types/Theme';

import { SiteContent } from '../types/Content';

type ContextType = { theme: ThemeConfig; content: SiteContent };

export const ContactPage: React.FC = () => {
    const { theme, content } = useOutletContext<ContextType>();

    const inputStyle = {
        backgroundColor: 'transparent',
        borderBottom: `2px solid ${theme.colors.muted}40`,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily
    };

    return (
        <div className="pt-32 pb-20 px-6 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <h1
                        className="text-5xl md:text-7xl mb-8"
                        style={{ fontFamily: theme.typography.fontFamily, fontWeight: '900' }}
                    >
                        Get in Touch
                    </h1>
                    <p className="text-xl opacity-70 mb-12">
                        We'd love to hear from you. Send us a message or visit our HQ.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm opacity-50 uppercase tracking-widest mb-1">Email</p>
                            <p className="text-xl">{content.contact?.email || 'hello@example.com'}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-50 uppercase tracking-widest mb-1">Phone</p>
                            <p className="text-xl">{content.contact?.phone || '+1 (555) 000-0000'}</p>
                        </div>
                        <div>
                            <p className="text-sm opacity-50 uppercase tracking-widest mb-1">Studio</p>
                            <p className="text-xl">{content.contact?.address || '123 Design Avenue'}</p>
                        </div>
                    </div>
                </div>

                <form className="space-y-12 mt-8">
                    <div className="group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full py-4 outline-none focus:border-opacity-100 transition-colors placeholder:opacity-40 text-2xl"
                            style={inputStyle}
                        />
                    </div>
                    <div className="group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full py-4 outline-none focus:border-opacity-100 transition-colors placeholder:opacity-40 text-2xl"
                            style={inputStyle}
                        />
                    </div>
                    <div className="group">
                        <textarea
                            rows={4}
                            placeholder="Message"
                            className="w-full py-4 outline-none focus:border-opacity-100 transition-colors placeholder:opacity-40 text-2xl resize-none"
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="button"
                        className="px-10 py-4 font-bold rounded-full transition-transform hover:scale-105"
                        style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.background,
                            borderRadius: theme.borderRadius
                        }}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};
