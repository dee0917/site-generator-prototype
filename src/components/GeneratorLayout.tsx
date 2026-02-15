import React, { useState } from 'react';
import { useDynamicRenderer } from '../context/DynamicRendererContext';
import { AgentTerminal } from './dynamic/AgentTerminal';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { CatalogPage } from '../pages/CatalogPage';
import { ContactPage } from '../pages/ContactPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
import { GodModePanel } from './dashboard/GodModePanel';

export const GeneratorLayout: React.FC = () => {
    const { phase, agents, logs, generatedTheme, generatedContent, startGeneration, reset } = useDynamicRenderer();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const isGenerating = phase !== 'idle' && phase !== 'complete';
    const showSite = generatedTheme && generatedContent && (phase === 'building' || phase === 'reviewing' || phase === 'complete');

    return (
        <div className="relative min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">

            {/* 1. IDLE STATE: Start Button */}
            {phase === 'idle' && (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center space-y-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Universal Site Generator
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            5 Agents. Infinite Possibilities. One Click.
                        </p>

                        <button
                            onClick={() => startGeneration()}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 font-mono rounded-lg hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                        >
                            <Play className="mr-2 group-hover:fill-current" />
                            INITIALIZE AGENT SWARM
                        </button>
                    </motion.div>
                </div>
            )}

            {/* 2. GENERATING STATE: Terminal Overlay */}
            <AnimatePresence>
                {isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <div className="w-full max-w-5xl space-y-4">
                            <div className="text-center">
                                <h2 className="text-2xl font-mono text-blue-400 animate-pulse">
                                    {phase === 'planning' && 'PHASE 1: STRATEGIC PLANNING'}
                                    {phase === 'designing' && 'PHASE 2: DESIGN & CONTENT SYNTHESIS'}
                                    {phase === 'building' && 'PHASE 3: COMPONENT ASSEMBLY'}
                                    {phase === 'reviewing' && 'PHASE 4: QUALITY ASSURANCE'}
                                </h2>
                            </div>
                            <AgentTerminal agents={agents} logs={logs} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. SITE PREVIEW (Behind the terminal or revealed after) */}
            <AnimatePresence>
                {showSite && generatedTheme && generatedContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="min-h-screen bg-white text-black relative"
                    >
                        <Routes>
                            <Route element={<SiteLayout theme={generatedTheme} content={generatedContent} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} onReset={reset} />}>
                                <Route index element={<HomePage />} />
                                <Route path="about" element={<AboutPage />} />
                                <Route path="catalog" element={<CatalogPage />} />
                                <Route path="contact" element={<ContactPage />} />
                                <Route path="product/:id" element={<ProductDetailPage />} />
                                <Route path="checkout" element={<CheckoutPage />} />
                                <Route path="order-success" element={<OrderSuccessPage />} />
                                <Route path="*" element={<HomePage />} />
                            </Route>
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. God Mode Panel */}
            <GodModePanel />

        </div>
    );
};
