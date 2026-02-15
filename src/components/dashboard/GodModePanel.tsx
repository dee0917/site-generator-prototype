import React, { useState } from 'react';
import { useDynamicRenderer } from '../../context/DynamicRendererContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RefreshCw, Zap, Monitor, Code, Lock } from 'lucide-react';

export const GodModePanel: React.FC = () => {
    const { phase, startGeneration } = useDynamicRenderer();
    const [selectedPreset, setSelectedPreset] = useState<'A' | 'J' | 'T'>('A');
    const [isExpanded, setIsExpanded] = useState(false);

    // Only show when not idle
    if (phase === 'idle') return null;

    const presets = [
        { id: 'A', name: 'Luxe Minimalist', color: 'bg-yellow-500', icon: '✨' },
        { id: 'J', name: 'Street Hype', color: 'bg-red-500', icon: '🔥' },
        { id: 'T', name: 'Future Tech', color: 'bg-cyan-400', icon: '🧬' },
    ];

    const handleRegenerate = () => {
        startGeneration(selectedPreset as 'A' | 'J' | 'T');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-[200] flex flex-col items-end pointer-events-none"
        >
            {/* Main Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 20, height: 0 }}
                        className="mb-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-72 shadow-2xl pointer-events-auto"
                    >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Zap className="w-4 h-4 text-purple-400" />
                                GOD MODE
                            </h3>
                            <span className="text-xs text-green-400 px-2 py-0.5 bg-green-900/30 rounded border border-green-500/20">
                                RANDOM: OFF
                            </span>
                        </div>

                        {/* Preset Selector */}
                        <div className="space-y-2 mb-4">
                            <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Force Preset</label>
                            <div className="grid grid-cols-1 gap-2">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setSelectedPreset(preset.id as any)}
                                        className={`flex items-center p-2 rounded-lg transition-all border ${selectedPreset === preset.id
                                            ? 'bg-white/10 border-white/40 shadow-lg'
                                            : 'bg-transparent border-transparent hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${selectedPreset === preset.id ? preset.color : 'bg-gray-800'
                                            } text-black font-bold transition-colors`}>
                                            {preset.id}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">{preset.name}</div>
                                            <div className="text-xs text-gray-400">Force {preset.name} Vibe</div>
                                        </div>
                                        {selectedPreset === preset.id && (
                                            <motion.div layoutId="active-indicator" className="ml-auto">
                                                <Lock className="w-3 h-3 text-white/50" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <button
                                onClick={handleRegenerate}
                                disabled={phase !== 'complete' && phase !== 'building' && phase !== 'reviewing'}
                                className="col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                            >
                                <RefreshCw className={`w-4 h-4 ${phase === 'planning' ? 'animate-spin' : ''}`} />
                                REGENERATE SITE
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg transition-colors text-xs">
                                <Code className="w-3 h-3" />
                                Export
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg transition-colors text-xs">
                                <Monitor className="w-3 h-3" />
                                Debug
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border pointer-events-auto transition-colors ${isExpanded
                    ? 'bg-white text-black border-white'
                    : 'bg-black/80 text-white border-white/20 backdrop-blur-md'
                    }`}
            >
                <Settings className={`w-6 h-6 ${isExpanded ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
            </motion.button>
        </motion.div>
    );
};
